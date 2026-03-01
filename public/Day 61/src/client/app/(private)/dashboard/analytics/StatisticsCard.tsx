"use client";
import StatsCard from "@/app/components/organisms/StatsCard";
import useFormatPrice from "@/app/hooks/ui/useFormatPrice";
import {
  BarChart2,
  CreditCard,
  DollarSign,
  ShoppingCart,
  Users,
} from "lucide-react";
import React from "react";

const StatisticsCard = ({ data }) => {
  const formatPrice = useFormatPrice();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
      <StatsCard
        title="Total Revenue"
        value={formatPrice(data?.revenueAnalytics?.totalRevenue || 0)}
        percentage={data?.revenueAnalytics?.changes?.revenue}
        caption="since last period"
        icon={<DollarSign className="w-5 h-5" />}
      />
      <StatsCard
        title="Total Orders"
        value={data?.orderAnalytics?.totalOrders || 0}
        percentage={data?.orderAnalytics?.changes?.orders}
        caption="since last period"
        icon={<ShoppingCart className="w-5 h-5" />}
      />
      <StatsCard
        title="Total Sales"
        value={data?.orderAnalytics?.totalSales || 0}
        percentage={data?.orderAnalytics?.changes?.sales}
        caption="since last period"
        icon={<BarChart2 className="w-5 h-5" />}
      />
      <StatsCard
        title="Average Order Value"
        value={formatPrice(data?.orderAnalytics?.averageOrderValue || 0)}
        percentage={data?.orderAnalytics?.changes?.averageOrderValue}
        caption="since last period"
        icon={<CreditCard className="w-5 h-5" />}
      />
      <StatsCard
        title="Total Users"
        value={data?.userAnalytics?.totalUsers || 0}
        percentage={data?.userAnalytics?.changes?.users}
        caption="since last period"
        icon={<Users className="w-5 h-5" />}
      />
      <StatsCard
        title="Lifetime Value"
        value={formatPrice(data?.userAnalytics?.lifetimeValue || 0)}
        percentage={data?.userAnalytics?.repeatPurchaseRate}
        caption="repeat purchase rate"
        icon={<DollarSign className="w-5 h-5" />}
      />
      <StatsCard
        title="Engagement Score"
        value={data?.userAnalytics?.engagementScore?.toFixed(2) || 0}
        percentage={data?.userAnalytics?.repeatPurchaseRate}
        caption="repeat purchase rate"
        icon={<BarChart2 className="w-5 h-5" />}
      />
      <StatsCard
        title="Total Interactions"
        value={data?.interactionAnalytics?.totalInteractions || 0}
        percentage={0} // ! HARD CODED
        caption="all interactions"
        icon={<BarChart2 className="w-5 h-5" />}
      />
    </div>
  );
};

export default StatisticsCard;
