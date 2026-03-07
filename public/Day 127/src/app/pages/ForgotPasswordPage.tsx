import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-background p-4">
      <Card className="w-full max-w-md p-8 space-y-6 shadow-xl">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to login
        </Link>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/10 mb-4">
            <Mail className="size-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Forgot Password?</h1>
          <p className="text-muted-foreground">
            {isSubmitted
              ? 'Check your email for reset instructions'
              : 'No worries, we\'ll send you reset instructions'}
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Reset Password
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm text-center">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
            </div>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="w-full"
            >
              Resend Email
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
