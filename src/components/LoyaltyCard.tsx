import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface LoyaltyCardProps {
  points: number;
  totalEarned: number;
  rewardsRedeemed: number;
}

const POINTS_FOR_REWARD = 10;

const LoyaltyCard = ({ points, totalEarned, rewardsRedeemed }: LoyaltyCardProps) => {
  const progress = (points / POINTS_FOR_REWARD) * 100;

  return (
    <div className="glass-card p-8 bg-gradient-to-br from-secondary/10 to-accent/10 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl" />
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-8">
          <div className="smooth-glass rounded-full w-14 h-14 flex items-center justify-center">
            <Star className="h-7 w-7" />
          </div>
          <h2 className="text-3xl font-bold">Loyalty Rewards</h2>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium">
                {points} / {POINTS_FOR_REWARD} points
              </span>
              <span className="text-lg font-bold smooth-glass px-4 py-2 rounded-full">
                {points >= POINTS_FOR_REWARD ? "🎉 Free Coffee!" : `${POINTS_FOR_REWARD - points} more to go`}
              </span>
            </div>
            <Progress value={progress} className="h-3 smooth-glass" />
          </div>
          
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-foreground/10">
            <div className="smooth-glass rounded-2xl p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wide">Total Earned</p>
              <p className="text-4xl font-bold">{totalEarned}</p>
            </div>
            <div className="smooth-glass rounded-2xl p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wide">Rewards Redeemed</p>
              <p className="text-4xl font-bold">{rewardsRedeemed}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyCard;
