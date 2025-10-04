import { ReactNode, useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Home, User, ShieldCheck, LogOut, Coffee, Menu, Package } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        checkAdminStatus(session.user.id);
      } else if (location.pathname !== "/auth" && location.pathname !== "/" && location.pathname !== "/menu" && location.pathname !== "/beans") {
        navigate("/auth");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        checkAdminStatus(session.user.id);
      } else {
        setIsAdmin(false);
        if (location.pathname !== "/auth" && location.pathname !== "/" && location.pathname !== "/menu" && location.pathname !== "/beans") {
          navigate("/auth");
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location.pathname]);

  const checkAdminStatus = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    setIsAdmin(!!data);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/auth");
  };

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/menu", icon: Menu, label: "Menu" },
    { path: "/beans", icon: Package, label: "Beans" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  if (isAdmin) {
    navItems.push({ path: "/admin", icon: ShieldCheck, label: "Admin" });
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-[var(--gradient-accent)] rounded-full blur-lg opacity-60 group-hover:opacity-80 transition-all duration-300" />
              <img src={logo} alt="Newtown Coffee" className="h-10 w-10 sm:h-12 sm:w-12 relative z-10 drop-shadow-lg" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-base sm:text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors">NEWTOWN COFFEE</h1>
              <span className="text-[8px] sm:text-[10px] tracking-wider text-muted-foreground uppercase">Specialty Roasters</span>
            </div>
          </Link>
          <nav className="hidden md:flex gap-4 lg:gap-6 items-center">
            <Link to="/" className="hover:text-primary transition-all duration-200 font-medium text-foreground relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            <Link to="/menu" className="hover:text-primary transition-all duration-200 font-medium text-foreground relative group">
              Menu
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            <Link to="/beans" className="hover:text-primary transition-all duration-200 font-medium text-foreground relative group">
              Beans Shop
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            {session && (
              <>
                <Link to="/profile" className="hover:text-primary transition-all duration-200 font-medium text-foreground relative group">
                  Profile
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="hover:text-primary transition-all duration-200 font-medium text-foreground relative group">
                    Admin
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </Link>
                )}
              </>
            )}
            {session ? (
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => navigate("/profile")}
                  variant="outline"
                  size="sm"
                  className="rounded-full border-2 hover:border-primary hover:text-primary transition-all"
                >
                  <User className="h-4 w-4 mr-2" />
                  Account
                </Button>
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  size="sm"
                  className="rounded-full hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => navigate("/auth")}
                size="sm"
                className="rounded-full bg-[var(--gradient-accent)] hover:shadow-[var(--shadow-md)] transition-all duration-300"
              >
                Sign Up / Sign In
              </Button>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {session && (
        <nav className="md:hidden bg-card border-t border-border py-2 px-2 sticky bottom-0 shadow-lg z-50">
          <div className="flex justify-around items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} className="flex-1">
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="flex flex-col gap-1 h-auto py-2 w-full"
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-[10px] sm:text-xs">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
      
      <footer className="border-t py-12 bg-gradient-to-b from-muted/30 to-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center gap-3 text-2xl font-bold text-foreground">
              <div className="relative">
                <div className="absolute inset-0 bg-[var(--gradient-accent)] rounded-full blur-md opacity-50" />
                <Coffee className="w-8 h-8 relative z-10 text-primary" />
              </div>
              Newtown Coffee
            </div>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              Premium specialty coffee roasted with passion. Experience the art of coffee.
            </p>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>&copy; 2024 Newtown Coffee</span>
              <span>•</span>
              <span>All rights reserved</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
