"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import useFormatPrice from "@/app/hooks/ui/useFormatPrice";
import { ShoppingCart } from "lucide-react";

// Helper function to format variant name from SKU
const formatVariantName = (item: any) => {
  const { name } = item.variant.product;
  const sku = item.variant.sku;
  // Parse SKU (e.g., "TSH-BLUE-L" -> "Blue, Large")
  const parts = sku.split("-").slice(1); // Remove prefix (e.g., "TSH")
  const variantDetails = parts.join(", "); // Join color and size
  return `${name} - ${variantDetails}`;
};

const OrderItems = ({ order }) => {
  const formatPrice = useFormatPrice();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="col-span-1 bg-white rounded-xl h-fit overflow-auto shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center space-x-2 mb-4">
        <ShoppingCart size={18} />
        <h2 className="font-semibold text-gray-800">Order Items</h2>
      </div>

      <div className="space-y-6">
        {order.orderItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0"
          >
            {/* Variant Image */}
            <div className="flex items-center justify-center mr-4 overflow-hidden shadow-sm">
              <Image
                src={item.variant.images[0]}
                alt={formatVariantName(item)}
                width={50}
                height={50}
                className="object-cover"
              />
            </div>

            {/* Variant Details */}
            <div className="flex-1">
              <p className="font-semibold text-gray-800 text-sm">
                {formatVariantName(item)}
              </p>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="font-medium text-gray-800">
                {formatPrice(item.variant.price * item.quantity)}
              </p>
              <p className="text-xs text-gray-500">
                {item.quantity} x {formatPrice(item.variant.price)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default OrderItems;
