"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useGetAllCategoriesQuery } from "@/app/store/apis/CategoryApi";

interface Category {
  id: string;
  name: string;
  slug: string;
}

const CategoriesBar = () => {
  const { data, error } = useGetAllCategoriesQuery({});

  if (error) {
    console.log("error occured while fetching categories", error);
  }
  const categories = data?.categories || [];

  return (
    <div className="w-full">
      <div className="container mx-auto border-r-2 border-gray-200">
        <div className="flex flex-col gap-8 items-start justify-between overflow-x-auto py-[18px] whitespace-nowrap">
          {categories.map((category: Category, index: number) => (
            <React.Fragment key={category.id + index}>
              <Link
                href={`/shop?category=${category.slug}`}
                className="flex items-center text-gray-700 hover:text-black transition-colors font-medium text-[16px] capitalize"
              >
                {category.name}
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesBar;
