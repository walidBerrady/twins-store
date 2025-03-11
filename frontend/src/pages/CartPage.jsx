"use client"

import { useState, useEffect } from "react"
import { Trash2, ShoppingBag, Plus, Minus, ShoppingCart, Truck, Check } from "lucide-react"
import { useCartStore } from "../store/useCartStore"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

// UI Components
const Button = ({
  children,
  onClick,
  className = "",
  variant = "default",
  size = "default",
  disabled = false,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"

  const variants = {
    default: "bg-purple-600 text-white hover:bg-purple-700",
    outline: "border border-gray-300 hover:bg-gray-50 text-gray-700",
    ghost: "hover:bg-gray-100 text-gray-700",
    link: "text-purple-600 hover:underline underline-offset-4 hover:text-purple-700 p-0 h-auto",
  }

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md text-sm",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

const Card = ({ className = "", children, ...props }) => {
  return (
    <div className={`rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm ${className}`} {...props}>
      {children}
    </div>
  )
}

// Update the SizeSelector component to ensure it properly handles the specific sizes
// Replace the existing SizeSelector component with this enhanced version:

const SizeSelector = ({ item, onSizeChange }) => {
  // Define available sizes
  const availableSizes = Object.keys(item.sizes || {}).filter(
    (size) => item.sizes[size] && item.sizes[size].price !== undefined,
  )

  if (availableSizes.length <= 1) return null

  return (
    <div className="mt-2">
      <p className="text-sm text-gray-700 mb-1.5">Select Size:</p>
      <div className="flex flex-wrap gap-2">
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(item._id, size)}
            className={`px-3 py-1.5 text-sm rounded-md border transition-all ${
              item.selectedSize === size
                ? "border-purple-600 bg-purple-50 text-purple-700 font-medium"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            {size === "5ml" || size === "10ml" ? size : size === "full" ? "Full Size" : size}
            {item.selectedSize === size && <Check className="ml-1 inline-block h-3.5 w-3.5" />}
          </button>
        ))}
      </div>
    </div>
  )
}

// Enhance the getItemPrice function to better handle size-based pricing
// Replace the existing getItemPrice function with this improved version:

const getItemPrice = (item) => {
  if (!item || !item.sizes) {
    console.warn("Invalid item or missing sizes", item)
    return 0
  }

  // If no selectedSize is set, default to the first available size
  if (!item.selectedSize) {
    const firstSize = Object.keys(item.sizes)[0]
    if (firstSize && item.sizes[firstSize] && item.sizes[firstSize].price !== undefined) {
      console.log(`No selected size, defaulting to ${firstSize}`)
      return Number.parseFloat(item.sizes[firstSize].price)
    }
    console.warn("Item has no selectedSize property and no default could be found:", item)
    return 0
  }

  // Check if the selected size exists in the sizes object
  if (item.sizes[item.selectedSize] && item.sizes[item.selectedSize].price !== undefined) {
    const price = Number.parseFloat(item.sizes[item.selectedSize].price)
    return price
  }

  console.warn(`Size ${item.selectedSize} not found or has no price for ${item.name}`)

  // If we can't find a price, return 0
  return 0
}

export function CartPage() {
  const navigate = useNavigate()
  const {
    total,
    subtotal,
    cart,
    getCartItems,
    updateQuantity,
    removeFromCart,
    calculateTotals,
    clearCart,
    debugCart,
    updateItemSize,
  } = useCartStore()
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [localCart, setLocalCart] = useState([])

  // Format prices with protection against NaN
  const formattedSubtotal = isNaN(subtotal) ? "0.00" : subtotal.toFixed(2)
  const formattedTotal = isNaN(total) ? "0.00" : total.toFixed(2)

  useEffect(() => {
    getCartItems()
    // Debug the cart after loading
    setTimeout(() => {
      debugCart()
    }, 1000)
  }, [getCartItems, debugCart])

  // Update the useEffect that creates the local cart copy to ensure sizes are properly initialized
  // Replace the existing useEffect with this enhanced version:

  useEffect(() => {
    if (cart.length > 0) {
      // Make a deep copy of the cart to ensure we don't lose any data
      const cartCopy = cart.map((item) => {
        // Ensure the item has a selectedSize property
        const updatedItem = {
          ...item,
          // Ensure the sizes object is properly copied
          sizes: item.sizes ? { ...item.sizes } : null,
        }

        // If no selectedSize is set, default to the first available size
        if (!updatedItem.selectedSize && updatedItem.sizes) {
          const availableSizes = Object.keys(updatedItem.sizes).filter(
            (size) => updatedItem.sizes[size] && updatedItem.sizes[size].price !== undefined,
          )

          // Prioritize sizes in this order: 5ml, 10ml, full
          const preferredOrder = ["5ml", "10ml", "full"]
          let defaultSize = null

          // Try to find a size in the preferred order
          for (const size of preferredOrder) {
            if (availableSizes.includes(size)) {
              defaultSize = size
              break
            }
          }

          // If no preferred size is found, use the first available
          if (!defaultSize && availableSizes.length > 0) {
            defaultSize = availableSizes[0]
          }

          if (defaultSize) {
            updatedItem.selectedSize = defaultSize
          }
        }

        return updatedItem
      })

      setLocalCart(cartCopy)
      calculateTotals()
    } else {
      setLocalCart([])
    }
  }, [cart, calculateTotals])

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return
    updateQuantity(productId, newQuantity)
  }

  const handleSizeChange = (productId, newSize) => {
    updateItemSize(productId, newSize)
    toast.success(`Size updated to ${newSize === "full" ? "Full Size" : newSize}`)
  }

  const handleCheckout = () => {
    setCheckoutLoading(true)
    // Simulate checkout process
    setTimeout(() => {
      clearCart()
      toast.success("Order placed successfully!")
      setCheckoutLoading(false)
    }, 2000)
  }

  // Get the price for an item based on its selected size

  // Calculate item total
  const getItemTotal = (item) => {
    const price = getItemPrice(item)
    return price * item.quantity
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl font-serif font-medium mb-2 text-center text-gray-900">Your Shopping Cart</h1>
      <p className="text-center text-gray-500 mb-8">Review your items and proceed to checkout</p>

      {localCart.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-center mb-6">
            <ShoppingBag className="h-20 w-20 text-gray-300" />
          </div>
          <h2 className="text-2xl font-medium text-gray-700 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Discover our exquisite collection of fragrances and add your favorites to the cart.
          </p>
          <Button size="lg" className="px-8" onClick={() => navigate("/")}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="overflow-hidden mb-6">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h2 className="font-medium text-lg flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5 text-purple-600" />
                  Cart Items ({localCart.length})
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {localCart.map((item) => (
                  <div
                    key={item._id}
                    className="p-6 flex flex-col sm:flex-row gap-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="relative h-32 w-32 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 mx-auto sm:mx-0 border border-gray-200">
                      <img
                        src={item.image || "https://placehold.co/200x200"}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg text-gray-900">{item.name}</h3>
                          {item.selectedSize && (
                            <p className="text-sm text-gray-500 mt-1">
                              Size: {item.selectedSize === "full" ? "Full Size" : item.selectedSize}
                            </p>
                          )}
                          {item.brand && <p className="text-sm text-gray-500">Brand: {item.brand}</p>}
                          <p className="text-sm font-medium text-purple-600 mt-1">
                            ${getItemPrice(item).toFixed(2)} each
                          </p>

                          {/* Size selector component */}
                          <SizeSelector item={item} onSizeChange={handleSizeChange} />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item._id)}
                          aria-label={`Remove ${item.name} from cart`}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                      <div className="mt-auto flex flex-wrap justify-between items-end pt-4 gap-4">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 rounded-r-none border-gray-300"
                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item._id, Number.parseInt(e.target.value) || 1)}
                            className="h-9 w-14 rounded-none text-center border-x-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 rounded-l-none border-gray-300"
                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="font-medium text-lg">${getItemTotal(item).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card className="p-6">
              <h2 className="text-lg font-medium mb-4 flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5 text-purple-600" />
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${formattedSubtotal}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center">
                    <Truck className="mr-2 h-4 w-4" />
                    Shipping
                  </span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-lg">Total</span>
                    <span className="font-bold text-xl">${formattedTotal}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Including VAT</p>
                </div>
              </div>
              <Button className="w-full" size="lg" onClick={handleCheckout} disabled={checkoutLoading}>
                {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
              </Button>
              <div className="mt-4 text-center">
                <Button variant="link" size="sm" className="text-sm" onClick={() => navigate("/")}>
                  Continue Shopping
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

