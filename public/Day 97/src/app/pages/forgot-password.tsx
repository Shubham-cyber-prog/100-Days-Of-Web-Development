import { Link } from "react-router";
import { Users, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="size-10 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
              <Users className="size-6 text-white" />
            </div>
            <span className="text-xl font-semibold">Smart Community Hub</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Reset your password</CardTitle>
            <CardDescription>
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="bg-input-background"
                />
              </div>
              <Button className="w-full">Send reset link</Button>
            </form>

            <Link to="/login">
              <Button variant="ghost" className="w-full gap-2">
                <ArrowLeft className="size-4" />
                Back to sign in
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
