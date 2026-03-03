import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="phishing-detector-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}