import React, { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../store/slices/productsSlice";
import { ROUTES } from "../../../utils/constants";
import Layout from "../../../components/layout/Layout";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { Timestamp } from "firebase/firestore";
import { ProductFormData } from "../../../types";

interface FormState {
  title: string;
  price: string;
  imageUrl: string;
  category: string;
  description: string;
}

interface ProductsState {
  loading: boolean;
}

interface ThemeState {
  mode: "light" | "dark";
}

interface RootState {
  products: ProductsState;
  theme: ThemeState;
}

const AddProduct: React.FC = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { loading } = useSelector((state: RootState) => state.products);
  const { mode } = useSelector((state: RootState) => state.theme);

  const [formData, setFormData] = useState<FormState>({
    title: "",
    price: "",
    imageUrl: "",
    category: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.price ||
      !formData.imageUrl ||
      !formData.category ||
      !formData.description
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    const priceNum = parseFloat(formData.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    try {
      const productData: ProductFormData = {
        title: formData.title,
        price: formData.price,
        imageUrl: formData.imageUrl,
        category: formData.category,
        description: formData.description,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      await dispatch(addProduct(productData)).unwrap();
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Add New Product
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Create a new product for your store
            </p>
          </div>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Product Title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter product title"
                required
                disabled={loading}
              />

              <Input
                label="Price (₹)"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                required
                disabled={loading}
                min="0"
                step="0.01"
              />

              <Input
                label="Image URL"
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Enter image URL"
                required
                disabled={loading}
              />

              <Input
                label="Category"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter product category"
                required
                disabled={loading}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter product description"
                  required
                  disabled={loading}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 transition-colors"
                  style={{
                    backgroundColor:
                      mode === "dark" ? "rgb(55, 65, 81)" : "white",
                    borderColor:
                      mode === "dark"
                        ? "rgb(75, 85, 99)"
                        : "rgb(209, 213, 219)",
                    color: mode === "dark" ? "white" : "rgb(17, 24, 39)",
                  }}
                />
              </div>

              <div className="flex gap-4 pt-6">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? (
                    <>
                      <LoadingSpinner size="small" />
                      Adding Product...
                    </>
                  ) : (
                    "Add Product"
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(ROUTES.DASHBOARD)}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  );
});

AddProduct.displayName = "AddProduct";

export default AddProduct;
