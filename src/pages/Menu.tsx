import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
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
    <div className="min-h-screen pb-20 md:pb-8 bg-gradient-to-b from-background via-background to-secondary/5">
      {/* Compact Hero Section */}
      <div className="relative pt-6 md:pt-12 pb-6 md:pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-md md:max-w-2xl mx-auto space-y-3 md:space-y-4">
            <div className="smooth-glass rounded-2xl w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto md:mx-0">
              <Coffee className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">Our Menu</h1>
            <p className="text-muted-foreground text-sm md:text-lg">Freshly brewed coffee & delicious treats</p>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-background/40 border-b border-border/30 pb-3 md:pb-4 mb-4 md:mb-6">
        <div className="px-4">
          <h2 className="text-xs md:text-sm font-semibold text-muted-foreground mb-2 md:mb-3 uppercase tracking-wide">Categories</h2>
          <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {categories.map((category) => {
              const Icon = getCategoryIcon(category);
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    const firstSub = Object.keys(groupedProducts[category] || {})[0];
                    setSelectedSubcategory(firstSub || "");
                  }}
                  className={`flex-shrink-0 snap-start flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-xl backdrop-blur-md transition-all duration-300 border ${
                    isActive 
                      ? "bg-primary/10 border-primary/30 scale-105 shadow-lg" 
                      : "bg-background/20 border-border/20 hover:bg-background/30 hover:scale-105 active:scale-95"
                  }`}
                >
                  <Icon className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  <span className="text-xs md:text-sm font-semibold whitespace-nowrap">{category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Subcategory Navigation */}
        {subcategories.length > 0 && (
          <div className="px-4 mt-3 md:mt-4">
            <h3 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
              {selectedCategory}
            </h3>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
              {subcategories.map((subcategory) => {
                const isActive = selectedSubcategory === subcategory;
                return (
                  <button
                    key={subcategory}
                    onClick={() => setSelectedSubcategory(subcategory)}
                    className={`flex-shrink-0 snap-start px-3 md:px-4 py-1.5 md:py-2 rounded-full backdrop-blur-md text-xs md:text-sm font-medium transition-all duration-300 border ${
                      isActive 
                        ? "bg-secondary/10 border-secondary/30 shadow-md scale-105" 
                        : "bg-background/20 border-border/20 hover:bg-background/30 hover:scale-105 active:scale-95"
                    }`}
                  >
                    {subcategory}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="glass-card cursor-pointer overflow-hidden group hover:scale-[1.02] transition-all duration-300 active:scale-95"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-2 md:p-4">
                <h3 className="text-xs md:text-base font-bold mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-muted-foreground text-[10px] md:text-sm mb-2 line-clamp-1">
                  {product.description}
                </p>
                <div className="flex items-center justify-between gap-1">
                  <span className="text-sm md:text-lg font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                  <button className="smooth-glass px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[10px] md:text-xs font-medium group-hover:scale-105 transition-transform duration-300">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 md:py-20">
            <div className="smooth-glass rounded-3xl p-8 md:p-12 max-w-md mx-auto">
              <Coffee className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground text-sm md:text-lg">No products available in this category.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
