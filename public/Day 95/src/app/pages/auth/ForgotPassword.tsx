import { useState } from "react";
import { Link } from "react-router";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Alert, AlertDescription } from "../../components/ui/alert";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <Card className="border-slate-200 shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Check your email</CardTitle>
          <CardDescription>
            We've sent a password reset link to{" "}
            <span className="font-medium text-slate-900">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-blue-200 bg-blue-50">
            <AlertDescription className="text-sm text-slate-700">
              Didn't receive the email? Check your spam folder or try again in a few minutes.
            </AlertDescription>
          </Alert>
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsSubmitted(false)}
          >
            Resend email
          </Button>
        </CardContent>
        <CardFooter>
          <Link 
            to="/auth/login" 
            className="w-full text-center text-sm text-slate-600 hover:text-slate-900 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200 shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Forgot password?</CardTitle>
        <CardDescription>
          No worries, we'll send you reset instructions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Reset password"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Link 
          to="/auth/login" 
          className="w-full text-center text-sm text-slate-600 hover:text-slate-900 flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </Link>
      </CardFooter>
    </Card>
  );
}
