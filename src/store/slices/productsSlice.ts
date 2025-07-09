import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Product, ProductFormData } from "../../types";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { firestore } from "../../firebase/FirebaseConfig.ts";
import { toast } from "react-toastify";

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  formData: ProductFormData;
}

const initialFormData: ProductFormData = {
  title: null,
  price: null,
  imageUrl: null,
  category: null,
  description: null,
  time: Timestamp.now(),
  date: new Date().toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }),
};

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  formData: initialFormData,
};

// Async thunks
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const q = query(collection(firestore, "products"), orderBy("time"));
    const querySnapshot = await getDocs(q);
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id } as Product);
    });
    return products;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData: ProductFormData, { rejectWithValue }) => {
    try {
      if (
        !productData.title ||
        !productData.price ||
        !productData.imageUrl ||
        !productData.category ||
        !productData.description
      ) {
        throw new Error("Please fill all fields");
      }

      // Convert price to number before saving
      const processedProductData = {
        ...productData,
        price:
          typeof productData.price === "string"
            ? parseFloat(productData.price)
            : productData.price,
      };

      const productRef = collection(firestore, "products");
      const docRef = await addDoc(productRef, processedProductData);

      toast.success("Product added successfully");
      return { ...processedProductData, id: docRef.id } as unknown as Product;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to add product";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (productData: Product, { rejectWithValue }) => {
    try {
      // Ensure price is a number before saving
      const processedProductData = {
        ...productData,
        price:
          typeof productData.price === "string"
            ? parseFloat(productData.price)
            : productData.price,
      };

      await setDoc(
        doc(firestore, "products", productData.id),
        processedProductData
      );
      toast.success("Product updated successfully");
      return processedProductData;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update product";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: string, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(firestore, "products", productId));
      toast.success("Product deleted successfully");
      return productId;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete product";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<ProductFormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },

    resetFormData: (state) => {
      state.formData = initialFormData;
    },

    clearError: (state) => {
      state.error = null;
    },

    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add product
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        state.formData = initialFormData;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFormData, resetFormData, clearError, setProducts } =
  productsSlice.actions;

export default productsSlice.reducer;
