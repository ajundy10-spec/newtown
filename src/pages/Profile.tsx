import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import LoyaltyCard from "@/components/LoyaltyCard";
import { formatDistanceToNow } from "date-fns";

interface Profile {
  full_name: string;
  email: string;
}

interface LoyaltyPoints {
  points: number;
  total_earned: number;
  rewards_redeemed: number;
}

interface Order {
  id: string;
  total: number;
  status: string;
  created_at: string;
  order_items: {
    quantity: number;
    products: {
      name: string;
    };
  }[];
}

const Profile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loyaltyPoints, setLoyaltyPoints] = useState<LoyaltyPoints | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // Fetch profile
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) {
      toast.error("Failed to load profile");
    } else {
      setProfile(profileData);
    }

    // Fetch loyalty points
    const { data: loyaltyData, error: loyaltyError } = await supabase
      .from("loyalty_points")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (loyaltyError) {
      toast.error("Failed to load loyalty points");
    } else {
      setLoyaltyPoints(loyaltyData);
    }

    // Fetch orders
    const { data: ordersData, error: ordersError } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items(
          quantity,
          products(name)
        )
      `
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10);

    if (ordersError) {
      toast.error("Failed to load orders");
    } else {
      setOrders(ordersData || []);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">Manage your account and view your orders</p>
      </div>

      {profile && (
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="text-lg font-semibold">{profile.full_name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-lg">{profile.email}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {loyaltyPoints && (
        <LoyaltyCard
          points={loyaltyPoints.points}
          totalEarned={loyaltyPoints.total_earned}
          rewardsRedeemed={loyaltyPoints.rewards_redeemed}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>Your recent purchases</CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No orders yet</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-border rounded-lg p-4 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">
                        ${order.total.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(order.created_at), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-accent text-accent-foreground rounded-full">
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm">
                    {order.order_items.map((item, idx) => (
                      <p key={idx} className="text-muted-foreground">
                        {item.quantity}x {item.products.name}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
