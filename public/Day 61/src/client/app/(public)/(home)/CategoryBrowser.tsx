"use client";
import { useState } from "react";
import { MoveRight, MoveLeft } from "lucide-react";
import { useGetAllCategoriesQuery } from "@/app/store/apis/CategoryApi";
import { Category } from "@/app/types/productTypes";

const CategoryBrowser = () => {
  const { data } = useGetAllCategoriesQuery({});
  const [activeCategory, setActiveCategory] = useState("Camera");

  return (
    <section className="relative w-full max-w-[83%] mx-auto flex flex-col items-start px-8 my-[5rem]">
      <div className="flex items-center justify-between w-full mb-8">
        <h2
          className="text-2xl font-semibold capitalize relative before:content-[''] 
        before:absolute before:left-0 before:top-[-2px] before:w-[6px] before:rounded before:h-[2.5rem] before:bg-[#db4444] text-[#db4444] pl-6"
        >
          Shop by Category
        </h2>

        <div className="flex gap-2">
          <button className="p-3 border rounded-full hover:bg-gray-100 transition">
            <MoveLeft size={20} />
          </button>
          <button className="p-3 border rounded-full hover:bg-gray-100 transition">
            <MoveRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4 w-full">
        {data?.categories.map(({ name, slug }: Category) => (
          <button
            key={slug}
            onClick={() => setActiveCategory(slug)}
            className={`flex flex-col items-center justify-center w-full h-32 border rounded-lg transition ${
              activeCategory === slug
                ? "bg-red-500 text-white"
                : "border-gray-300 text-black hover:bg-gray-100"
            }`}
          >
            <span className="mt-2 font-medium">{name}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryBrowser;
