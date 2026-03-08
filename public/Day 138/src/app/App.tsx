import { RouterProvider } from "react-router";
import { router } from "./routes";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <TooltipProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </TooltipProvider>
  );
}