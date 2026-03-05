import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Edit2, Trash2, DollarSign } from "lucide-react";
import { Expense } from "../data/mockData";
import { toast } from "sonner";

interface ExpenseCardProps {
  expense: Expense;
  onEdit?: () => void;
  onClick?: () => void;
}

export default function ExpenseCard({ expense, onEdit, onClick }: ExpenseCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("Expense deleted");
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.();
  };

  return (
    <Card 
      className="p-4 hover:shadow-md transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-start gap-3">
            <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg">
              <DollarSign className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{expense.title}</h3>
              <p className="text-sm text-gray-600">
                {expense.group || expense.friend} • Paid by {expense.paidBy}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(expense.date).toLocaleDateString("en-US", { 
                  month: "short", 
                  day: "numeric", 
                  year: "numeric" 
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">${expense.amount.toFixed(2)}</p>
            <p className="text-xs text-gray-500">{expense.splitType}</p>
          </div>

          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleEdit}
              className="h-8 w-8 p-0"
            >
              <Edit2 className="h-4 w-4 text-gray-600" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleDelete}
              className="h-8 w-8 p-0"
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
