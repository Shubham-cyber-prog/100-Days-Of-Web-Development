import { FaUtensils } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-white/70 backdrop-blur-lg shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-orange-600 flex items-center gap-2">
          <FaUtensils /> FlavorFusion
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;