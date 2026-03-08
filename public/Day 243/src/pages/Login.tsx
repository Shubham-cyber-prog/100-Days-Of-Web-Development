import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  const [role, setRole] = useState<"client" | "freelancer">("client");

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-card">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-card-foreground">Welcome Back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your account</p>
        </div>

        {/* Role Toggle */}
        <div className="mt-6 flex rounded-xl bg-muted p-1">
          {(["client", "freelancer"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                role === r ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              {r === "client" ? "Client" : "Freelancer"}
            </button>
          ))}
        </div>

        <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input id="email" type="email" placeholder="you@example.com" className="pl-9" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input id="password" type="password" placeholder="••••••••" className="pl-9" />
            </div>
          </div>
          <Link to={role === "client" ? "/client/dashboard" : "/freelancer/dashboard"}>
            <Button className="mt-2 w-full rounded-xl" size="lg">Sign In</Button>
          </Link>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-primary hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
