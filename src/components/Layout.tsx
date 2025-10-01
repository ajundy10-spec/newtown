import { ReactNode, useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Home, User, ShieldCheck, LogOut } from "lucide-react";
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
      } else if (location.pathname !== "/auth") {
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
        if (location.pathname !== "/auth") {
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
    { path: "/", icon: Home, label: "Menu" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  if (isAdmin) {
    navItems.push({ path: "/admin", icon: ShieldCheck, label: "Admin" });
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-primary text-primary-foreground py-3 px-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Newtown Coffee" className="h-12 w-12" />
            <div className="flex flex-col">
              <h1 className="text-lg font-bold leading-tight">NEWTOWN COFFEE</h1>
              <span className="text-[10px] tracking-wider opacity-90">SPECIALTY ROASTERS</span>
            </div>
          </Link>
          {session && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-primary-foreground hover:bg-primary/90"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          )}
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4">{children}</main>

      {session && (
        <nav className="bg-card border-t border-border py-3 px-4 sticky bottom-0">
          <div className="container mx-auto flex justify-around items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="flex flex-col gap-1 h-auto py-2"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;
