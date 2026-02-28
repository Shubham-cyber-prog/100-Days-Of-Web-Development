import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Search,
  Plus,
  MoreVertical,
  Pencil,
  Trash2,
  Mail,
  Phone,
} from "lucide-react";

interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  productsSupplied: number;
  status: "Active" | "Inactive";
  rating: number;
}

const suppliers: Supplier[] = [
  {
    id: "1",
    name: "TechCorp",
    contact: "Michael Stevens",
    email: "contact@techcorp.com",
    phone: "+1 (555) 123-4567",
    productsSupplied: 145,
    status: "Active",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Global Supplies",
    contact: "Jennifer Wong",
    email: "info@globalsupplies.com",
    phone: "+1 (555) 234-5678",
    productsSupplied: 89,
    status: "Active",
    rating: 4.5,
  },
  {
    id: "3",
    name: "Premium Goods",
    contact: "David Martinez",
    email: "sales@premiumgoods.com",
    phone: "+1 (555) 345-6789",
    productsSupplied: 67,
    status: "Active",
    rating: 4.9,
  },
  {
    id: "4",
    name: "FastShip Inc",
    contact: "Sarah Kim",
    email: "orders@fastship.com",
    phone: "+1 (555) 456-7890",
    productsSupplied: 34,
    status: "Active",
    rating: 4.3,
  },
  {
    id: "5",
    name: "Quality First",
    contact: "Robert Johnson",
    email: "contact@qualityfirst.com",
    phone: "+1 (555) 567-8901",
    productsSupplied: 52,
    status: "Inactive",
    rating: 3.9,
  },
];

export default function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Suppliers</h1>
          <p className="text-gray-600 mt-1">
            Manage your supplier relationships
          </p>
        </div>
        <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
          <Plus className="size-4" />
          Add Supplier
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search suppliers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10"
          />
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {supplier.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{supplier.contact}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Pencil className="size-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="size-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="size-4" />
                <span className="truncate">{supplier.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="size-4" />
                <span>{supplier.phone}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-500">Products Supplied</p>
                <p className="text-lg font-semibold text-gray-900">
                  {supplier.productsSupplied}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Rating</p>
                <div className="flex items-center gap-1">
                  <span className="text-lg font-semibold text-gray-900">
                    {supplier.rating}
                  </span>
                  <span className="text-amber-500">★</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Badge
                variant="outline"
                className={
                  supplier.status === "Active"
                    ? "bg-green-100 text-green-700 border-green-200"
                    : "bg-gray-100 text-gray-700 border-gray-200"
                }
              >
                {supplier.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {filteredSuppliers.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No suppliers found</p>
        </div>
      )}
    </div>
  );
}
