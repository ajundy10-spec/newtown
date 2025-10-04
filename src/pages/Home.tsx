import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Coffee, Sparkles, Star, Clock, Gift, Award, Heart } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 md:py-32 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Premium Coffee Experience</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">
              Your Perfect Coffee
              <br />
              <span className="text-primary">Awaits You</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover expertly crafted beverages made from the finest beans. Every cup is a journey of flavor.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                onClick={() => navigate("/menu")}
                className="text-lg px-8 py-6 rounded-full"
              >
                <Coffee className="mr-2 w-5 h-5" />
                Explore Menu
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate("/beans")}
                className="text-lg px-8 py-6 rounded-full"
              >
                Shop Coffee Beans
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-16 sm:py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Current Offers
            </h2>
            <p className="text-lg text-muted-foreground">
              Limited time promotions you don't want to miss
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Promo Card 1 */}
            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Clock className="w-8 h-8 text-destructive" />
                </div>
                <div className="space-y-2">
                  <div className="inline-block bg-destructive/10 text-destructive px-3 py-1 rounded-full text-sm font-bold">
                    30% OFF
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Happy Hour</h3>
                  <p className="text-muted-foreground">
                    Daily 3-5 PM. All beverages 30% off during your afternoon break.
                  </p>
                </div>
                <Button 
                  onClick={() => navigate("/menu")}
                  className="w-full"
                >
                  Order Now
                </Button>
              </CardContent>
            </Card>

            {/* Promo Card 2 */}
            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Gift className="w-8 h-8 text-secondary" />
                </div>
                <div className="space-y-2">
                  <div className="inline-block bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-bold">
                    FREE DRINK
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Loyalty Rewards</h3>
                  <p className="text-muted-foreground">
                    Collect 10 stamps, get your favorite beverage free. Join today!
                  </p>
                </div>
                <Button 
                  onClick={() => navigate("/profile")}
                  variant="secondary"
                  className="w-full"
                >
                  Join Now
                </Button>
              </CardContent>
            </Card>

            {/* Promo Card 3 */}
            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="w-8 h-8 text-accent" />
                </div>
                <div className="space-y-2">
                  <div className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-bold">
                    NEW
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Seasonal Menu</h3>
                  <p className="text-muted-foreground">
                    Try our exclusive seasonal drinks crafted with premium ingredients.
                  </p>
                </div>
                <Button 
                  onClick={() => navigate("/menu")}
                  variant="outline"
                  className="w-full"
                >
                  Explore
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Why Choose Newtown?
            </h2>
            <p className="text-lg text-muted-foreground">
              Coffee crafted with passion and precision
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: Coffee, 
                title: "Premium Beans", 
                desc: "Ethically sourced from top farms worldwide",
                color: "primary"
              },
              { 
                icon: Award, 
                title: "Expert Baristas", 
                desc: "Trained professionals crafting every cup",
                color: "secondary"
              },
              { 
                icon: Heart, 
                title: "Cozy Space", 
                desc: "A welcoming atmosphere to relax",
                color: "accent"
              },
              { 
                icon: Star, 
                title: "Rewards Program", 
                desc: "Earn points with every purchase",
                color: "primary"
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card key={idx} className="text-center hover:shadow-lg transition-all">
                  <CardContent className="pt-8 pb-6 space-y-4">
                    <div className={`w-16 h-16 mx-auto bg-${item.color}/10 rounded-2xl flex items-center justify-center`}>
                      <Icon className={`w-8 h-8 text-${item.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 bg-primary">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground">
            Start Your Coffee Journey
          </h2>
          <p className="text-lg sm:text-xl text-primary-foreground/90">
            Join thousands who choose Newtown Coffee every day
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg"
              onClick={() => navigate("/menu")}
              variant="secondary"
              className="text-lg px-8 py-6 rounded-full"
            >
              View Full Menu
            </Button>
            <Button 
              size="lg"
              onClick={() => navigate("/auth")}
              variant="outline"
              className="text-lg px-8 py-6 rounded-full border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
            >
              Create Account
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
