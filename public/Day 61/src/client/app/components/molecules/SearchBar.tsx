"use client";

import React, { useState, useRef } from "react";
import { Search, X, Clock, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import useStorage from "@/app/hooks/state/useStorage";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
// import useEventListener from "@/app/hooks/dom/useEventListener";

type SearchFormValues = {
  searchQuery: string;
};

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search products, brands...",
}) => {
  const { register, handleSubmit, setValue, watch } = useForm<SearchFormValues>(
    {
      defaultValues: {
        searchQuery: "",
      },
    }
  );

  const [recentQueries, setRecentQueries] = useStorage<string[]>(
    "recentQueries",
    []
  );
  const [isFocused, setIsFocused] = useState(false);
  const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchQuery = watch("searchQuery");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  // useEventListener("mousedown", (event) => {
  //   if (
  //     formRef.current &&
  //     !formRef.current.contains(event.target as Node) &&
  //     dropdownRef.current &&
  //     !dropdownRef.current.contains(event.target as Node)
  //   ) {
  //     setIsFocused(false);
  //   }
  // });

  const handleSearch = (data: SearchFormValues) => {
    const query = data.searchQuery.trim();
    if (query) {
      if (!recentQueries.includes(query)) {
        setRecentQueries([query, ...recentQueries.slice(0, 4)]);
      }
      // Navigate to shop page with search query
      router.push(`/shop?search=${encodeURIComponent(query)}`);
    }
    setIsFocused(false);
  };

  const handleSelectRecentQuery = (query: string) => {
    setValue("searchQuery", query);
    setTimeout(() => handleSubmit(handleSearch)(), 100);
  };

  const clearSearch = () => {
    setValue("searchQuery", "");
    if (inputRef.current) inputRef.current.focus();
  };

  const removeRecentQuery = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newQueries = [...recentQueries];
    newQueries.splice(index, 1);
    setRecentQueries(newQueries);
  };

  const showSearchResults = isFocused || isHoveringDropdown;

  return (
    <div className="relative w-full max-w-xl">
      <form
        ref={formRef}
        onSubmit={handleSubmit(handleSearch)}
        className="relative"
      >
        <div className="flex items-center">
          <div className="relative flex items-center w-full">
            <span className="absolute left-3 text-primary transition-all duration-300">
              <Search
                className={`transition-all duration-300 ${
                  isFocused ? "text-primary" : "text-gray-400"
                }`}
                size={18}
              />
            </span>
            <input
              type="text"
              placeholder={placeholder}
              className="w-full py-2.5 pl-10 pr-12 bg-white rounded-full text-gray-800 placeholder-gray-600 border-2 border-gray-200
               focus:border-secondary focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm transition-all duration-200 hover:border-gray-300"
              {...register("searchQuery")}
              onFocus={() => setIsFocused(true)}
              ref={(e) => {
                inputRef.current = e;
                const { ref } = register("searchQuery");
                if (typeof ref === "function") ref(e);
              }}
              autoComplete="off"
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-12 p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-all duration-200"
                >
                  <X size={14} />
                </motion.button>
              )}
            </AnimatePresence>
            <button
              type="submit"
              className="absolute right-2 p-1.5 rounded-full bg-primary text-white transition-all duration-300"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </form>

      <AnimatePresence>
        {showSearchResults && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full mt-2 bg-white rounded-lg shadow-xl z-[1000] border border-gray-100 overflow-hidden"
            onMouseEnter={() => setIsHoveringDropdown(true)}
            onMouseLeave={() => setIsHoveringDropdown(false)}
          >
            {/* Recent searches section */}
            {recentQueries.length > 0 && (
              <div className="p-3 border-b border-gray-100">
                <div className="flex items-center justify-between text-sm mb-2">
                  <div className="flex items-center text-gray-500">
                    <Clock size={14} className="mr-2" />
                    <span className="font-medium">Recent Searches</span>
                  </div>
                  <button
                    className="text-xs text-text font-medium"
                    onClick={() => setRecentQueries([])}
                  >
                    Clear all
                  </button>
                </div>
                <ul className="grid grid-cols-3 gap-2">
                  {recentQueries.map((query, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center py-1 px-2 cursor-pointer hover:bg-gray-50 rounded-md text-gray-700 group transition-all duration-200"
                      onClick={() => handleSelectRecentQuery(query)}
                    >
                      <div className="flex items-center overflow-hidden">
                        <Search
                          size={12}
                          className="mr-2 text-gray-400 flex-shrink-0"
                        />
                        <span className="text-sm truncate">{query}</span>
                      </div>
                      <button
                        onClick={(e) => removeRecentQuery(index, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded-full transition-opacity duration-200 flex-shrink-0"
                      >
                        <X size={12} className="text-gray-500" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
