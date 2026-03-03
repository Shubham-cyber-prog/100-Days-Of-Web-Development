import { createBrowserRouter } from "react-router";
import { MainPage } from "./pages/MainPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "*",
    element: (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
          <p className="text-gray-600 dark:text-gray-400">Page not found</p>
        </div>
      </div>
    ),
  },
]);