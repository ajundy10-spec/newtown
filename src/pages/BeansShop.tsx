import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Coffee, Filter, Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BeanProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  subcategory: string;
}

const BeansShop = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<BeanProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoast, setSelectedRoast] = useState<string>("All");
  const [selectedOrigin, setSelectedOrigin] = useState<string>("All");

  useEffect(() => {
    fetchBeans();
  }, []);

  const fetchBeans = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("available", true)
      .eq("category", "Beans")
      .order("subcategory", { ascending: true });

    if (error) {
      toast.error("Failed to load coffee beans");
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const roastLevels = ["All", ...new Set(products.map(p => {
    const parts = p.subcategory.split(" - ");
    return parts[0] || "Unknown";
  }))];

  const origins = ["All", ...new Set(products.map(p => {
    const parts = p.subcategory.split(" - ");
    return parts[1] || "Unknown";
  }))];

  const filteredProducts = products.filter(product => {
    const parts = product.subcategory.split(" - ");
    const roast = parts[0] || "";
    const origin = parts[1] || "";
    
    const matchesRoast = selectedRoast === "All" || roast === selectedRoast;
    const matchesOrigin = selectedOrigin === "All" || origin === selectedOrigin;
    
    return matchesRoast && matchesOrigin;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading coffee beans...</p>
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
              <Leaf className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">Coffee Beans</h1>
            <p className="text-muted-foreground text-sm md:text-lg">Premium beans roasted to perfection</p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-background/40 border-b border-border/30 pb-3 md:pb-4 mb-4 md:mb-6">
        <div className="px-4">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
            <h2 className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wide">Roast Level</h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {roastLevels.map((roast) => {
              const isActive = selectedRoast === roast;
              return (
                <button
                  key={roast}
                  onClick={() => setSelectedRoast(roast)}
                  className={`flex-shrink-0 snap-start px-3 md:px-4 py-2 md:py-2.5 rounded-xl backdrop-blur-md text-sm md:text-base font-medium transition-all duration-300 border ${
                    isActive 
                      ? "bg-primary/10 border-primary/30 scale-105 shadow-lg" 
                      : "bg-background/20 border-border/20 hover:bg-background/30 hover:scale-105 active:scale-95"
                  }`}
                >
                  {roast}
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-4 mt-3 md:mt-4">
          <h3 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
            Origin
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {origins.map((origin) => {
              const isActive = selectedOrigin === origin;
              return (
                <button
                  key={origin}
                  onClick={() => setSelectedOrigin(origin)}
                  className={`flex-shrink-0 snap-start px-3 md:px-4 py-1.5 md:py-2 rounded-full backdrop-blur-md text-xs md:text-sm font-medium transition-all duration-300 border ${
                    isActive 
                      ? "bg-secondary/10 border-secondary/30 shadow-md scale-105" 
                      : "bg-background/20 border-border/20 hover:bg-background/30 hover:scale-105 active:scale-95"
                  }`}
                >
                  {origin}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 max-w-7xl mx-auto">
        <div className="mb-3 md:mb-4">
          <p className="text-xs md:text-sm text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
          {filteredProducts.map((product) => {
            const parts = product.subcategory.split(" - ");
            const roast = parts[0] || "";
            const origin = parts[1] || "";
            
            return (
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
                  <div className="flex gap-1 mb-2 flex-wrap">
                    <Badge variant="secondary" className="text-[9px] md:text-xs px-1.5 md:px-2 py-0 md:py-0.5">
                      {roast}
                    </Badge>
                    <Badge variant="outline" className="text-[9px] md:text-xs px-1.5 md:px-2 py-0 md:py-0.5">
                      {origin}
                    </Badge>
                  </div>
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
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 md:py-20">
            <div className="smooth-glass rounded-3xl p-8 md:p-12 max-w-md mx-auto">
              <Leaf className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground text-sm md:text-lg mb-4">No coffee beans match your filters.</p>
              <Button
                variant="outline"
                className="smooth-glass hover:scale-105 transition-all duration-300 text-xs md:text-sm"
                onClick={() => {
                  setSelectedRoast("All");
                  setSelectedOrigin("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BeansShop;
