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

  const categories = Object.keys(groupedProducts);
  const subcategories = selectedCategory ? Object.keys(groupedProducts[selectedCategory] || {}) : [];
  
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
      <div className="relative py-20 px-4 mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30" />
        <div className="absolute inset-0 backdrop-blur-[100px]" />
        <div className="relative max-w-7xl mx-auto text-center space-y-4">
          <div className="smooth-glass rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Coffee className="w-10 h-10" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold">Our Menu</h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">Freshly brewed coffee & delicious treats crafted with love</p>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="sticky top-0 z-40 smooth-glass border-b border-border pb-4 mb-6">
        <div className="px-4">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Categories</h2>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-3 pb-2">
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
                    className={`flex-shrink-0 gap-2 transition-all duration-500 ${
                      isActive 
                        ? "smooth-glass hover:scale-105 shadow-lg" 
                        : "glass hover:scale-105"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
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
                      className={`flex-shrink-0 transition-all duration-300 ${
                        isActive ? "hover:scale-105" : ""
                      }`}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="glass-card cursor-pointer overflow-hidden group"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 line-clamp-1">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                  <Button size="sm" variant="secondary" className="group-hover:scale-105 transition-transform duration-300">
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="smooth-glass rounded-3xl p-12 max-w-md mx-auto">
              <Coffee className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground text-lg">No products available in this category.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
