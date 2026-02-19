"use client";

import useFormatPrice from "@/app/hooks/ui/useFormatPrice";
import formatDate from "@/app/utils/formatDate";
import { ShoppingBag } from "lucide-react";

const OrderInformation = ({ order, className = "" }) => {
  const format = useFormatPrice();
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md ${className}`}
    >
      <div className="flex items-center mb-4">
        <ShoppingBag className="mr-2 text-blue-600" size={20} />
        <h2 className="text-lg font-semibold">Order Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
        <div>
          <p className="text-sm text-gray-500">Order Amount</p>
          <p className="font-medium">{format(order.amount)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Order Date</p>
          <p>{formatDate(order.orderDate)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Created At</p>
          <p>{formatDate(order.createdAt)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Updated At</p>
          <p>{formatDate(order.updatedAt)}</p>
        </div>
      </div>

      {/* Order Items */}
      <div className="mt-6">
        <h3 className="text-md font-semibold mb-3">Order Items</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item ID
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product ID
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {order.orderItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-mono">
                    {item.id.substring(0, 8)}...
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-mono">
                    {item.productId.substring(0, 8)}...
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm">
                    {item.quantity}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm">
                    {format(item.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderInformation;
