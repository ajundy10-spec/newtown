import { Coffee, Leaf, Award, Heart, Star, Clock, Gift, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/menu');
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8 bg-gradient-to-b from-background via-background to-secondary/5">
      {/* Hero Section */}
      <section className="relative pt-6 md:pt-12 pb-8 md:pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto space-y-4 md:space-y-6">
            {/* Status Badge */}
            <div className="inline-block smooth-glass rounded-full px-4 py-2 animate-fade-in">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium">Open Now</span>
              </div>
            </div>
            
            {/* Greeting */}
            <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">Good Morning ☀️</h1>
              <p className="text-muted-foreground text-sm md:text-lg">What would you like today?</p>
            </div>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="smooth-glass rounded-2xl p-4 md:p-5 flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Coffee className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search drinks, beans..."
                className="flex-1 bg-transparent border-none outline-none text-sm md:text-base placeholder:text-muted-foreground"
              />
            </form>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 pb-8 md:pb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">Quick Order</h2>
          <div className="flex md:grid md:grid-cols-4 gap-3 md:gap-4 overflow-x-auto md:overflow-visible pb-2 scrollbar-hide snap-x snap-mandatory md:snap-none">
            {[
              { icon: Coffee, title: "Espresso", price: "$3.50", color: "from-amber-500/20 to-orange-500/20", link: "/menu" },
              { icon: Coffee, title: "Latte", price: "$4.50", color: "from-blue-500/20 to-cyan-500/20", link: "/menu" },
              { icon: Coffee, title: "Cappuccino", price: "$4.00", color: "from-purple-500/20 to-pink-500/20", link: "/menu" },
              { icon: Coffee, title: "Mocha", price: "$5.00", color: "from-red-500/20 to-orange-500/20", link: "/menu" }
            ].map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className="flex-shrink-0 w-36 md:w-auto snap-start glass-card p-4 md:p-6 hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer block"
              >
                <div className={`smooth-glass rounded-xl w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-3 bg-gradient-to-br ${item.color}`}>
                  <item.icon className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <h3 className="font-semibold text-sm md:text-base mb-1">{item.title}</h3>
                <p className="text-primary font-bold text-sm md:text-lg">{item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 pb-8 md:pb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { icon: Coffee, title: "Menu", desc: "All drinks", link: "/menu", color: "from-primary/30 to-primary/10" },
              { icon: Leaf, title: "Beans", desc: "Premium coffee", link: "/beans", color: "from-secondary/30 to-secondary/10" },
              { icon: Gift, title: "Offers", desc: "Special deals", link: "#offers", color: "from-accent/30 to-accent/10" },
              { icon: Star, title: "Rewards", desc: "Your points", link: "/profile", color: "from-amber-500/30 to-amber-500/10" }
            ].map((cat, i) => (
              cat.link === "#offers" ? (
                <a
                  key={i}
                  href={cat.link}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('offers')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="glass-card p-4 md:p-6 group hover:scale-[1.02] transition-all duration-300 active:scale-95 cursor-pointer block"
                >
                  <div className={`smooth-glass rounded-xl w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-3 bg-gradient-to-br ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                    <cat.icon className="h-6 w-6 md:h-8 md:w-8" />
                  </div>
                  <h3 className="font-semibold text-sm md:text-base mb-0.5">{cat.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{cat.desc}</p>
                </a>
              ) : (
                <Link 
                  key={i} 
                  to={cat.link}
                  className="glass-card p-4 md:p-6 group hover:scale-[1.02] transition-all duration-300 active:scale-95 cursor-pointer block"
                >
                  <div className={`smooth-glass rounded-xl w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-3 bg-gradient-to-br ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                    <cat.icon className="h-6 w-6 md:h-8 md:w-8" />
                  </div>
                  <h3 className="font-semibold text-sm md:text-base mb-0.5">{cat.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{cat.desc}</p>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section id="offers" className="px-4 pb-8 md:pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg md:text-2xl font-bold">Today's Offers</h2>
            <button className="text-xs md:text-sm text-primary font-semibold hover:underline">View All</button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {[
              { icon: Clock, title: "Happy Hour", desc: "20% off all drinks • 2-4 PM", badge: "Active" },
              { icon: Gift, title: "Free Pastry", desc: "With any large coffee purchase", badge: "Limited" },
              { icon: Sparkles, title: "Weekend Blend", desc: "Try our seasonal special", badge: "New" }
            ].map((offer, i) => (
              <div 
                key={i} 
                className="glass-card p-4 md:p-5 flex items-start gap-4 hover:scale-[1.01] transition-all duration-300 active:scale-[0.99] cursor-pointer"
              >
                <div className="smooth-glass rounded-xl w-14 h-14 md:w-16 md:h-16 flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-primary/20 to-accent/20">
                  <offer.icon className="h-7 w-7 md:h-8 md:w-8" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-sm md:text-base">{offer.title}</h3>
                    <span className="smooth-glass text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">
                      {offer.badge}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">{offer.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="px-4 pb-8 md:pb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">Why Newtown</h2>
          <div className="flex md:grid md:grid-cols-4 gap-3 md:gap-4 overflow-x-auto md:overflow-visible pb-2 scrollbar-hide snap-x snap-mandatory md:snap-none">
            {[
              { icon: Leaf, title: "Sustainable", desc: "100% ethical sourcing" },
              { icon: Award, title: "Award Winning", desc: "Recognized excellence" },
              { icon: Heart, title: "Made with Love", desc: "Crafted with passion" },
              { icon: Star, title: "Loyalty Program", desc: "Earn with every sip" }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="flex-shrink-0 w-40 md:w-auto snap-start glass-card p-4 md:p-6 text-center"
              >
                <div className="smooth-glass rounded-xl w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <h3 className="font-semibold text-xs md:text-sm mb-1">{feature.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
