import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Coffee, Sparkles, Star, Clock, Gift, Leaf, Award, Heart, ShoppingBag } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-secondary py-16 sm:py-20 md:py-24 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-primary-foreground rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-secondary-foreground rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-foreground/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">Premium Coffee Experience</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground tracking-tight mb-6">
            Newtown Coffee
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed mb-8">
            Where every cup is crafted with passion. Experience the finest coffee culture.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/menu")}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <Coffee className="mr-2 w-5 h-5" />
              Explore Menu
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/profile")}
              className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6 rounded-full"
            >
              <Star className="mr-2 w-5 h-5" />
              Rewards
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 px-4 bg-background border-b">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Button
              variant="outline"
              onClick={() => navigate("/menu")}
              className="h-auto py-6 flex-col gap-2 hover:bg-accent hover:text-accent-foreground"
            >
              <Coffee className="w-6 h-6" />
              <span className="font-semibold">Browse Menu</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/beans-shop")}
              className="h-auto py-6 flex-col gap-2 hover:bg-accent hover:text-accent-foreground"
            >
              <Leaf className="w-6 h-6" />
              <span className="font-semibold">Buy Beans</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/profile")}
              className="h-auto py-6 flex-col gap-2 hover:bg-accent hover:text-accent-foreground"
            >
              <Star className="w-6 h-6" />
              <span className="font-semibold">My Rewards</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-12 sm:py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Special Offers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Exclusive promotions crafted just for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="group hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-40 bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <Clock className="w-16 h-16 text-primary-foreground" />
                <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-3 py-1 rounded-full font-bold text-xs">
                  30% OFF
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="text-xl font-bold text-foreground mb-2">Happy Hour</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  3-5 PM daily • All beverages
                </p>
                <Button 
                  onClick={() => navigate("/menu")}
                  className="w-full"
                  size="sm"
                >
                  Order Now
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-40 bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <Gift className="w-16 h-16 text-primary-foreground" />
                <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground px-3 py-1 rounded-full font-bold text-xs">
                  FREE
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="text-xl font-bold text-foreground mb-2">Loyalty Rewards</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Earn 10 stamps • Get 1 free drink
                </p>
                <Button 
                  onClick={() => navigate("/profile")}
                  className="w-full"
                  size="sm"
                >
                  Join Now
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-40 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Sparkles className="w-16 h-16 text-primary-foreground" />
                <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full font-bold text-xs">
                  NEW
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="text-xl font-bold text-foreground mb-2">Seasonal Menu</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Premium ingredients • Limited time
                </p>
                <Button 
                  onClick={() => navigate("/menu")}
                  className="w-full"
                  size="sm"
                >
                  Discover
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Why Choose Newtown
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Quality, passion, and community in every cup
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { 
                icon: Leaf, 
                title: "Premium Beans", 
                desc: "Ethically sourced from top farms" 
              },
              { 
                icon: Award, 
                title: "Expert Baristas", 
                desc: "Trained professionals for every cup" 
              },
              { 
                icon: Heart, 
                title: "Cozy Space", 
                desc: "A welcoming atmosphere to relax" 
              },
              { 
                icon: Star, 
                title: "Rewards Program", 
                desc: "Earn points with every purchase" 
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card key={idx} className="text-center p-5 hover:shadow-lg transition-all">
                  <CardContent className="pt-5 space-y-3">
                    <div className="w-14 h-14 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <Icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary via-accent to-secondary">
        <div className="container mx-auto text-center max-w-3xl">
          <ShoppingBag className="w-12 h-12 text-primary-foreground mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
            Start Your Journey
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Join thousands of coffee lovers experiencing excellence daily
          </p>
          <Button 
            size="lg"
            onClick={() => navigate("/menu")}
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-10 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all"
          >
            View Full Menu
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
