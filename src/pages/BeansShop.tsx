import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative py-24 px-4 mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 via-accent/20 to-primary/30" />
        <div className="absolute inset-0 backdrop-blur-[100px]" />
        <div className="relative max-w-7xl mx-auto text-center space-y-6">
          <div className="smooth-glass rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 animate-fade-in">
            <Leaf className="w-12 h-12" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold animate-fade-in" style={{ animationDelay: '0.1s' }}>Coffee Beans Shop</h1>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Premium coffee beans sourced from the world's finest farms. Roasted to perfection for your perfect brew.
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="sticky top-0 z-40 smooth-glass border-b border-border pb-4 mb-6">
        <div className="px-4">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Roast Level</h2>
          </div>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-3 pb-2">
              {roastLevels.map((roast) => {
                const isActive = selectedRoast === roast;
                return (
                  <Button
                    key={roast}
                    onClick={() => setSelectedRoast(roast)}
                    className={`flex-shrink-0 transition-all duration-500 ${
                      isActive 
                        ? "smooth-glass hover:scale-105 shadow-lg" 
                        : "glass hover:scale-105"
                    }`}
                  >
                    {roast}
                  </Button>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <div className="px-4 mt-4">
          <h3 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
            Origin
          </h3>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-2 pb-2">
              {origins.map((origin) => {
                const isActive = selectedOrigin === origin;
                return (
                  <Button
                    key={origin}
                    onClick={() => setSelectedOrigin(origin)}
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className="flex-shrink-0 transition-all duration-300"
                  >
                    {origin}
                  </Button>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 max-w-7xl mx-auto">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const parts = product.subcategory.split(" - ");
            const roast = parts[0] || "";
            const origin = parts[1] || "";
            
            return (
              <div
                key={product.id}
                className="glass-card cursor-pointer overflow-hidden group"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {roast}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {origin}
                    </Badge>
                  </div>
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
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="smooth-glass rounded-3xl p-12 max-w-md mx-auto">
              <Leaf className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground text-lg mb-4">No coffee beans match your filters.</p>
              <Button
                variant="outline"
                className="smooth-glass hover:scale-105 transition-all duration-300"
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
