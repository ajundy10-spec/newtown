import { Button } from "@/components/ui/button";
import { Coffee, ShoppingBag, Leaf, Award, Heart, Star, Clock, Gift, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20" />
        <div className="relative max-w-5xl mx-auto space-y-8">
          <div className="inline-block glass rounded-full px-6 py-2 mb-4">
            <span className="text-sm font-medium">☕ Premium Coffee Experience</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Newtown Café
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Where every cup tells a story of passion, perfection, and sustainable excellence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button asChild size="lg" className="glass-hover border-0 bg-primary/90 text-primary-foreground">
              <Link to="/menu">
                <Coffee className="mr-2 h-5 w-5" />
                Explore Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="glass-hover">
              <Link to="/beans-shop">
                <Leaf className="mr-2 h-5 w-5" />
                Shop Beans
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Coffee, title: "Our Menu", desc: "Specialty drinks & beverages", link: "/menu", color: "primary" },
              { icon: Leaf, title: "Premium Beans", desc: "Ethically sourced coffee", link: "/beans-shop", color: "secondary" },
              { icon: Star, title: "Rewards", desc: "Earn points & get rewards", link: "/profile", color: "accent" }
            ].map((item, i) => (
              <Link key={i} to={item.link} className="block group">
                <div className="glass-hover rounded-2xl p-8 h-full">
                  <item.icon className={`h-14 w-14 mb-4 text-${item.color}`} />
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground mb-4">{item.desc}</p>
                  <div className="flex items-center text-sm font-medium group-hover:translate-x-2 transition-transform">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-accent/5" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Limited Offers</h2>
            <p className="text-muted-foreground text-lg">Exclusive deals for our valued customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: "Happy Hour", desc: "20% off all drinks", time: "2-4 PM daily", gradient: "from-primary/10 to-primary/5" },
              { icon: Gift, title: "Free Pastry", desc: "With large coffee", time: "All day", gradient: "from-secondary/10 to-secondary/5" },
              { icon: Sparkles, title: "Weekend Special", desc: "Seasonal blend", time: "Sat & Sun", gradient: "from-accent/10 to-accent/5" }
            ].map((offer, i) => (
              <div key={i} className={`glass-hover rounded-2xl p-8 bg-gradient-to-br ${offer.gradient}`}>
                <div className="glass rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <offer.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                <p className="text-muted-foreground mb-1">{offer.desc}</p>
                <p className="text-sm font-medium text-primary">{offer.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Newtown</h2>
            <p className="text-muted-foreground text-lg">Excellence in every detail</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Leaf, title: "Sustainable", desc: "100% ethical sourcing", color: "text-secondary" },
              { icon: Award, title: "Award Winning", desc: "Recognized excellence", color: "text-primary" },
              { icon: Heart, title: "Made with Love", desc: "Crafted with passion", color: "text-destructive" },
              { icon: Star, title: "Loyalty Program", desc: "Earn with every sip", color: "text-accent" }
            ].map((feature, i) => (
              <div key={i} className="glass-hover rounded-2xl p-6 text-center">
                <div className="glass rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/20" />
        <div className="relative glass rounded-3xl max-w-4xl mx-auto p-12 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">Start Your Journey</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of coffee lovers who trust Newtown for their daily ritual
          </p>
          <Button asChild size="lg" className="glass-hover border-0 bg-primary/90 text-primary-foreground">
            <Link to="/menu">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Order Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
