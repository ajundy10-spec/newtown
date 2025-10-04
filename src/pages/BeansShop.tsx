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
      <div className="bg-[image:var(--gradient-hero)] text-primary-foreground py-16 px-4 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-accent rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-secondary rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="max-w-7xl mx-auto text-center space-y-5 relative z-10">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-foreground rounded-full blur-xl opacity-40 animate-pulse" />
              <Coffee className="w-20 h-20 relative z-10 drop-shadow-2xl" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">Coffee Beans Shop</h1>
          <p className="text-primary-foreground/95 text-base md:text-xl lg:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
            Premium coffee beans sourced from the world's finest farms.<br className="hidden sm:block" /> Roasted to perfection for your perfect brew.
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="sticky top-0 z-40 bg-background/98 backdrop-blur-md border-b border-border pb-5 mb-8 shadow-[var(--shadow-sm)]">
        {/* Roast Level Filter */}
        <div className="px-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-primary" />
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Roast Level</h2>
          </div>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-3 pb-2">
              {roastLevels.map((roast) => {
                const isActive = selectedRoast === roast;
                return (
                  <Button
                    key={roast}
                    onClick={() => setSelectedRoast(roast)}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    className={`flex-shrink-0 rounded-full px-5 font-semibold transition-all duration-300 ${isActive ? "shadow-[var(--shadow-md)] scale-105" : "hover:scale-105"}`}
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
        <div className="px-4 mt-5">
          <h3 className="text-[10px] font-bold text-muted-foreground mb-3 uppercase tracking-widest">
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
                    className={`flex-shrink-0 rounded-full font-medium transition-all duration-200 ${isActive ? "scale-105" : "hover:scale-105"}`}
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
                className="cursor-pointer hover:shadow-[var(--shadow-lg)] transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 border-0 shadow-[var(--shadow-sm)] overflow-hidden group bg-[image:var(--gradient-card)]"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <CardHeader className="p-0 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </CardHeader>
                <CardContent className="p-5">
                  <div className="flex gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs font-semibold rounded-full px-3 py-1 shadow-[var(--shadow-sm)]">
                      {roast}
                    </Badge>
                    <Badge variant="outline" className="text-xs font-semibold rounded-full px-3 py-1">
                      {origin}
                    </Badge>
                  </div>
                  <CardTitle className="mb-2 text-lg line-clamp-1 group-hover:text-primary transition-colors">{product.name}</CardTitle>
                  <CardDescription className="mb-4 text-sm line-clamp-2 leading-relaxed">
                    {product.description}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                    <Button size="sm" variant="secondary" className="rounded-full px-5 font-semibold hover:scale-105 transition-all">
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
