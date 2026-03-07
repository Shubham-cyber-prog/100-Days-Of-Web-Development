import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Mail, Check } from 'lucide-react';

export default function EmailVerificationPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-background p-4">
      <Card className="w-full max-w-md p-8 space-y-6 shadow-xl">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center size-20 rounded-full bg-primary/10 mb-4">
            <Mail className="size-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Verify Your Email</h1>
          <p className="text-muted-foreground">
            We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
          </p>
        </div>

        <div className="space-y-3 p-4 rounded-lg bg-accent/50">
          <div className="flex items-start gap-3">
            <Check className="size-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm">Check your spam folder if you don't see the email</p>
          </div>
          <div className="flex items-start gap-3">
            <Check className="size-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm">The link will expire in 24 hours</p>
          </div>
          <div className="flex items-start gap-3">
            <Check className="size-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm">You can resend the email if needed</p>
          </div>
        </div>

        <div className="space-y-3">
          <Button className="w-full bg-primary hover:bg-primary/90">
            Resend Verification Email
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate('/login')}
          >
            Back to Login
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Already verified?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-primary hover:underline font-medium"
          >
            Sign in
          </button>
        </p>
      </Card>
    </div>
  );
}
