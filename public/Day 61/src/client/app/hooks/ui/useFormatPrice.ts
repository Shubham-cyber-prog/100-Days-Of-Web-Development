"use client";

const useFormatPrice = () => {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return formatPrice;
};

export default useFormatPrice;
