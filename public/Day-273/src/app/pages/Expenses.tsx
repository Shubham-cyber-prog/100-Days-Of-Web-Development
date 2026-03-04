import { useState } from "react";
import ExpenseCard from "../components/ExpenseCard";
import ExpenseDetailsSidebar from "../components/ExpenseDetailsSidebar";
import { mockExpenses, Expense } from "../data/mockData";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";

export default function Expenses() {
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExpenses = mockExpenses.filter(expense => 
    expense.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expense.group?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expense.friend?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Expenses</h1>
        <p className="text-gray-600">View and manage all your expenses</p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search expenses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredExpenses.map((expense) => (
          <ExpenseCard 
            key={expense.id} 
            expense={expense}
            onClick={() => setSelectedExpense(expense)}
          />
        ))}
      </div>

      {filteredExpenses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No expenses found</p>
        </div>
      )}

      {selectedExpense && (
        <ExpenseDetailsSidebar 
          expense={selectedExpense} 
          onClose={() => setSelectedExpense(null)} 
        />
      )}
    </div>
  );
}
