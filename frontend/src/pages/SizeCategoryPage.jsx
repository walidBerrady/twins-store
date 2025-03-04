"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  Star,
  ArrowLeft,
  Minus,
  Plus,
  Loader2,
} from "lucide-react";
import useProductStore from "../store/useProductStore";

export default function SizeCategoryPage() {
  const { slug } = useParams();
  const { products, fetchProducts, loading, error } = useProductStore();
  const [quantities, setQuantities] = useState({});
  const [addingToCart, setAddingToCart] = useState({});

  // Convert slug to the corresponding size
  const getSizeFromSlug = (slug) => {
    switch (slug) {
      case "5ml-perfumes":
        return "5ml";
      case "10ml-perfumes":
        return "10ml";
      case "full-size-perfumes":
        return "Full";
      default:
        return "";
    }
  };

  const size = getSizeFromSlug(slug);
  const formattedSizeTitle =
    size === "Full" ? "Full Size" : `${size} Travel Size`;

  useEffect(() => {
    if (size) {
      fetchProducts({ size });
    }
  }, [size, fetchProducts]);

  const handleQuantityChange = (productId, change) => {
    setQuantities((prev) => {
      const newQuantity = Math.max(1, (prev[productId] || 1) + change);
      return { ...prev, [productId]: newQuantity };
    });
  };

  const handleAddToCart = (product) => {
    // Show loading state
    setAddingToCart((prev) => ({ ...prev, [product._id]: true }));

    console.log("Added to cart:", {
      productId: product._id,
      name: product.name,
      quantity: quantities[product._id] || 1,
      size: size,
    });

    // Simulate a brief loading state
    setTimeout(() => {
      setAddingToCart((prev) => ({ ...prev, [product._id]: false }));
    }, 600);
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <button
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors py-2 px-3 rounded-md hover:bg-white hover:shadow-sm"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Collections
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {formattedSizeTitle} Perfumes
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our exquisite collection of {size.toLowerCase()} perfumes,
            crafted with the finest ingredients to express your unique
            personality.
          </p>
          {!loading && !error && (
            <span className="inline-flex items-center px-3 py-1 mt-4 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
              {products.length} products
            </span>
          )}
        </div>

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
                  We couldn't load the products. Please try again later. Error:{" "}
                  {error}
                </p>
                <button
                  className="mt-2 px-4 py-2 bg-white border border-red-300 rounded-md hover:bg-red-50 transition-colors text-red-700 text-sm font-medium"
                  onClick={() => fetchProducts({ size })}
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No perfumes found in this category.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg?height=256&width=256"}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=256&width=256";
                    e.target.alt = "Product image unavailable";
                  }}
                />
                <button
                  className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>

                <div className="absolute bottom-3 left-3 flex items-center bg-white bg-opacity-90 px-2 py-1 rounded-full">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (product.rating || 4)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium ml-1">
                    {product.reviews || Math.floor(Math.random() * 50) + 10}
                  </span>
                </div>

                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-primary text-black text-xs font-bold px-2 py-1 rounded-md">
                    New
                  </span>
                )}
              </div>

              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description ||
                    "A luxurious fragrance with unique character and lasting impression."}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-900 font-bold">
                    ${product.sizes[size]?.price.toFixed(2)}
                    {product.sizes[size]?.compareAtPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${product.sizes[size]?.compareAtPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="text-xs text-gray-500 font-normal ml-1">
                      / {size}
                    </span>
                  </p>

                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    In Stock
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(product._id, -1)}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 text-gray-800 font-medium">
                      {quantities[product._id] || 1}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(product._id, 1)}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={addingToCart[product._id]}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium bg-primary text-black hover:bg-primary/90 transition-colors"
                  >
                    {addingToCart[product._id] ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ShoppingBag className="w-4 h-4" />
                    )}
                    <span>
                      {addingToCart[product._id] ? "Adding..." : "Add to Cart"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
