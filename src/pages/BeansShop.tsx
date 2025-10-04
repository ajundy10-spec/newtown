import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Coffee, Filter } from "lucide-react";
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

  // Extract unique roast levels and origins from subcategories
  const roastLevels = ["All", ...new Set(products.map(p => {
    const parts = p.subcategory.split(" - ");
    return parts[0] || "Unknown";
  }))];

  const origins = ["All", ...new Set(products.map(p => {
    const parts = p.subcategory.split(" - ");
    return parts[1] || "Unknown";
  }))];

  // Filter products
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
      <div className="bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground py-12 px-4 mb-6">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-foreground/20 rounded-full blur-2xl animate-pulse" />
              <Coffee className="w-20 h-20 relative z-10 drop-shadow-lg" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Coffee Beans Shop</h1>
          <p className="text-primary-foreground/90 text-base md:text-lg max-w-2xl mx-auto">
            Premium coffee beans sourced from the world's finest farms. Roasted to perfection for your perfect brew.
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border pb-4 mb-6">
        {/* Roast Level Filter */}
        <div className="px-4">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Roast Level</h2>
          </div>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-2 pb-2">
              {roastLevels.map((roast) => {
                const isActive = selectedRoast === roast;
                return (
                  <Button
                    key={roast}
                    onClick={() => setSelectedRoast(roast)}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    className={`flex-shrink-0 ${isActive ? "shadow-lg" : ""}`}
                  >
                    {roast}
                  </Button>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Origin Filter */}
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
                    className="flex-shrink-0"
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
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => {
            const parts = product.subcategory.split(" - ");
            const roast = parts[0] || "";
            const origin = parts[1] || "";
            
            return (
              <Card
                key={product.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-border overflow-hidden"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <CardHeader className="p-0">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs flex items-center gap-1">
                      <Coffee className="w-3 h-3" />
                      {roast}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {origin}
                    </Badge>
                  </div>
                  <CardTitle className="mb-2 text-lg line-clamp-1">{product.name}</CardTitle>
                  <CardDescription className="mb-3 text-sm line-clamp-2">
                    {product.description}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                    <Button size="sm" variant="secondary">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Coffee className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No coffee beans match your filters.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSelectedRoast("All");
                setSelectedOrigin("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BeansShop;
