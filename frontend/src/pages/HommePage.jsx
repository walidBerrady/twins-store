"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, Loader2 } from "lucide-react";
import useProductStore from "../store/useProductStore";
import { useUserStore } from "../store/useUserStore";
import toast from "react-hot-toast";
import { useCartStore } from "../store/useCartStore";

function HommePage() {
  const { addToCart } = useCartStore();
  const { user } = useUserStore();
  const { products, fetchProducts, loading, error } = useProductStore();
  const [selectedSizes, setSelectedSizes] = useState({});
  const [addingToCart, setAddingToCart] = useState({});
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  // Fetch products only when component mounts
  useEffect(() => {
    fetchProducts({ category: "Homme" });
  }, [fetchProducts]);

  // Initialize selected sizes in a separate effect that runs when products change
  useEffect(() => {
    if (products.length > 0) {
      const initialSizes = {};
      products.forEach((product) => {
        // Only set initial size if we haven't already selected one
        if (!selectedSizes[product._id]) {
          const sizes = Object.keys(product.sizes || {});
          if (sizes.length > 0) {
            initialSizes[product._id] = sizes[0];
          }
        }
      });

      // Only update state if we have new sizes to set
      if (Object.keys(initialSizes).length > 0) {
        setSelectedSizes((prev) => ({
          ...prev,
          ...initialSizes,
        }));
      }
    }
  }, [products, selectedSizes]);

  const toggleDescription = (productId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  const isProductInStock = (product, size) => {
    return product.sizes?.[size]?.stock > 0;
  };

  const handleAddToCart = (product) => {
    if (!user) {
      toast.error("Please log in to add items to your cart.");
    } else {
      const selectedSize =
        selectedSizes[product._id] || Object.keys(product.sizes)[0];

      // Only allow adding to cart if the selected size is in stock
      if (!isProductInStock(product, selectedSize)) {
        return;
      }

      setAddingToCart((prev) => ({ ...prev, [product._id]: true }));

      // add to cart
      addToCart(product);

      // Simulate a brief loading state
      setTimeout(() => {
        setAddingToCart((prev) => ({ ...prev, [product._id]: false }));
      }, 600);
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Homme Perfumes
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our exquisite collection of men fragrances, crafted with
            the finest ingredients to express your unique personality.
          </p>
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
          {products.map((product) => {
            const selectedSize =
              selectedSizes[product._id] ||
              Object.keys(product.sizes || {})[0] ||
              "5ml";
            const currentPrice = product.sizes?.[selectedSize]?.price;
            const isInStock = isProductInStock(product, selectedSize);

            return (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                <div className="relative">
                  <img
                    src={
                      product.image || "/placeholder.svg?height=256&width=256"
                    }
                    alt={product.name}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=256&width=256";
                      e.target.alt = "Product image unavailable";
                    }}
                  />
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                    {product.name}
                  </h2>
                  <div className="mb-3">
                    <p
                      className={`text-gray-600 text-sm ${
                        expandedDescriptions[product._id] ? "" : "line-clamp-2"
                      }`}
                    >
                      {product.description}
                    </p>
                    {product.description && product.description.length > 60 && (
                      <button
                        onClick={() => toggleDescription(product._id)}
                        className="text-primary text-xs font-medium mt-1 hover:underline focus:outline-none"
                      >
                        {expandedDescriptions[product._id]
                          ? "Read Less"
                          : "Read More"}
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <p className="text-gray-900 font-bold">
                      ${currentPrice?.toFixed(2) || "N/A"}
                      <span className="text-xs text-gray-500 font-normal ml-1">
                        / {selectedSize}
                      </span>
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

                  <div className="flex items-center">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={addingToCart[product._id] || !isInStock}
                      className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition-colors ${
                        isInStock
                          ? "bg-primary text-black hover:bg-primary/90"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {addingToCart[product._id] ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <ShoppingBag className="w-4 h-4" />
                      )}
                      <span>
                        {addingToCart[product._id]
                          ? "Adding..."
                          : "Add to Cart"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HommePage;
