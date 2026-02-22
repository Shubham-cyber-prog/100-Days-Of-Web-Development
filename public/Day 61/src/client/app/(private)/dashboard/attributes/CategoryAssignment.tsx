import Dropdown from "@/app/components/molecules/Dropdown";
import { TagsIcon } from "lucide-react";
import { Controller } from "react-hook-form";

const CategoryAssignmentSection: React.FC<{
  control: any;
  handleSubmit: any;
  onAssignToCategory: any;
  categoryOptions: any[];
  isAssigningToCategory: boolean;
  watch: any;
}> = ({
  control,
  handleSubmit,
  onAssignToCategory,
  categoryOptions,
  isAssigningToCategory,
  watch,
}) => (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
    <div className="flex items-center gap-2 mb-4">
      <TagsIcon size={18} className="text-blue-600" />
      <h3 className="text-base font-semibold text-gray-800">
        Assign to Category
      </h3>
    </div>

    <form onSubmit={handleSubmit(onAssignToCategory)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Category
        </label>
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <Dropdown
              options={categoryOptions}
              value={field.value}
              onChange={field.onChange}
              label="Choose a category"
            />
          )}
        />
      </div>

      <div className="flex items-center gap-2">
        <Controller
          name="isRequired"
          control={control}
          render={({ field }) => (
            <input
              type="checkbox"
              id="isRequired"
              checked={field.value}
              onChange={field.onChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          )}
        />
        <label
          htmlFor="isRequired"
          className="text-sm font-medium text-gray-700"
        >
          Mark as required attribute
        </label>
      </div>

      <button
        type="submit"
        disabled={
          isAssigningToCategory || !watch("attributeId") || !watch("categoryId")
        }
        className="w-full px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
      >
        {isAssigningToCategory ? "Assigning..." : "Assign to Category"}
      </button>
    </form>
  </div>
);

export default CategoryAssignmentSection;
