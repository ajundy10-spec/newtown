import { Button } from "@/components/ui/button";
import { Coffee, ShoppingBag, Leaf, Award, Heart, Star, Clock, Gift, Sparkles, ArrowRight, Home as HomeIcon, User, Menu as MenuIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen pb-24 bg-gradient-to-b from-background via-background to-secondary/5">
      {/* Compact Mobile Hero */}
      <section className="relative pt-8 pb-12 px-4">
        <div className="max-w-md mx-auto space-y-6">
          {/* Status Badge */}
          <div className="inline-block smooth-glass rounded-full px-4 py-2 animate-fade-in">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium">Open Now</span>
            </div>
          </div>
          
          {/* Greeting */}
          <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-3xl font-bold">Good Morning ☀️</h1>
            <p className="text-muted-foreground">What would you like today?</p>
          </div>
          
          {/* Search Bar */}
          <div className="smooth-glass rounded-2xl p-4 flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Coffee className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground text-sm">Search drinks, beans...</span>
          </div>
        </div>
      </section>

      {/* Quick Actions - Horizontal Scroll */}
      <section className="px-4 pb-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-lg font-bold mb-4">Quick Order</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {[
              { icon: Coffee, title: "Espresso", price: "$3.50", color: "from-amber-500/20 to-orange-500/20" },
              { icon: Coffee, title: "Latte", price: "$4.50", color: "from-blue-500/20 to-cyan-500/20" },
              { icon: Coffee, title: "Cappuccino", price: "$4.00", color: "from-purple-500/20 to-pink-500/20" },
              { icon: Coffee, title: "Mocha", price: "$5.00", color: "from-red-500/20 to-orange-500/20" }
            ].map((item, i) => (
              <div 
                key={i} 
                className="flex-shrink-0 w-36 snap-start glass-card p-4 hover:scale-105 transition-all duration-300 active:scale-95"
              >
                <div className={`smooth-glass rounded-xl w-12 h-12 flex items-center justify-center mb-3 bg-gradient-to-br ${item.color}`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-primary font-bold text-sm">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 pb-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-lg font-bold mb-4">Categories</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Coffee, title: "Menu", desc: "All drinks", link: "/menu", color: "from-primary/30 to-primary/10" },
              { icon: Leaf, title: "Beans", desc: "Premium coffee", link: "/beans-shop", color: "from-secondary/30 to-secondary/10" },
              { icon: Gift, title: "Offers", desc: "Special deals", link: "#offers", color: "from-accent/30 to-accent/10" },
              { icon: Star, title: "Rewards", desc: "Your points", link: "/profile", color: "from-amber-500/30 to-amber-500/10" }
            ].map((cat, i) => (
              <Link 
                key={i} 
                to={cat.link}
                className="glass-card p-4 group hover:scale-[1.02] transition-all duration-300 active:scale-95"
              >
                <div className={`smooth-glass rounded-xl w-12 h-12 flex items-center justify-center mb-3 bg-gradient-to-br ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <cat.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-sm mb-0.5">{cat.title}</h3>
                <p className="text-xs text-muted-foreground">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section id="offers" className="px-4 pb-8">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Today's Offers</h2>
            <button className="text-xs text-primary font-semibold">View All</button>
          </div>
          <div className="space-y-3">
            {[
              { icon: Clock, title: "Happy Hour", desc: "20% off all drinks • 2-4 PM", badge: "Active" },
              { icon: Gift, title: "Free Pastry", desc: "With any large coffee purchase", badge: "Limited" },
              { icon: Sparkles, title: "Weekend Blend", desc: "Try our seasonal special", badge: "New" }
            ].map((offer, i) => (
              <div 
                key={i} 
                className="glass-card p-4 flex items-start gap-4 hover:scale-[1.01] transition-all duration-300 active:scale-[0.99]"
              >
                <div className="smooth-glass rounded-xl w-14 h-14 flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-primary/20 to-accent/20">
                  <offer.icon className="h-7 w-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{offer.title}</h3>
                    <span className="smooth-glass text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">
                      {offer.badge}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{offer.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured - Horizontal Scroll */}
      <section className="px-4 pb-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-lg font-bold mb-4">Why Newtown</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {[
              { icon: Leaf, title: "Sustainable", desc: "100% ethical sourcing" },
              { icon: Award, title: "Award Winning", desc: "Recognized excellence" },
              { icon: Heart, title: "Made with Love", desc: "Crafted with passion" },
              { icon: Star, title: "Loyalty Program", desc: "Earn with every sip" }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="flex-shrink-0 w-40 snap-start glass-card p-4 text-center"
              >
                <div className="smooth-glass rounded-xl w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-xs mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 smooth-glass border-t border-white/10 z-50">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            {[
              { icon: HomeIcon, label: "Home", path: "/", active: true },
              { icon: MenuIcon, label: "Menu", path: "/menu", active: false },
              { icon: ShoppingBag, label: "Shop", path: "/beans-shop", active: false },
              { icon: User, label: "Profile", path: "/profile", active: false }
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                  item.active 
                    ? 'smooth-glass scale-105' 
                    : 'hover:smooth-glass active:scale-95'
                }`}
              >
                <item.icon className={`h-5 w-5 ${item.active ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-xs font-medium ${item.active ? 'text-primary' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Home;
