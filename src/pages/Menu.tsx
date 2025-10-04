import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Coffee, Cookie, Sandwich, Sparkles } from "lucide-react";

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
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");

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
    } else {
      setProducts(data || []);
      // Set first category as default
      if (data && data.length > 0) {
        const firstCategory = data[0].category;
        setSelectedCategory(firstCategory);
        const firstSubcategory = data.find(p => p.category === firstCategory)?.subcategory || "";
        setSelectedSubcategory(firstSubcategory);
      }
    }
    setLoading(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Coffee": return Coffee;
      case "Tea & More": return Sparkles;
      case "Bakery": return Cookie;
      case "Food": return Sandwich;
      default: return Coffee;
    }
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

  // Get unique categories and subcategories
  const categories = Object.keys(groupedProducts);
  const subcategories = selectedCategory ? Object.keys(groupedProducts[selectedCategory] || {}) : [];
  
  // Filter products based on selection
  const filteredProducts = selectedCategory && selectedSubcategory
    ? groupedProducts[selectedCategory]?.[selectedSubcategory] || []
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading menu...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-accent text-primary-foreground py-8 px-4 mb-6">
        <div className="max-w-7xl mx-auto text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">Our Menu</h1>
          <p className="text-primary-foreground/90 text-sm md:text-base">Freshly brewed coffee & delicious treats</p>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border pb-4 mb-6">
        <div className="px-4">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Categories</h2>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-2 pb-2">
              {categories.map((category) => {
                const Icon = getCategoryIcon(category);
                const isActive = selectedCategory === category;
                return (
                  <Button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      const firstSub = Object.keys(groupedProducts[category] || {})[0];
                      setSelectedSubcategory(firstSub || "");
                    }}
                    variant={isActive ? "default" : "outline"}
                    className={`flex-shrink-0 gap-2 ${isActive ? "shadow-lg" : ""}`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="whitespace-nowrap">{category}</span>
                  </Button>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Subcategory Navigation */}
        {subcategories.length > 0 && (
          <div className="px-4 mt-4">
            <h3 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
              {selectedCategory}
            </h3>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex gap-2 pb-2">
                {subcategories.map((subcategory) => {
                  const isActive = selectedSubcategory === subcategory;
                  return (
                    <Button
                      key={subcategory}
                      onClick={() => setSelectedSubcategory(subcategory)}
                      variant={isActive ? "secondary" : "ghost"}
                      size="sm"
                      className="flex-shrink-0"
                    >
                      {subcategory}
                    </Button>
                  );
                })}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-border overflow-hidden"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <CardHeader className="p-0">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-40 sm:h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-3 sm:p-4">
                <CardTitle className="mb-1 text-base sm:text-lg line-clamp-1">{product.name}</CardTitle>
                <CardDescription className="mb-3 text-xs sm:text-sm line-clamp-2">
                  {product.description}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <span className="text-xl sm:text-2xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                  <Button size="sm" variant="secondary" className="text-xs sm:text-sm">
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products available in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
