import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  subcategory: string;
}

const Menu = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("available", true)
      .order("category", { ascending: true })
      .order("subcategory", { ascending: true });

    if (error) {
      toast.error("Failed to load products");
      console.error(error);
    } else {
      setProducts(data || []);
      // Expand all categories by default
      const categories = new Set((data || []).map(p => p.category));
      setExpandedCategories(categories);
    }
    setLoading(false);
  };

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  // Group products by category and subcategory
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = {};
    }
    if (!acc[product.category][product.subcategory]) {
      acc[product.category][product.subcategory] = [];
    }
    acc[product.category][product.subcategory].push(product);
    return acc;
  }, {} as Record<string, Record<string, Product[]>>);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading menu...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-primary">Our Menu</h1>
        <p className="text-muted-foreground">Freshly brewed coffee & delicious treats</p>
      </div>

      {Object.entries(groupedProducts).map(([category, subcategories]) => {
        const isExpanded = expandedCategories.has(category);
        
        return (
          <div key={category} className="space-y-4">
            <button
              onClick={() => toggleCategory(category)}
              className="w-full flex items-center justify-between bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              <h2 className="text-2xl font-semibold">{category}</h2>
              {isExpanded ? (
                <ChevronUp className="h-6 w-6" />
              ) : (
                <ChevronDown className="h-6 w-6" />
              )}
            </button>

            {isExpanded && (
              <div className="space-y-6 pl-4">
                {Object.entries(subcategories).map(([subcategory, items]) => (
                  <div key={subcategory} className="space-y-3">
                    <h3 className="text-xl font-semibold text-accent">{subcategory}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {items.map((product) => (
                        <Card
                          key={product.id}
                          className="cursor-pointer hover:shadow-lg transition-shadow border-border"
                          onClick={() => navigate(`/product/${product.id}`)}
                        >
                          <CardHeader className="p-0">
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                          </CardHeader>
                          <CardContent className="p-4">
                            <CardTitle className="mb-2">{product.name}</CardTitle>
                            <CardDescription className="mb-4 line-clamp-2">
                              {product.description}
                            </CardDescription>
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold text-primary">
                                ${product.price.toFixed(2)}
                              </span>
                              <Button size="sm" variant="secondary">View Details</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
