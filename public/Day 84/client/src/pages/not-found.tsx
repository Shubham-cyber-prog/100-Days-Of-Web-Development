import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { useLocation, Link } from "wouter";

export default function NotFound() {
  const [location] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg border-none ring-1 ring-gray-200">
        <CardContent className="pt-8 pb-8 px-8 text-center">
          
          {/* Animated Icon Container */}
          <div className="mb-6 relative inline-block">
            <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-red-50 p-4 rounded-full">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
            Page Not Found
          </h1>

          <div className="space-y-2 mb-8">
            <p className="text-gray-500">
              Oops! The page you are looking for doesn't exist or has been moved.
            </p>
            {/* Helpful Debug Info */}
            <p className="text-xs font-mono bg-gray-100 py-1 px-3 rounded-full inline-block text-gray-600 max-w-full truncate border">
              404: {location}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition-colors">
                <Home className="mr-2 h-4 w-4" />
                Return Home
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="w-full sm:w-auto"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
}