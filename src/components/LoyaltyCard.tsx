import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee } from "lucide-react";
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
    <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coffee className="h-5 w-5" />
          Loyalty Rewards
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">
              {points} / {POINTS_FOR_REWARD} points
            </span>
            <span className="text-sm font-bold">
              {points >= POINTS_FOR_REWARD ? "🎉 Free Coffee!" : `${POINTS_FOR_REWARD - points} more to go`}
            </span>
          </div>
          <Progress value={progress} className="h-2 bg-primary-foreground/30" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-primary-foreground/30">
          <div>
            <p className="text-sm opacity-90">Total Earned</p>
            <p className="text-2xl font-bold">{totalEarned}</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Rewards Redeemed</p>
            <p className="text-2xl font-bold">{rewardsRedeemed}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoyaltyCard;
