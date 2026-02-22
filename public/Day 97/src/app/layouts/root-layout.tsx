import { Outlet } from "react-router";
import { ThemeProvider } from "next-themes";
import { Toaster } from "../components/ui/sonner";

export function RootLayout() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
