import { ReactNode, useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Home, User, ShieldCheck, LogOut, Coffee, Menu, Leaf } from "lucide-react";
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
    { path: "/beans", icon: Leaf, label: "Beans" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  if (isAdmin) {
    navItems.push({ path: "/admin", icon: ShieldCheck, label: "Admin" });
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b smooth-glass sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
              <img src={logo} alt="Newtown Coffee" className="h-10 w-10 sm:h-12 sm:w-12 relative z-10" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-base sm:text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors">NEWTOWN COFFEE</h1>
              <span className="text-[8px] sm:text-[10px] tracking-wider text-muted-foreground">SPECIALTY ROASTERS</span>
            </div>
          </Link>
          <nav className="hidden md:flex gap-4 lg:gap-6 items-center">
            <Link to="/" className="hover:text-primary transition-colors font-medium text-foreground">
              Home
            </Link>
            <Link to="/menu" className="hover:text-primary transition-colors font-medium text-foreground">
              Menu
            </Link>
            <Link to="/beans" className="hover:text-primary transition-colors font-medium text-foreground">
              Beans Shop
            </Link>
            {session && (
              <>
                <Link to="/profile" className="hover:text-primary transition-colors font-medium text-foreground">
                  Profile
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="hover:text-primary transition-colors font-medium text-foreground">
                    Admin
                  </Link>
                )}
              </>
            )}
            {session ? (
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="rounded-full border-2"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/auth")}
                size="sm"
                className="rounded-full bg-primary hover:bg-primary/90"
              >
                Sign In
              </Button>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <nav className="md:hidden smooth-glass border-t border-border py-2 px-2 sticky bottom-0 shadow-xl z-50">
        <div className="flex justify-around items-center">
          {session ? (
            <>
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
            </>
          ) : (
            <>
              <Link to="/" className="flex-1">
                <Button
                  variant={location.pathname === "/" ? "default" : "ghost"}
                  size="sm"
                  className="flex flex-col gap-1 h-auto py-2 w-full"
                >
                  <Home className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-[10px] sm:text-xs">Home</span>
                </Button>
              </Link>
              <Link to="/menu" className="flex-1">
                <Button
                  variant={location.pathname === "/menu" ? "default" : "ghost"}
                  size="sm"
                  className="flex flex-col gap-1 h-auto py-2 w-full"
                >
                  <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-[10px] sm:text-xs">Menu</span>
                </Button>
              </Link>
              <Link to="/beans" className="flex-1">
                <Button
                  variant={location.pathname === "/beans" ? "default" : "ghost"}
                  size="sm"
                  className="flex flex-col gap-1 h-auto py-2 w-full"
                >
                  <Leaf className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-[10px] sm:text-xs">Beans</span>
                </Button>
              </Link>
              <Link to="/auth" className="flex-1">
                <Button
                  variant={location.pathname === "/auth" ? "default" : "ghost"}
                  size="sm"
                  className="flex flex-col gap-1 h-auto py-2 w-full"
                >
                  <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-[10px] sm:text-xs">Sign In</span>
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
      
      <footer className="border-t py-8 smooth-glass">
        <div className="container mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xl font-bold text-primary">
            <Coffee className="w-6 h-6" />
            Newtown Coffee
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; 2025 Newtown Coffee. All rights reserved. | Crafted with passion.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
