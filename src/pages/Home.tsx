import { Button } from "@/components/ui/button";
import { Coffee, ShoppingBag, Leaf, Award, Heart, Star, Clock, Gift, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 md:py-40 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30" />
        <div className="absolute inset-0 backdrop-blur-[100px]" />
        
        <div className="relative max-w-6xl mx-auto space-y-8">
          <div className="inline-block smooth-glass rounded-full px-8 py-3 mb-6 animate-fade-in">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Premium Coffee Experience</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
              Newtown Café
            </span>
          </h1>
          
          <p className="text-xl md:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Where every cup tells a story of passion, perfection, and sustainable excellence
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button asChild size="lg" className="smooth-glass hover:scale-105 transition-all duration-500 text-lg h-14 px-10 rounded-2xl group">
              <Link to="/menu">
                <Coffee className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                Explore Menu
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="smooth-glass hover:scale-105 transition-all duration-500 text-lg h-14 px-10 rounded-2xl group">
              <Link to="/beans-shop">
                <Leaf className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                Shop Beans
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Coffee, title: "Our Menu", desc: "Specialty drinks & beverages", link: "/menu" },
              { icon: Leaf, title: "Premium Beans", desc: "Ethically sourced coffee", link: "/beans-shop" },
              { icon: Star, title: "Rewards", desc: "Earn points & get rewards", link: "/profile" }
            ].map((item, i) => (
              <Link key={i} to={item.link} className="block group">
                <div className="glass-card p-10 h-full">
                  <div className="smooth-glass rounded-2xl w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <item.icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-3xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground mb-6 text-lg">{item.desc}</p>
                  <div className="flex items-center text-sm font-semibold group-hover:translate-x-2 transition-all duration-300">
                    Learn more 
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-accent/10" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Limited Offers</h2>
            <p className="text-muted-foreground text-xl">Exclusive deals for our valued customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: "Happy Hour", desc: "20% off all drinks", time: "2-4 PM daily", iconBg: "from-primary/20 to-primary/10" },
              { icon: Gift, title: "Free Pastry", desc: "With large coffee", time: "All day", iconBg: "from-secondary/20 to-secondary/10" },
              { icon: Sparkles, title: "Weekend Special", desc: "Seasonal blend", time: "Sat & Sun", iconBg: "from-accent/20 to-accent/10" }
            ].map((offer, i) => (
              <div key={i} className="glass-card p-10">
                <div className={`smooth-glass rounded-2xl w-20 h-20 flex items-center justify-center mb-6 bg-gradient-to-br ${offer.iconBg}`}>
                  <offer.icon className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{offer.title}</h3>
                <p className="text-muted-foreground mb-2 text-lg">{offer.desc}</p>
                <p className="text-sm font-semibold text-primary">{offer.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Why Newtown</h2>
            <p className="text-muted-foreground text-xl">Excellence in every detail</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Leaf, title: "Sustainable", desc: "100% ethical sourcing", color: "text-secondary" },
              { icon: Award, title: "Award Winning", desc: "Recognized excellence", color: "text-primary" },
              { icon: Heart, title: "Made with Love", desc: "Crafted with passion", color: "text-destructive" },
              { icon: Star, title: "Loyalty Program", desc: "Earn with every sip", color: "text-accent" }
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 text-center group">
                <div className="smooth-glass rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <feature.icon className={`h-10 w-10 ${feature.color}`} />
                </div>
                <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30" />
        <div className="absolute inset-0 backdrop-blur-[100px]" />
        
        <div className="relative smooth-glass rounded-[2rem] max-w-5xl mx-auto p-16 text-center space-y-8">
          <div className="smooth-glass rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-12 w-12" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">Start Your Journey</h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join thousands of coffee lovers who trust Newtown for their daily ritual
          </p>
          <Button asChild size="lg" className="smooth-glass hover:scale-105 transition-all duration-500 text-xl h-16 px-12 rounded-2xl group mt-8">
            <Link to="/menu">
              <Coffee className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
              Order Now
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
