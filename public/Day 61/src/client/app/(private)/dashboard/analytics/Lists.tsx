"use client";
import BarChartComponent from "@/app/components/charts/BarChartComponent";
import ListCard from "@/app/components/organisms/ListCard";
import React from "react";
interface ListsProps {
  topItems: any[];
  topUsers: any[];
  mostViewedProducts: any[];
  salesByProduct: {
    data: any[];
    categories: string[];
  };
}

const Lists = ({
  topItems,
  topUsers,
  mostViewedProducts,
  salesByProduct,
}: ListsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
      <ListCard
        title="Top Products"
        viewAllLink="/shop"
        items={topItems}
        itemType="product"
      />
      <ListCard
        title="Top Users"
        viewAllLink="/dashboard/users"
        items={topUsers}
        itemType="user"
      />
      <ListCard
        title="Most Viewed Products"
        viewAllLink="/shop"
        items={mostViewedProducts}
        itemType="product"
      />
      <BarChartComponent
        title="Sales by Product"
        data={salesByProduct.data}
        categories={salesByProduct.categories}
        color="#4CAF50"
      />
    </div>
  );
};

export default Lists;
