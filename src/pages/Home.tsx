import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Coffee, Sparkles, Star } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-secondary py-20 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary-foreground rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary-foreground rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto text-center relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-6 py-2 rounded-full border border-primary-foreground/20">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">Premium Coffee Experience</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground tracking-tight">
            Welcome to<br />
            <span className="bg-gradient-to-r from-primary-foreground via-secondary-foreground to-primary-foreground bg-clip-text text-transparent">
              Newtown Coffee
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Where every cup is crafted with passion and precision. Experience the finest coffee culture.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              onClick={() => navigate("/menu")}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <Coffee className="mr-2" />
              Explore Menu
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/profile")}
              className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6 rounded-full"
            >
              <Star className="mr-2" />
              Loyalty Rewards
            </Button>
          </div>
        </div>
      </section>

      {/* Promotional Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Special Offers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Indulge in our exclusive promotions and seasonal favorites
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Promo Card 1 */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-accent overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-secondary to-accent overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
                <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  30% OFF
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Coffee className="w-24 h-24 text-primary-foreground/80" />
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Happy Hour Special</h3>
                <p className="text-muted-foreground">
                  Get 30% off on all beverages between 3-5 PM daily. Perfect for your afternoon pick-me-up!
                </p>
                <Button 
                  onClick={() => navigate("/menu")}
                  className="w-full bg-secondary hover:bg-secondary/90"
                >
                  Order Now
                </Button>
              </CardContent>
            </Card>

            {/* Promo Card 2 */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-accent overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-accent to-primary overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
                <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  BUY 1 GET 1
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Star className="w-24 h-24 text-primary-foreground/80" />
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Loyalty Rewards</h3>
                <p className="text-muted-foreground">
                  Collect points with every purchase. Earn 10 stamps and get a free beverage of your choice!
                </p>
                <Button 
                  onClick={() => navigate("/profile")}
                  className="w-full bg-accent hover:bg-accent/90"
                >
                  Join Now
                </Button>
              </CardContent>
            </Card>

            {/* Promo Card 3 */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-accent overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-primary to-secondary overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  NEW
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-24 h-24 text-primary-foreground/80" />
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Seasonal Collection</h3>
                <p className="text-muted-foreground">
                  Try our new seasonal beverages! Handcrafted with premium ingredients and unique flavors.
                </p>
                <Button 
                  onClick={() => navigate("/menu")}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Discover More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              The Newtown Difference
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience coffee crafted to perfection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "Premium Beans", desc: "Ethically sourced from the finest farms worldwide" },
              { title: "Expert Baristas", desc: "Trained professionals crafting every cup with care" },
              { title: "Cozy Atmosphere", desc: "A welcoming space to relax and enjoy" },
              { title: "Loyalty Program", desc: "Earn rewards with every purchase" }
            ].map((item, idx) => (
              <Card key={idx} className="text-center p-6 hover:shadow-lg transition-all border-2 hover:border-accent">
                <CardContent className="pt-6 space-y-3">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <Coffee className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary via-accent to-secondary">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground">
            Ready to Experience Excellence?
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Join thousands of coffee lovers who start their day with Newtown Coffee
          </p>
          <Button 
            size="lg"
            onClick={() => navigate("/menu")}
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-12 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all"
          >
            View Full Menu
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
