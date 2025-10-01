import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    if (!id) return;

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      toast.error("Failed to load product");
      navigate("/");
    } else {
      setProduct(data);
    }
    setLoading(false);
  };

  const handlePurchase = async () => {
    if (!product) return;

    setPurchasing(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("Please sign in to make a purchase");
      navigate("/auth");
      return;
    }

    // Create order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total: product.price,
        status: "completed",
      })
      .select()
      .single();

    if (orderError) {
      toast.error("Failed to create order");
      setPurchasing(false);
      return;
    }

    // Create order item
    const { error: itemError } = await supabase.from("order_items").insert({
      order_id: order.id,
      product_id: product.id,
      quantity: 1,
      price: product.price,
    });

    if (itemError) {
      toast.error("Failed to add item to order");
      setPurchasing(false);
      return;
    }

    // Get current loyalty points
    const { data: loyaltyData } = await supabase
      .from("loyalty_points")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (loyaltyData) {
      // Use the secure SECURITY DEFINER function to update loyalty points
      // This prevents users from directly manipulating their points
      const { error: loyaltyError } = await supabase.rpc(
        "update_loyalty_points_after_purchase",
        {
          p_user_id: user.id,
          p_order_id: order.id,
        }
      );

      if (loyaltyError) {
        console.error("Failed to update loyalty points", loyaltyError);
      } else {
        // Fetch updated points to show correct message
        const { data: updatedLoyalty } = await supabase
          .from("loyalty_points")
          .select("points, rewards_redeemed")
          .eq("user_id", user.id)
          .single();

        if (updatedLoyalty) {
          const didRedeem =
            updatedLoyalty.rewards_redeemed > loyaltyData.rewards_redeemed;
          const newPoints = updatedLoyalty.points;

          if (didRedeem) {
            toast.success(
              "🎉 Congratulations! You've earned a free coffee!"
            );
          } else {
            toast.success(
              `Purchase successful! You earned 1 point. ${10 - newPoints} more for a reward!`
            );
          }
        }
      }
    }

    setPurchasing(false);
    navigate("/profile");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      <Button variant="ghost" onClick={() => navigate("/")}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Menu
      </Button>

      <Card>
        <CardHeader className="p-0">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-96 object-cover rounded-t-lg"
          />
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-3xl">{product.name}</CardTitle>
              <span className="text-3xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{product.category}</p>
            <CardDescription className="text-base">{product.description}</CardDescription>
          </div>

          <Button
            className="w-full"
            size="lg"
            onClick={handlePurchase}
            disabled={purchasing}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            {purchasing ? "Processing..." : "Purchase Now"}
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            ⭐ Earn 1 loyalty point with this purchase!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetail;
