"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import useToast from "@/app/hooks/ui/useToast";
import { useCreateAttributeMutation } from "@/app/store/apis/AttributeApi";

const AttributeForm: React.FC<any> = () => {
  const { showToast } = useToast();
  const [createAttribute, { isLoading: isCreatingAttribute, error }] =
    useCreateAttributeMutation();
  console.log("Failed to create attribute", error);

  const [newAttribute, setNewAttribute] = useState({
    name: "",
  });
  console.log("new Attribute => ", newAttribute);

  const handleCreateAttribute = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAttribute({
        name: newAttribute.name,
      });
      showToast("Attribute created successfully", "success");
      setNewAttribute({ name: "" });
    } catch (err) {
      console.log("error => ", err);
      showToast("Failed to create attribute", "error");
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-xl p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Create New Attribute
      </h2>
      <form onSubmit={handleCreateAttribute} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Attribute Name
          </label>
          <input
            type="text"
            value={newAttribute.name}
            onChange={(e) =>
              setNewAttribute((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="e.g., Color, Size, Material"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isCreatingAttribute || !newAttribute.name}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={18} />
          {isCreatingAttribute ? "Creating..." : "Create Attribute"}
        </button>
      </form>
    </div>
  );
};

export default AttributeForm;
