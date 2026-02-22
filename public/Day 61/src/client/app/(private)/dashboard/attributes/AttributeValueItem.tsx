'use client'
import React, { useState } from "react";
import { X, Edit, Check } from "lucide-react";
import useToast from "@/app/hooks/ui/useToast";

interface AttributeValue {
  id: string;
  value: string;
}

interface AttributeValueItemProps {
  value: AttributeValue;
  attributeId: string;
}

const AttributeValueItem: React.FC<AttributeValueItemProps> = ({ value }) => {
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value.value);

  //   const [updateAttributeValue, { loading: isUpdating }] = useMutation(
  //     UPDATE_ATTRIBUTE_VALUE
  //   );

  //   const [deleteAttributeValue, { loading: isDeleting }] = useMutation(
  //     DELETE_ATTRIBUTE_VALUE
  //   );

  //   const handleUpdate = async () => {
  //     if (!editedValue.trim()) return;

  //     try {
  //       await updateAttributeValue({
  //         variables: { id: value.id, value: editedValue.trim() },
  //       });
  //       showToast("Value updated successfully", "success");
  //       setIsEditing(false);
  //       refetchAttributes();
  //     } catch (err) {
  //       showToast("Failed to update value", "error");
  //     }
  //   };

  //   const handleDelete = async () => {
  //     try {
  //       await deleteAttributeValue({ variables: { id: value.id } });
  //       showToast("Value deleted successfully", "success");
  //       refetchAttributes();
  //     } catch (err) {
  //       showToast("Failed to delete value", "error");
  //     }
  //   };

  // For now, since the mutations might not exist, we'll just use placeholders
  const placeholderHandleUpdate = () => {
    showToast("Update functionality not yet implemented", "info");
    setIsEditing(false);
  };

  const placeholderHandleDelete = () => {
    showToast("Delete functionality not yet implemented", "info");
  };

  return (
    <div className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-lg group">
      {isEditing ? (
        <div className="flex items-center">
          <input
            type="text"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            className="w-20 text-sm px-1 py-0.5 border-none focus:outline-none focus:ring-0"
            autoFocus
          />
          <button
            onClick={placeholderHandleUpdate}
            className="p-0.5 text-green-500 hover:text-green-600"
          >
            <Check size={14} />
          </button>
        </div>
      ) : (
        <>
          <span className="text-sm text-gray-700">{value.value}</span>
          <div className="hidden group-hover:flex items-center gap-0.5 ml-1">
            <button
              onClick={() => setIsEditing(true)}
              className="p-0.5 text-gray-400 hover:text-blue-500"
            >
              <Edit size={12} />
            </button>
            <button
              onClick={placeholderHandleDelete}
              className="p-0.5 text-gray-400 hover:text-red-500"
            >
              <X size={12} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AttributeValueItem;
