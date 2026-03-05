import { useState } from "react";
import BalanceCard from "../components/BalanceCard";
import ExpenseCard from "../components/ExpenseCard";
import FriendCard from "../components/FriendCard";
import GroupCard from "../components/GroupCard";
import ActivityFeed from "../components/ActivityFeed";
import ExpenseDetailsSidebar from "../components/ExpenseDetailsSidebar";
import { mockFriends, mockGroups, mockExpenses, mockActivities, Expense } from "../data/mockData";

export default function Dashboard() {
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const totalOwed = mockFriends.filter(f => f.balance > 0).reduce((sum, f) => sum + f.balance, 0);
  const totalOwe = Math.abs(mockFriends.filter(f => f.balance < 0).reduce((sum, f) => sum + f.balance, 0));
  const totalBalance = totalOwed - totalOwe;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of your expenses and balances</p>
      </div>

      {/* Balance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <BalanceCard title="You Are Owed" amount={totalOwed} type="owed" />
        <BalanceCard title="You Owe" amount={totalOwe} type="owe" />
        <BalanceCard title="Total Balance" amount={totalBalance} type="total" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Expenses */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Expenses</h2>
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {mockExpenses.slice(0, 5).map((expense) => (
                <ExpenseCard 
                  key={expense.id} 
                  expense={expense}
                  onClick={() => setSelectedExpense(expense)}
                />
              ))}
            </div>
          </div>

          {/* Friends & Groups */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Friends</h2>
              <div className="space-y-3">
                {mockFriends.slice(0, 3).map((friend) => (
                  <FriendCard key={friend.id} friend={friend} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Groups</h2>
              <div className="space-y-3">
                {mockGroups.slice(0, 3).map((group) => (
                  <GroupCard key={group.id} group={group} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-1">
          <ActivityFeed activities={mockActivities} />
        </div>
      </div>

      {/* Expense Details Sidebar */}
      {selectedExpense && (
        <ExpenseDetailsSidebar 
          expense={selectedExpense} 
          onClose={() => setSelectedExpense(null)} 
        />
      )}
    </div>
  );
}
