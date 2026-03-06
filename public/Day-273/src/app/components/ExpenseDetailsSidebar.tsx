import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { X, Edit2, Users } from "lucide-react";
import { Expense } from "../data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";

interface ExpenseDetailsSidebarProps {
  expense: Expense | null;
  onClose: () => void;
}

export default function ExpenseDetailsSidebar({ expense, onClose }: ExpenseDetailsSidebarProps) {
  if (!expense) return null;

  const splitAmount = expense.amount / expense.participants.length;

  return (
    <div className="fixed right-0 top-16 bottom-0 w-96 bg-white border-l border-gray-200 shadow-lg z-40 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Expense Details</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <Card className="p-4 bg-emerald-50 border-emerald-200 mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Total Amount</p>
            <p className="text-4xl font-bold text-emerald-600">${expense.amount.toFixed(2)}</p>
          </div>
        </Card>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
            <p className="text-gray-900">{expense.title}</p>
          </div>

          {expense.description && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Notes</h3>
              <p className="text-gray-600 text-sm">{expense.description}</p>
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Paid By</h3>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{expense.paidBy[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900">{expense.paidBy}</p>
                <p className="text-sm text-gray-600">Paid ${expense.amount.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Split Details ({expense.splitType})
            </h3>
            <div className="space-y-2">
              {expense.participants.map((participant, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{participant[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-900">{participant}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">${splitAmount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {expense.category && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Category</h3>
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {expense.category}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Date</h3>
            <p className="text-gray-900">
              {new Date(expense.date).toLocaleDateString("en-US", { 
                weekday: "long",
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })}
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => toast.success("Edit expense")}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button 
            className="flex-1 bg-emerald-500 hover:bg-emerald-600"
            onClick={() => {
              toast.success("Settlement initiated");
              onClose();
            }}
          >
            Settle Up
          </Button>
        </div>
      </div>
    </div>
  );
}
