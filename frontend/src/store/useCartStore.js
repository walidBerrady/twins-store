import { create } from "zustand";
import axios from "../lib/axios";
import {toast} from "react-hot-toast"


export const useCartStore = create((set, get) => ({
    cart: [],
    coupon: null,
    total: 0,
    subtotal: 0,

    getCartItems: async() => {
        try {
            const res = await axios.get("/cart");
            set({cart:res.data});
        } catch (error) {
            set({cart:[]});
            toast.error(error.response.data.message || "An error occurred");
        }
    },

    clearCart: async () => {
		set({ cart: [], coupon: null, total: 0, subtotal: 0 });
	},

    addToCart: async(product) => {
        try {
			await axios.post("/cart", { productId: product._id });
			toast.success("Product added to cart");

			set((prevState) => {
				const existingItem = prevState.cart.find((item) => item._id === product._id);
				const newCart = existingItem
					? prevState.cart.map((item) =>
							item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
					  )
					: [...prevState.cart, { ...product, quantity: 1 }];
				return { cart: newCart };
			});
			get().calculateTotals();
		} catch (error) {
			toast.error("An error occurred");
			console.log(error)
		}
    },

    removeFromCart: async (productId) => {
		await axios.delete(`/cart`, { data: { productId } });
		set((prevState) => ({ cart: prevState.cart.filter((item) => item._id !== productId) }));
		get().calculateTotals();
	},

	updateQuantity: async (productId, quantity) => {
		if (quantity === 0) {
			get().removeFromCart(productId);
			return;
		}

		await axios.put(`/cart/${productId}`, { quantity });
		set((prevState) => ({
			cart: prevState.cart.map((item) => (item._id === productId ? { ...item, quantity } : item)),
		}));
		get().calculateTotals();
	},

   // Calculate totals
   calculateTotals: () => {
	const { cart, coupon } = get()

	// Helper function to safely get price
	const getItemPrice = (item) => {
	  if (!item || item.price == null) return 0

	  if (typeof item.price === "number") {
		return item.price
	  }

	  if (typeof item.price === "string") {
		const cleanedPrice = item.price.replace(/[^\d.-]/g, "")
		const parsed = Number.parseFloat(cleanedPrice)
		return isNaN(parsed) ? 0 : parsed
	  }

	  return 0
	}

	const subtotal = cart.reduce((sum, item) => {
	  const price = getItemPrice(item)
	  return sum + price * item.quantity
	}, 0)

	let total = subtotal

	if (coupon) {
	  const discount = subtotal * (coupon.discountPercentage / 100)
	  total = subtotal - discount
	}

	set({ subtotal, total })
  },
}))