"use client"

import { Link } from "react-router-dom"
import { ArrowRight, Star, ShoppingBag, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import useProductStore from "../store/useProductStore"
import { useUserStore } from "../store/useUserStore"
import { useCartStore } from "../store/useCartStore"
import toast from "react-hot-toast"

export default function Home() {
  const { addToCart } = useCartStore()
  const { user } = useUserStore()
  const { featuredProducts, fetchFeaturedProducts, loading, error } = useProductStore()
  const [selectedSizes, setSelectedSizes] = useState({})
  const [addingToCart, setAddingToCart] = useState({})
  const [expandedDescriptions, setExpandedDescriptions] = useState({})

  useEffect(() => {
    fetchFeaturedProducts()
  }, [fetchFeaturedProducts])

  // Initialize selected sizes when products change
  useEffect(() => {
    if (featuredProducts.length > 0) {
      const initialSizes = {}
      featuredProducts.forEach((product) => {
        // Only set initial size if we haven't already selected one
        if (!selectedSizes[product._id]) {
          const sizes = Object.keys(product.sizes || {})
          if (sizes.length > 0) {
            initialSizes[product._id] = sizes[0]
          }
        }
      })

      // Only update state if we have new sizes to set
      if (Object.keys(initialSizes).length > 0) {
        setSelectedSizes((prev) => ({
          ...prev,
          ...initialSizes,
        }))
      }
    }
  }, [featuredProducts, selectedSizes])

  // Load previously selected sizes from localStorage
  useEffect(() => {
    if (featuredProducts.length > 0) {
      const savedSizes = {}
      featuredProducts.forEach((product) => {
        const savedSize = localStorage.getItem(`product-size-${product._id}`)
        if (savedSize && product.sizes && product.sizes[savedSize]) {
          savedSizes[product._id] = savedSize
        }
      })

      if (Object.keys(savedSizes).length > 0) {
        setSelectedSizes((prev) => ({
          ...prev,
          ...savedSizes,
        }))
      }
    }
  }, [featuredProducts])

  const toggleDescription = (productId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }))
  }

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }))

    // Save the selected size to localStorage for persistence
    localStorage.setItem(`product-size-${productId}`, size)
  }

  const isProductInStock = (product, size) => {
    return product.sizes?.[size]?.stock > 0
  }

  const handleAddToCart = async (product) => {
    if (!user) {
      toast.error("Please log in to add items to your cart.")
      return
    }

    const selectedSize = selectedSizes[product._id] || Object.keys(product.sizes)[0]

    // Only allow adding to cart if the selected size is in stock
    if (!isProductInStock(product, selectedSize)) {
      toast.error(`${product.name} is out of stock in size ${selectedSize}`)
      return
    }

    setAddingToCart((prev) => ({ ...prev, [product._id]: true }))

    try {
      // Pass the selected size directly as the second parameter to addToCart
      await addToCart(product, selectedSize)

      toast.success(`Added ${product.name} (${selectedSize}) to cart`)

      // Simulate a brief loading state
      setTimeout(() => {
        setAddingToCart((prev) => ({ ...prev, [product._id]: false }))
      }, 600)
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast.error("Failed to add item to cart")
      setAddingToCart((prev) => ({ ...prev, [product._id]: false }))
    }
  }

  const categories = [
    {
      size: "5ml",
      description: "Perfect for trying new scents",
      slug: "5ml-perfumes",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=400&auto=format&fit=crop",
    },
    {
      size: "10ml",
      description: "Ideal for your collection",
      slug: "10ml-perfumes",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=400&auto=format&fit=crop",
    },
    {
      size: "Full Size",
      description: "Complete luxury experience",
      slug: "full-size-perfumes",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=400&auto=format&fit=crop",
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1920&auto=format&fit=crop"
          alt="Luxury Perfume"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">TWINS FRAGRANCE</h1>
          <p className="text-lg md:text-xl mb-8">Discover Your Signature Scent</p>
          <button
            onClick={() => document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-md border border-white/20 transition-colors"
          >
            Explore Collection
          </button>
        </div>
      </section>

      {/* Size Categories */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Shop by Size</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              to={`/shop/${category.slug}`}
              key={category.size}
              className="group bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{category.size}</h3>
                <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={`${category.size} Perfume`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="w-full text-gray-600 hover:text-gray-900 flex items-center justify-center group-hover:translate-x-2 transition-transform">
                  Shop {category.size}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Gender Categories */}
      <section id="collections" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                type: "Homme",
                description: "Masculine and sophisticated fragrances",
                image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=600&auto=format&fit=crop",
              },
              {
                type: "Femme",
                description: "Elegant and enchanting perfumes",
                image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop",
              },
            ].map((collection) => (
              <Link to={`/${collection.type.toLowerCase()}`} key={collection.type} className="group block">
                <div className="relative h-[400px] overflow-hidden rounded-lg">
                  <img
                    src={collection.image || "/placeholder.svg"}
                    alt={`${collection.type} Collection`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                    <h3 className="text-3xl font-bold mb-2">{collection.type}</h3>
                    <p className="mb-4">{collection.description}</p>
                    <button className="px-6 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-md border border-white/20 transition-colors">
                      Discover More
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Best Seller Fragrances</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our most popular and highly rated fragrances loved by customers worldwide
          </p>
        </div>

        {featuredProducts.length === 0 && !loading && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No featured products available at the moment.</p>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 my-8 rounded">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  We couldn't load the products. Please try again later. Error: {error}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.length > 0 &&
            featuredProducts.map((product) => {
              const selectedSize = selectedSizes[product._id] || Object.keys(product.sizes || {})[0] || "5ml"
              const currentPrice = product.sizes?.[selectedSize]?.price
              const isInStock = isProductInStock(product, selectedSize)

              return (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg?height=256&width=256"}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=256&width=256"
                        e.target.alt = "Product image unavailable"
                      }}
                    />

                    {product.rating && (
                      <div className="absolute bottom-3 left-3 flex items-center bg-white bg-opacity-90 px-2 py-1 rounded-full">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < (product.rating || 4) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-medium ml-1">
                          {product.reviews || Math.floor(Math.random() * 50) + 10}
                        </span>
                      </div>
                    )}

                    {product.isNew && (
                      <span className="absolute top-3 left-3 bg-primary text-black text-xs font-bold px-2 py-1 rounded-md">
                        New
                      </span>
                    )}

                    {product.discount && (
                      <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>

                    <div className="mb-3">
                      <p className={`text-gray-600 text-sm ${expandedDescriptions[product._id] ? "" : "line-clamp-2"}`}>
                        {product.description}
                      </p>
                      {product.description && product.description.length > 60 && (
                        <button
                          onClick={() => toggleDescription(product._id)}
                          className="text-primary text-xs font-medium mt-1 hover:underline focus:outline-none"
                        >
                          {expandedDescriptions[product._id] ? "Read Less" : "Read More"}
                        </button>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <p className="text-gray-900 font-bold">
                        ${currentPrice?.toFixed(2) || "N/A"}
                        <span className="text-xs text-gray-500 font-normal ml-1">/ {selectedSize}</span>
                      </p>

                      {isInStock ? (
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          In Stock
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    <div className="mb-3">
                      <div className="flex flex-wrap gap-2">
                        {Object.keys(product.sizes || {}).map((size) => (
                          <button
                            key={size}
                            onClick={() => handleSizeChange(product._id, size)}
                            disabled={product.sizes[size].stock <= 0}
                            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                              selectedSize === size
                                ? "bg-primary text-black font-medium"
                                : product.sizes[size].stock > 0
                                  ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        to={`/product/${product._id}`}
                        className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg text-sm font-medium transition-colors text-center flex-1"
                      >
                        Add to card
                      </Link>

                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={addingToCart[product._id] || !isInStock}
                        className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
                          isInStock
                            ? "bg-primary text-black hover:bg-primary/90"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                        aria-label="Quick add to cart"
                      >
                        {addingToCart[product._id] ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <ShoppingBag className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </section>
    </main>
  )
}

