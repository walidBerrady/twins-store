import { create } from "zustand"
import axios from "../lib/axios"
import { toast } from "react-hot-toast"

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,

  getCartItems: async () => {
    try {
      const res = await axios.get("/cart")

      // Log the raw response from the backend
      console.log("Raw cart data from backend:", res.data)

      // Ensure each item has the correct selectedSize property
      const cartWithSizes = res.data.map((item) => {
        // If the item doesn't have a selectedSize but has a size property, use that
        if (!item.selectedSize && item.size) {
          console.log(`Item ${item.name} has size property but no selectedSize, using size: ${item.size}`)
          return { ...item, selectedSize: item.size }
        }

        // If the item has neither selectedSize nor size, try to use the first available size
        if (!item.selectedSize && !item.size && item.sizes && Object.keys(item.sizes).length > 0) {
          const firstSize = Object.keys(item.sizes)[0]
          console.log(`Item ${item.name} has no size info, defaulting to first available size: ${firstSize}`)
          return { ...item, selectedSize: firstSize }
        }

        console.log(`Item ${item.name} selectedSize: ${item.selectedSize || "none"}`)
        return item
      })

      set({ cart: cartWithSizes })
      get().calculateTotals()
    } catch (error) {
      set({ cart: [] })
      toast.error(error.response?.data?.message || "An error occurred")
    }
  },

  clearCart: async () => {
    set({ cart: [], coupon: null, total: 0, subtotal: 0 })
  },

  addToCart: async (product, selectedSize = "Full") => {
    try {
      console.log("Adding to cart with size:", selectedSize)
      console.log("Product:", product)

      // Make sure the product has the sizes property
      if (!product.sizes) {
        console.warn("Product doesn't have sizes property:", product)
        product.sizes = { Full: { price: product.price, stock: 10 } }
      }

      // Log the available sizes and the selected size price
      console.log("Available sizes:", Object.keys(product.sizes))
      if (product.sizes[selectedSize]) {
        console.log(`Price for ${selectedSize}:`, product.sizes[selectedSize].price)
      } else {
        console.warn(`Selected size ${selectedSize} not found in product sizes`)
      }

      await axios.post("/cart", {
        productId: product._id,
        size: selectedSize,
      })

      toast.success(`Added ${selectedSize} to cart`)

      set((prevState) => {
        // Use both ID and size to identify unique items
        const existingItem = prevState.cart.find(
          (item) => item._id === product._id && item.selectedSize === selectedSize,
        )

        // Create a new product object with the selected size
        const productWithSize = {
          ...product,
          selectedSize: selectedSize,
        }

        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === product._id && item.selectedSize === selectedSize
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            )
          : [
              ...prevState.cart,
              {
                ...productWithSize,
                quantity: 1,
              },
            ]

        // Log the new cart state
        console.log("Updated cart:", newCart)

        return { cart: newCart }
      })

      get().calculateTotals()
    } catch (error) {
      toast.error("An error occurred")
      console.error("Add to cart error:", error)
    }
  },

  removeFromCart: async (productId) => {
    await axios.delete(`/cart`, { data: { productId } })
    set((prevState) => ({ cart: prevState.cart.filter((item) => item._id !== productId) }))
    get().calculateTotals()
  },

  updateQuantity: async (productId, quantity) => {
    if (quantity === 0) {
      get().removeFromCart(productId)
      return
    }

    await axios.put(`/cart/${productId}`, { quantity })
    set((prevState) => ({
      cart: prevState.cart.map((item) => (item._id === productId ? { ...item, quantity } : item)),
    }))
    get().calculateTotals()
  },

  // Calculate totals with size-based pricing
  calculateTotals: () => {
    const { cart, coupon } = get()

    console.log("Calculating totals for cart:", cart)

    // Helper function to get price based on selected size
    const getItemPrice = (item) => {
      console.log(`Calculating price for ${item.name}`)
      console.log(`Selected size: ${item.selectedSize || "none"}`)
      console.log(`Available sizes:`, item.sizes ? Object.keys(item.sizes) : "No sizes")

      // If the item has sizes and a selectedSize, use that price
      if (item.sizes && item.selectedSize && item.sizes[item.selectedSize]) {
        const sizePrice = item.sizes[item.selectedSize].price
        console.log(`Found price for ${item.selectedSize}: ${sizePrice}`)

        if (sizePrice != null) {
          return Number.parseFloat(sizePrice)
        }
      }

      // If we can't find the selected size price, log a warning and try fallbacks
      if (item.selectedSize) {
        console.warn(`Selected size ${item.selectedSize} not found in sizes object or has no price`)
      }

      // Fallback to the item's direct price property if sizes aren't available
      if (item.price != null) {
        console.log("Using direct price property:", item.price)
        if (typeof item.price === "number") {
          return item.price
        }

        if (typeof item.price === "string") {
          const cleanedPrice = item.price.replace(/[^\d.-]/g, "")
          const parsed = Number.parseFloat(cleanedPrice)
          return isNaN(parsed) ? 0 : parsed
        }
      }

      // If we can't find a price, log a warning and return 0
      console.warn("Could not determine price for item:", item)
      return 0
    }

    const subtotal = cart.reduce((sum, item) => {
      const price = getItemPrice(item)
      console.log(`Final price for ${item.name} (${item.selectedSize || "no size"}): $${price}`)
      return sum + price * item.quantity
    }, 0)

    let total = subtotal

    if (coupon) {
      const discount = subtotal * (coupon.discountPercentage / 100)
      total = subtotal - discount
    }

    set({ subtotal, total })
  },

  // Debug function to help troubleshoot
  debugCart: () => {
    const { cart } = get()
    console.log("Current cart state:", cart)
    cart.forEach((item) => {
      console.log(`Item: ${item.name}, Size: ${item.selectedSize || "No size"}, Sizes:`, item.sizes)

      // Check if the selected size exists in the sizes object
      if (item.selectedSize && item.sizes) {
        if (item.sizes[item.selectedSize]) {
          console.log(`Price for ${item.selectedSize}: ${item.sizes[item.selectedSize].price}`)
        } else {
          console.warn(`Selected size ${item.selectedSize} not found in sizes object`)
        }
      }
    })
  },
}))

