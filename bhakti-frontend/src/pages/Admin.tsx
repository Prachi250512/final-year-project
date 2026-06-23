import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useProducts } from "../contexts/ProductContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import { Card, CardContent } from "../components/ui/card";
import { categories } from "../constants/categories";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Plus, Trash2 } from "lucide-react";
import { Product } from "../types";
import { toast } from "sonner";

import API from "../lib/api";

export default function Admin() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"products" | "orders">("products");

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    originalPrice: "",
    description: "",
    image: null as File | null,
    stock: "",
    badge: "",
    featured: false
  });

  useEffect(() => {
    if (editProduct && editProduct.image) {
      setPreviewImage(`http://localhost:8081/uploads/${editProduct.image}`);
    }
  }, [editProduct]);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/admin/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders");
      }
    };

    fetchOrders();
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      price: "",
      originalPrice: "",
      description: "",
      image: null,
      stock: "",
      badge: "",
      featured: false
    });

    setPreviewImage(null);   // 🔥 ADD THIS
    setEditProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product: Product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || "",
      description: product.description,
      image: null, // ⚠️ Important: don't preload file
      stock: product.stock.toString(),
      badge: product.badge || "",
      featured: product.featured || false
    });

    setEditProduct(product);
    setShowForm(true);
  };

  const handleSave = async () => {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("category", form.category);
    formData.append("price", form.price);
    formData.append("originalPrice", form.originalPrice);
    formData.append("description", form.description);
    formData.append("stock", form.stock);
    formData.append("badge", form.badge);
    formData.append("featured", String(form.featured));

    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      if (editProduct) {
        await updateProduct(editProduct.id, formData);
        toast.success("Product updated!");
      } else {
        await addProduct(formData);
        toast.success("Product added!");
      }

      resetForm();
    } catch {
      toast.error("Upload failed");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      toast.success("Deleted!");
    } catch {
      toast.error("Delete failed");
    }
  };

  // 🔥 Filtered products for search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = (Array.isArray(orders) ? orders : []).reduce((sum, o) => sum + Number(o.totalAmount), 0);

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold flex items-center gap-3">
          🛕 Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage products, orders, and content
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <p className="text-3xl font-bold">{products.length}</p>
            <p className="text-muted-foreground">📦Products</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <p className="text-3xl font-bold">₹{totalRevenue}</p>
            <p className="text-muted-foreground">💰Revenue</p>
          </CardContent>
        </Card>

      </div>

      {/* TABS */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === "products" ? "default" : "outline"}
          onClick={() => setActiveTab("products")}
        >
        📦 Products
        </Button>

        <Button
          variant={activeTab === "orders" ? "default" : "outline"}
          onClick={() => setActiveTab("orders")}
        >
        📑 Orders
        </Button>

        <Button
          variant={"outline"}
          onClick={() => navigate("/admin/reports")}
          >
          📊 Reports
        </Button>
      </div>

      {/* ACTION BAR */}
      <div className="flex flex-wrap gap-4 items-center">
        <Button onClick={() => setShowForm(true)}>
          + Add Product
        </Button>

        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        
      </div>
      {showForm && (
        <Card className="p-6 rounded-2xl shadow-md">
          <CardContent className="space-y-4">

            <Input
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              className="w-full border rounded-md p-2"
            >
              <option value="">Select Category</option>

              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>

            <Input
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            <Input
              placeholder="Original Price"
              type="number"
              value={form.originalPrice}
              onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
            />

            <Input
              placeholder="Stock Quantity"
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />

            <Input
              placeholder="Badge (Bestseller, New, Regular)"
              value={form.badge}
              onChange={(e) => setForm({ ...form, badge: e.target.value })}
            />

            <div>
              <Input
                type="file"
                onChange={(e) =>
                  setForm({ ...form, image: e.target.files?.[0] || null })
                }
              />
            </div>

            {previewImage && (
              <img
                src={previewImage}
                className="w-32 h-32 object-cover rounded-xl"
              />
            )}
              <Textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            <div className="flex items-center gap-2">
              <Checkbox
                checked={form.featured}
                onCheckedChange={(v) =>
                  setForm({ ...form, featured: Boolean(v) })
                }
              />
              <span>Featured Product</span>
            </div>

            <div className="flex gap-3 pt-2">
              <Button onClick={handleSave}>
                {editProduct ? "Update Product" : "Add Product"}
              </Button>
              
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>

          </CardContent>
        </Card>
      )}
      {/* CONTENT BASED ON TAB */}
      {activeTab === "products" && (
        <div className="space-y-4">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="flex justify-between items-center border p-4 rounded-2xl shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`http://localhost:8080/uploads/${p.image}`}
                  alt={p.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />

                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ₹{p.price} • Stock: {p.stock}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleEdit(p)}>
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "orders" && (
        <div className="space-y-4">
          {orders.length === 0 && (
            <p className="text-muted-foreground">No orders yet.</p>
          )}

          {orders.map((order) => (
            <div
              key={order.id}
              className="border p-4 rounded-2xl shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-bold">Order #{order.id}</p>
                <p>User: {order.username}</p>
                <p>Date: {new Date(order.orderDate).toLocaleString()}</p>

                {order.items?.length > 0 ? (
                  order.items.map((item, index) => (
                    <div key={index}>
                      {item.product?.name} × {item.quantity} 
                      - ₹{item.product?.price * item.quantity}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No items found</p>
                )}

                <p className="font-semibold mt-2">
                  Total: ₹{order.totalAmount}
                </p>
              </div>

              <div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}