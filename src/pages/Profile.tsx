import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import LoyaltyCard from "@/components/LoyaltyCard";
import { formatDistanceToNow } from "date-fns";
import { User, ShoppingBag } from "lucide-react";

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
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative py-20 px-4 mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30" />
        <div className="absolute inset-0 backdrop-blur-[100px]" />
        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <div className="smooth-glass rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold">My Profile</h1>
          <p className="text-muted-foreground text-xl">Manage your account and track your rewards</p>
        </div>
      </div>

      <div className="px-4 max-w-4xl mx-auto space-y-6">
        {profile && (
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="smooth-glass rounded-full w-12 h-12 flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              Account Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground uppercase tracking-wide">Name</p>
                <p className="text-xl font-semibold">{profile.full_name}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground uppercase tracking-wide">Email</p>
                <p className="text-xl">{profile.email}</p>
              </div>
            </div>
          </div>
        )}

        {loyaltyPoints && (
          <LoyaltyCard
            points={loyaltyPoints.points}
            totalEarned={loyaltyPoints.total_earned}
            rewardsRedeemed={loyaltyPoints.rewards_redeemed}
          />
        )}

        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <div className="smooth-glass rounded-full w-12 h-12 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
            Order History
          </h2>
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="smooth-glass rounded-3xl p-8 inline-block">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">No orders yet</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="glass-hover rounded-2xl p-6 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        ${order.total.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(order.created_at), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <span className="smooth-glass px-4 py-2 rounded-full text-sm font-semibold">
                      {order.status}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {order.order_items.map((item, idx) => (
                      <p key={idx} className="text-sm text-muted-foreground">
                        {item.quantity}x {item.products.name}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
