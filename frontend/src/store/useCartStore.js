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
        // Check if we have a saved size preference in localStorage
        const savedSize = localStorage.getItem("cart-size-" + item._id)
        if (savedSize && item.sizes && item.sizes[savedSize]) {
          console.log(`Found saved size preference for ${item.name}: ${savedSize}`)
          return { ...item, selectedSize: savedSize }
        }

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

    // Clear all cart size preferences from localStorage
    const { cart } = get()
    cart.forEach((item) => {
      localStorage.removeItem("cart-size-" + item._id)
    })
  },

  // Update the addToCart function to accept the selectedSize as a separate parameter
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

      // Check if the item already exists in the cart with the same size
      const { cart } = get()
      const existingItem = cart.find((item) => item._id === product._id && item.selectedSize === selectedSize)

      if (existingItem) {
        console.log(
          `Item already exists in cart with size ${selectedSize}, updating quantity instead of adding new item`,
        )
        await get().updateQuantity(product._id, existingItem.quantity + 1)
        return
      }

      // If the item doesn't exist in the cart with this size, add it
      await axios.post("/cart", {
        productId: product._id,
        size: selectedSize,
      })

      // Save the selected size to localStorage
      localStorage.setItem("cart-size-" + product._id, selectedSize)

      set((prevState) => {
        // Create a new product object with the selected size
        const productWithSize = {
          ...product,
          selectedSize: selectedSize,
        }

        const newCart = [
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
    // Remove the size preference from localStorage
    localStorage.removeItem("cart-size-" + productId)

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

  // Add updateItemSize function to handle size changes
  updateItemSize: async (productId, newSize) => {
    try {
      // Save the selected size to localStorage
      localStorage.setItem("cart-size-" + productId, newSize)

      // Update on the server
      await axios.put(`/cart/size/${productId}`, { size: newSize })

      // Update local state
      set((prevState) => ({
        cart: prevState.cart.map((item) => (item._id === productId ? { ...item, selectedSize: newSize } : item)),
      }))

      // Recalculate totals with the new size
      get().calculateTotals()

      console.log(`Size updated to ${newSize} for product ${productId}`)
    } catch (error) {
      // Even if the server update fails, still update the local state and localStorage
      localStorage.setItem("cart-size-" + productId, newSize)

      set((prevState) => ({
        cart: prevState.cart.map((item) => (item._id === productId ? { ...item, selectedSize: newSize } : item)),
      }))

      get().calculateTotals()

      toast.error("Failed to update size on server, but local changes were saved")
      console.error("Update size error:", error)
    }
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

      // Check if we have a saved size preference in localStorage
      const savedSize = localStorage.getItem("cart-size-" + item._id)
      if (savedSize) {
        console.log(`Saved size preference for ${item.name}: ${savedSize}`)
      }
    })
  },
}))

