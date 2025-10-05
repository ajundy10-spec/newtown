import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import { signUpSchema, signInSchema, passwordResetSchema } from "@/lib/validations";
import { Coffee } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      fullName: formData.get("fullName") as string,
    };

    const validation = signUpSchema.safeParse(rawData);
    if (!validation.success) {
      setLoading(false);
      toast.error(validation.error.errors[0].message);
      return;
    }

    const { email, password, fullName } = validation.data;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    setLoading(false);

    if (error) {
      toast.error("Failed to create account. Please try again.");
    } else {
      toast.success("Account created successfully!");
      navigate("/");
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validation = signInSchema.safeParse(rawData);
    if (!validation.success) {
      setLoading(false);
      toast.error(validation.error.errors[0].message);
      return;
    }

    const { email, password } = validation.data;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast.error("Invalid email or password");
    } else {
      toast.success("Signed in successfully!");
      navigate("/");
    }
  };

  const handleForgotPassword = async () => {
    const email = prompt("Enter your email address:");
    if (!email) return;

    const validation = passwordResetSchema.safeParse({ email });
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(validation.data.email, {
      redirectTo: `${window.location.origin}/auth`,
    });

    if (error) {
      toast.error("Failed to send password reset email");
    } else {
      toast.success("Password reset email sent!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 animate-fade-in" />
      <div className="absolute inset-0 backdrop-blur-[120px]" />
      
      {/* Floating glass orbs for depth */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="relative w-full max-w-md animate-fade-in">
        <div className="glass-card rounded-3xl p-10 shadow-2xl border border-white/20">
          {/* Logo section with enhanced glass effect */}
          <div className="text-center mb-10">
            <div className="glass-card rounded-full w-28 h-28 flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-500">
              <Coffee className="h-14 w-14 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              NEWTOWN COFFEE
            </h1>
            <p className="text-sm tracking-[0.3em] text-muted-foreground mb-2 font-light">SPECIALTY ROASTERS</p>
            <p className="text-sm text-muted-foreground/80">Welcome back! Sign in to continue</p>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 smooth-glass p-1 mb-8">
              <TabsTrigger 
                value="signin" 
                className="data-[state=active]:glass-card data-[state=active]:shadow-lg transition-all duration-300"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger 
                value="signup"
                className="data-[state=active]:glass-card data-[state=active]:shadow-lg transition-all duration-300"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="mt-0">
              <form onSubmit={handleSignIn} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-sm font-medium">Email</Label>
                  <Input
                    id="signin-email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    className="smooth-glass h-12 transition-all duration-300 hover:shadow-lg focus:shadow-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-sm font-medium">Password</Label>
                  <Input
                    id="signin-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="smooth-glass h-12 transition-all duration-300 hover:shadow-lg focus:shadow-xl"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 smooth-glass hover:scale-[1.02] transition-all duration-300 hover:shadow-xl font-medium" 
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full hover:smooth-glass transition-all duration-300"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="mt-0">
              <form onSubmit={handleSignUp} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-sm font-medium">Full Name</Label>
                  <Input
                    id="signup-name"
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    className="smooth-glass h-12 transition-all duration-300 hover:shadow-lg focus:shadow-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm font-medium">Email</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    className="smooth-glass h-12 transition-all duration-300 hover:shadow-lg focus:shadow-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="smooth-glass h-12 transition-all duration-300 hover:shadow-lg focus:shadow-xl"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 smooth-glass hover:scale-[1.02] transition-all duration-300 hover:shadow-xl font-medium" 
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
