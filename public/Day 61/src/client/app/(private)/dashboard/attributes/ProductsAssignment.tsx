import Dropdown from "@/app/components/molecules/Dropdown";
import { Box } from "lucide-react";
import { Controller } from "react-hook-form";

// Separate component for Product Assignment
const ProductAssignmentSection: React.FC<{
  control: any;
  handleSubmit: any;
  onAssignToProduct: any;
  productOptions: any[];
  isAssigningToProduct: boolean;
  watch: any;
}> = ({
  control,
  handleSubmit,
  onAssignToProduct,
  productOptions,
  isAssigningToProduct,
  watch,
}) => (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
    <div className="flex items-center gap-2 mb-4">
      <Box size={18} className="text-green-600" />
      <h3 className="text-base font-semibold text-gray-800">
        Assign to Product
      </h3>
    </div>

    <form onSubmit={handleSubmit(onAssignToProduct)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Product
        </label>
        <Controller
          name="productId"
          control={control}
          render={({ field }) => (
            <Dropdown
              options={productOptions}
              value={field.value}
              onChange={field.onChange}
              label="Choose a product"
            />
          )}
        />
      </div>

      <button
        type="submit"
        disabled={
          isAssigningToProduct || !watch("attributeId") || !watch("productId")
        }
        className="w-full px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600"
      >
        {isAssigningToProduct ? "Assigning..." : "Assign to Product"}
      </button>
    </form>
  </div>
);

export default ProductAssignmentSection;
