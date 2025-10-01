import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface User {
  id: string;
  full_name: string;
  email: string;
  created_at: string;
  loyalty_points: {
    points: number;
    total_earned: number;
    rewards_redeemed: number;
  }[];
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (profilesError) {
      toast.error("Failed to load users");
      console.error(profilesError);
      setLoading(false);
      return;
    }

    // Fetch loyalty points separately for each user
    const usersWithLoyalty = await Promise.all(
      (profilesData || []).map(async (profile) => {
        const { data: loyaltyData } = await supabase
          .from("loyalty_points")
          .select("points, total_earned, rewards_redeemed")
          .eq("user_id", profile.id)
          .maybeSingle();

        return {
          ...profile,
          loyalty_points: loyaltyData ? [loyaltyData] : [],
        };
      })
    );

    setUsers(usersWithLoyalty);
    setLoading(false);
  };

  if (loading) {
    return <div className="text-center py-8">Loading users...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <CardTitle className="text-lg">{user.full_name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-sm">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="text-sm">
                  {formatDistanceToNow(new Date(user.created_at), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              {user.loyalty_points[0] && (
                <div className="pt-2 border-t border-border">
                  <p className="text-sm font-semibold mb-1">Loyalty Stats</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Points</p>
                      <p className="text-lg font-bold">
                        {user.loyalty_points[0].points}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Earned</p>
                      <p className="text-lg font-bold">
                        {user.loyalty_points[0].total_earned}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Redeemed</p>
                      <p className="text-lg font-bold">
                        {user.loyalty_points[0].rewards_redeemed}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {users.length === 0 && (
        <p className="text-center text-muted-foreground py-8">No users found</p>
      )}
    </div>
  );
};

export default UserManagement;
