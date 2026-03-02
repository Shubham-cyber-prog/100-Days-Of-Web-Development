import { RouterProvider } from "react-router";
import { router } from "./routes";
import { VMProvider } from "./context/VMContext";

export default function App() {
  return (
    <div className="dark size-full">
      <VMProvider>
        <RouterProvider router={router} />
      </VMProvider>
    </div>
  );
}
