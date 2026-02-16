import useQueryParams from "@/app/hooks/network/useQueryParams";
import { Category } from "../types/productTypes";


export const useFilterHandlers = (
  categories: Category[] = [],
) => {
  const { query, updateQuery } = useQueryParams();

  // Handle category filters
  const updateCategoryFilter = (category: string, value: boolean) => {
    const current = query.category ? query.category.split(",") : [];
    let newCategories: string[];
    if (value) {
      newCategories = current.includes(category)
        ? current
        : [...current, category];
    } else {
      newCategories = current.filter((c) => c !== category);
    }
    updateQuery({
      category: newCategories.length ? newCategories.join(",") : null,
    });
  };

  // Handle boolean flag filters (e.g., featured, best-selling)
  const updateFlagFilter = (flag: string, value: boolean) => {
    updateQuery({ [flag]: value ? true : null });
  };

  // Handle filter changes (e.g., category or boolean flags)
  const handleFilterChange = (name: string, value: boolean) => {
    const categorySlugs = categories.map((cat) => cat.slug);

    if (categorySlugs.includes(name)) {
      updateCategoryFilter(name, value);
    } else if (["bestselling", "featured"].includes(name.toLowerCase())) {
      updateFlagFilter(name.toLowerCase(), value);
    }
  };

  // Handle sort changes (price or createdAt)
  const handleSortChange = (selectedValue: string, type: string) => {
    if (type === "price") {
      updateQuery({ priceSort: selectedValue });
    } else if (type === "createdAt") {
      updateQuery({ createdAtSort: selectedValue });
    }
  };

  // Reset filters to default state
  const resetFilters = () => {
    updateQuery({
      category: null,
      bestselling: null,
      featured: null,
    });
  };

  // Reset sorting to default state
  const resetSorting = () => {
    updateQuery({
      priceSort: null,
      createdAtSort: null,
    });
  };

  return {
    query,
    handleFilterChange,
    handleSortChange,
    resetFilters,
    resetSorting,
  };
};
