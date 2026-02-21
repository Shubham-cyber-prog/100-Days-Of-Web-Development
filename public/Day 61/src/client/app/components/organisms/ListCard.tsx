"use client";
import { useState } from "react";
import { BaggageClaim, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export interface Item {
  id: number | string;
  name: string;
  subtitle: string;
  primaryInfo: string;
  secondaryInfo: string;
  image: string;
}

interface ListCardProps {
  title?: string;
  viewAllLink?: string;
  items: Item[];
  itemType?: "product" | "user";
}

const ListCard = ({
  title = "Top Items",
  viewAllLink,
  items = [],
  itemType = "product",
}: ListCardProps) => {
  const defaultViewAllLink = itemType === "product" ? "/shop" : "/users";
  const finalViewAllLink = viewAllLink || defaultViewAllLink;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <Link
            href={finalViewAllLink}
            className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
          >
            View all <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="bg-gray-100 rounded-full p-3 mb-3">
            {itemType === "product" ? (
              <BaggageClaim size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </div>
          <p className="text-gray-500 text-sm">No {itemType}s available</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {items.map((item) => (
            <ListItem key={item.id} item={item} itemType={itemType} />
          ))}
        </div>
      )}
    </div>
  );
};

const ListItem = ({
  item,
  itemType,
}: {
  item: Item;
  itemType: "product" | "user";
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const detailUrl =
    itemType === "product"
      ? `/shop/product/${item.id}`
      : `/dashboard/users/${item.id}`;

  return (
    <Link
      href={detailUrl}
      className="block transition-colors hover:bg-gray-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              ) : itemType === "product" ? (
                <BaggageClaim size={24} />
              ) : (
                <ChevronRight size={24} />
              )}
            </div>
            {itemType === "user" && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-gray-900 truncate">
              {item.name}
            </h4>
            <p className="text-xs text-gray-500 truncate">{item.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {item.primaryInfo}
            </p>
            <p className="text-xs text-gray-500">{item.secondaryInfo}</p>
          </div>
          <ChevronRight
            className={`w-4 h-4 transition-colors ${
              isHovered ? "text-indigo-600" : "text-gray-400"
            }`}
          />
        </div>
      </div>
    </Link>
  );
};

export default ListCard;
