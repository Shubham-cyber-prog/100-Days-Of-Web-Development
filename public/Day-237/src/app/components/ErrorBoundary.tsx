import { useRouteError, Link } from "react-router";
import { Button } from "./ui/button";
import { AlertCircle } from "lucide-react";

export function ErrorBoundary() {
  const error = useRouteError() as any;

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-[#1E1E1E] rounded-[14px] p-8 card-elevation">
          <AlertCircle className="w-16 h-16 text-[#00E676] mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Oops!</h1>
          <p className="text-[#BDBDBD] mb-6">
            {error?.statusText || error?.message || "Something went wrong"}
          </p>
          <Link to="/home">
            <Button className="bg-[#00E676] text-[#121212] hover:bg-[#00E676]/90 neon-glow-hover">
              Go Back Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}