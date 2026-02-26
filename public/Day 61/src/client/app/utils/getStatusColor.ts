export const getStatusColor = (status) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "PROCESSING":
      return "bg-blue-100 text-blue-800";
    case "SHIPPED":
      return "bg-indigo-100 text-indigo-800";
    case "IN_TRANSIT":
      return "bg-purple-100 text-purple-800";
    case "DELIVERED":
      return "bg-green-100 text-green-800";
    case "CANCELED":
      return "bg-red-100 text-red-800";
    case "RETURNED":
      return "bg-orange-100 text-orange-800";
    case "REFUNDED":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
