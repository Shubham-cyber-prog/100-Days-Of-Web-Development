import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { ProductModal } from "../components/ProductModal";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Pencil,
  Trash2,
  Download,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  supplier: string;
  price: number;
}

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Laptop Pro 15",
    sku: "ELEC-001",
    category: "Electronics",
    stock: 45,
    status: "In Stock",
    supplier: "TechCorp",
    price: 1299,
  },
  {
    id: "2",
    name: "Office Chair Deluxe",
    sku: "FURN-023",
    category: "Furniture",
    stock: 8,
    status: "Low Stock",
    supplier: "Global Supplies",
    price: 449,
  },
  {
    id: "3",
    name: "Wireless Mouse",
    sku: "ELEC-145",
    category: "Electronics",
    stock: 120,
    status: "In Stock",
    supplier: "TechCorp",
    price: 79,
  },
  {
    id: "4",
    name: "Standing Desk",
    sku: "FURN-089",
    category: "Furniture",
    stock: 0,
    status: "Out of Stock",
    supplier: "Premium Goods",
    price: 599,
  },
  {
    id: "5",
    name: "Mechanical Keyboard",
    sku: "ELEC-067",
    category: "Electronics",
    stock: 67,
    status: "In Stock",
    supplier: "TechCorp",
    price: 149,
  },
  {
    id: "6",
    name: "Monitor 27 inch",
    sku: "ELEC-234",
    category: "Electronics",
    stock: 12,
    status: "Low Stock",
    supplier: "Global Supplies",
    price: 599,
  },
  {
    id: "7",
    name: "Desk Lamp LED",
    sku: "FURN-156",
    category: "Furniture",
    stock: 34,
    status: "In Stock",
    supplier: "Premium Goods",
    price: 89,
  },
  {
    id: "8",
    name: "USB-C Cable Pack",
    sku: "ELEC-389",
    category: "Electronics",
    stock: 5,
    status: "Low Stock",
    supplier: "FastShip Inc",
    price: 29,
  },
];

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const handleAddProduct = () => {
    setEditingProduct(undefined);
    setModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleSaveProduct = (productData: any) => {
    if (productData.id) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === productData.id
            ? {
                ...productData,
                status:
                  productData.stock === 0
                    ? "Out of Stock"
                    : productData.stock < 20
                    ? "Low Stock"
                    : "In Stock",
              }
            : p
        )
      );
    } else {
      // Add new product
      const newProduct = {
        ...productData,
        id: (products.length + 1).toString(),
        status:
          productData.stock === 0
            ? "Out of Stock"
            : productData.stock < 20
            ? "Low Stock"
            : "In Stock",
      } as Product;
      setProducts([...products, newProduct]);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
          <p className="text-gray-600 mt-1">
            Manage your products and stock levels
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="size-4" />
            Export
          </Button>
          <Button
            onClick={handleAddProduct}
            className="gap-2 bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="size-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products by name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10"
            />
          </div>

          <div className="flex gap-3">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="size-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Furniture">Furniture</SelectItem>
                <SelectItem value="Clothing">Clothing</SelectItem>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Books">Books</SelectItem>
                <SelectItem value="Toys">Toys</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="In Stock">In Stock</SelectItem>
                <SelectItem value="Low Stock">Low Stock</SelectItem>
                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {product.supplier}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.stock} units
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant="outline"
                      className={
                        product.status === "In Stock"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : product.status === "Low Stock"
                          ? "bg-amber-100 text-amber-700 border-amber-200"
                          : "bg-red-100 text-red-700 border-red-200"
                      }
                    >
                      {product.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${product.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleEditProduct(product)}
                        >
                          <Pencil className="size-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="size-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>

      <ProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </div>
  );
}
