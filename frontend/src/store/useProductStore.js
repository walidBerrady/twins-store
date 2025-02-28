import { create } from 'zustand';
import axios from '../lib/axios';

const useProductStore = create((set) => ({
  products: [],
  featuredProducts: [],
  loading: false,
  error: null,

  // Function to fetch products based on category, size, and isFeatured filter
  fetchProducts: async ({ category, size, isFeatured }) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get('/products', {
        params: { category, size, isFeatured },
      });
      set({ products: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Function to fetch only featured products
  fetchFeaturedProducts: async () => {
    try {
      const response = await axios.get('/products?isFeatured=true');
      set({ featuredProducts: response.data });
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
    }
  },
}));

export default useProductStore;
