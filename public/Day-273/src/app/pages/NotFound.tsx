import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";
import { Home } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
      <Button onClick={() => navigate("/")} className="bg-emerald-500 hover:bg-emerald-600">
        <Home className="h-4 w-4 mr-2" />
        Go to Dashboard
      </Button>
    </div>
  );
}
