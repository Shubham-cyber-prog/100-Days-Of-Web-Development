"use client";
import { Loader2, Package, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface ProductHeaderProps {
  product: {
    name: string;
    price: number;
    discount: number;
    stock: number;
  };
  isDeleting: boolean;
  onDelete: () => void;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  product,
  isDeleting,
  onDelete,
}) => {
  const formattedPrice =
    typeof product.price === "number"
      ? `$${product.price.toFixed(2)}`
      : "$0.00";
  const hasDiscount = product.discount && product.discount > 0;
  //   const discountedPrice = hasDiscount
  //     ? `$${(product.price * (1 - product.discount / 100)).toFixed(2)}`
  //     : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-50 p-3 rounded-full">
            <Package className="text-indigo-600" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-semibold text-gray-900">
                {formattedPrice}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-sm text-gray-500 line-through">
                    {formattedPrice}
                  </span>
                  <span className="text-sm bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              product.stock > 10
                ? "bg-green-100 text-green-700"
                : product.stock > 0
                ? "bg-amber-100 text-amber-700"
                : "bg-rose-100 text-rose-700"
            }`}
          >
            {product.stock > 10
              ? "In Stock"
              : product.stock > 0
              ? "Low Stock"
              : "Out of Stock"}
          </span>
          <button
            onClick={onDelete}
            className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors disabled:opacity-50"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
            <span className="hidden sm:inline">
              {isDeleting ? "Deleting..." : "Delete"}
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductHeader;
