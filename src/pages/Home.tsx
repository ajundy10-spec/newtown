import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Coffee, Sparkles, Star } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[image:var(--gradient-hero)] py-16 sm:py-20 md:py-28 px-4">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-accent rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-20 right-10 w-80 h-80 sm:w-[28rem] sm:h-[28rem] bg-secondary rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="container mx-auto text-center relative z-10 space-y-8 sm:space-y-10">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/15 backdrop-blur-md px-5 sm:px-7 py-2.5 rounded-full border border-primary-foreground/30 shadow-[var(--shadow-sm)]">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-primary-foreground tracking-wide">Premium Coffee Experience</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-primary-foreground tracking-tight px-4 leading-[1.1]">
            Welcome to<br />
            <span className="bg-gradient-to-r from-primary-foreground via-accent to-primary-foreground bg-clip-text text-transparent animate-gradient">
              Newtown Coffee
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary-foreground/95 max-w-3xl mx-auto leading-relaxed px-4 font-light">
            Where every cup is crafted with passion and precision.<br className="hidden sm:block" /> Experience the finest coffee culture.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center pt-6 px-4">
            <Button 
              size="lg" 
              onClick={() => navigate("/menu")}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/95 hover:scale-105 text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 rounded-full shadow-[var(--shadow-xl)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 w-full sm:w-auto font-semibold"
            >
              <Coffee className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
              Explore Menu
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/profile")}
              className="bg-primary-foreground/10 backdrop-blur-sm border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/20 hover:border-primary-foreground/60 hover:scale-105 text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 rounded-full w-full sm:w-auto font-semibold transition-all duration-300"
            >
              <Star className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
              Loyalty Rewards
            </Button>
          </div>
        </div>
      </section>

      {/* Promotional Section */}
      <section className="py-12 sm:py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Special Offers
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Indulge in our exclusive promotions and seasonal favorites
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Promo Card 1 */}
            <Card className="group hover:shadow-[var(--shadow-xl)] transition-all duration-500 border-0 overflow-hidden hover:-translate-y-2 shadow-[var(--shadow-md)]">
              <div className="relative h-56 bg-[image:var(--gradient-accent)] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent group-hover:from-black/20 transition-all" />
                <div className="absolute top-5 right-5 bg-destructive text-destructive-foreground px-5 py-2.5 rounded-full font-bold text-base shadow-[var(--shadow-lg)] animate-pulse">
                  30% OFF
                </div>
                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Coffee className="w-28 h-28 text-primary-foreground drop-shadow-2xl" />
                </div>
              </div>
              <CardContent className="p-7 space-y-5 bg-[image:var(--gradient-card)]">
                <h3 className="text-2xl font-bold text-foreground">Happy Hour Special</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get 30% off on all beverages between 3-5 PM daily. Perfect for your afternoon pick-me-up!
                </p>
                <Button 
                  onClick={() => navigate("/menu")}
                  className="w-full bg-secondary hover:bg-secondary/90 hover:scale-105 transition-all shadow-[var(--shadow-sm)] rounded-full py-6 font-semibold"
                >
                  Order Now
                </Button>
              </CardContent>
            </Card>

            {/* Promo Card 2 */}
            <Card className="group hover:shadow-[var(--shadow-xl)] transition-all duration-500 border-0 overflow-hidden hover:-translate-y-2 shadow-[var(--shadow-md)]">
              <div className="relative h-56 bg-[image:var(--gradient-hero)] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent group-hover:from-black/20 transition-all" />
                <div className="absolute top-5 right-5 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-full font-bold text-base shadow-[var(--shadow-lg)]">
                  BUY 1 GET 1
                </div>
                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Star className="w-28 h-28 text-primary-foreground drop-shadow-2xl" />
                </div>
              </div>
              <CardContent className="p-7 space-y-5 bg-[image:var(--gradient-card)]">
                <h3 className="text-2xl font-bold text-foreground">Loyalty Rewards</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Collect points with every purchase. Earn 10 stamps and get a free beverage of your choice!
                </p>
                <Button 
                  onClick={() => navigate("/profile")}
                  className="w-full bg-accent hover:bg-accent/90 hover:scale-105 transition-all shadow-[var(--shadow-sm)] rounded-full py-6 font-semibold"
                >
                  Join Now
                </Button>
              </CardContent>
            </Card>

            {/* Promo Card 3 */}
            <Card className="group hover:shadow-[var(--shadow-xl)] transition-all duration-500 border-0 overflow-hidden hover:-translate-y-2 shadow-[var(--shadow-md)]">
              <div className="relative h-56 bg-gradient-to-br from-primary via-accent to-secondary overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent group-hover:from-black/20 transition-all" />
                <div className="absolute top-5 right-5 bg-accent text-accent-foreground px-5 py-2.5 rounded-full font-bold text-base shadow-[var(--shadow-lg)]">
                  NEW
                </div>
                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Sparkles className="w-28 h-28 text-primary-foreground drop-shadow-2xl animate-pulse" />
                </div>
              </div>
              <CardContent className="p-7 space-y-5 bg-[image:var(--gradient-card)]">
                <h3 className="text-2xl font-bold text-foreground">Seasonal Collection</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Try our new seasonal beverages! Handcrafted with premium ingredients and unique flavors.
                </p>
                <Button 
                  onClick={() => navigate("/menu")}
                  className="w-full bg-primary hover:bg-primary/90 hover:scale-105 transition-all shadow-[var(--shadow-sm)] rounded-full py-6 font-semibold"
                >
                  Discover More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              The Newtown Difference
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Experience coffee crafted to perfection
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { title: "Premium Beans", desc: "Ethically sourced from the finest farms worldwide" },
              { title: "Expert Baristas", desc: "Trained professionals crafting every cup with care" },
              { title: "Cozy Atmosphere", desc: "A welcoming space to relax and enjoy" },
              { title: "Loyalty Program", desc: "Earn rewards with every purchase" }
            ].map((item, idx) => (
              <Card key={idx} className="text-center p-8 hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all duration-300 border-0 shadow-[var(--shadow-sm)] bg-[image:var(--gradient-card)]">
                <CardContent className="pt-6 space-y-4">
                  <div className="w-20 h-20 mx-auto bg-[image:var(--gradient-accent)] rounded-2xl flex items-center justify-center shadow-[var(--shadow-md)] group-hover:shadow-[var(--shadow-lg)] transition-all">
                    <Coffee className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 bg-[image:var(--gradient-hero)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-accent rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>
        <div className="container mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-foreground px-4 leading-tight">
            Ready to Experience Excellence?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/95 max-w-3xl mx-auto px-4 font-light">
            Join thousands of coffee lovers who start their day with Newtown Coffee
          </p>
          <Button 
            size="lg"
            onClick={() => navigate("/menu")}
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/95 hover:scale-110 text-base sm:text-lg px-10 sm:px-14 py-6 sm:py-7 rounded-full shadow-[var(--shadow-xl)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 mx-4 font-semibold"
          >
            View Full Menu
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
