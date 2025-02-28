"use client";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart, Star, ArrowLeft } from "lucide-react";
import useProductStore from "../store/useProductStore";

export default function SizeCategoryPage() {
  const { slug } = useParams();
  const { products, fetchProducts, loading, error } = useProductStore();

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

  const handleAddToCart = (product) => {
    // This would typically add the product to a cart state or make an API call
    console.log(`Added to cart: ${product.name} (${size})`);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <button
          className="mb-4 flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors py-1 px-2 rounded-md hover:bg-gray-100"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Collections
        </button>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {formattedSizeTitle} Perfumes
          </h1>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
            {products.length} products
          </span>
        </div>
        <p className="text-gray-500 mt-2">
          Discover our exquisite collection of {size.toLowerCase()} perfumes,
          crafted with the finest ingredients.
        </p>
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <div className="h-[240px] w-full bg-gray-200 animate-pulse" />
              <div className="p-4 pb-0">
                <div className="h-6 w-3/4 mb-2 bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
              </div>
              <div className="p-4 pt-2 flex justify-between">
                <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded" />
                <div className="h-10 w-1/3 bg-gray-200 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 p-6 text-center">
          <p className="text-red-600 font-medium">Error: {error}</p>
          <button
            className="mt-4 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            onClick={() => fetchProducts({ size })}
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No products found in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md"
                >
                  <div className="relative h-[240px] overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {product.isNew && (
                      <span className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-md">
                        New
                      </span>
                    )}
                  </div>

                  <div className="p-4 pb-0">
                    <h2 className="text-lg font-medium truncate">
                      {product.name}
                    </h2>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < (product.rating || 4)
                              ? "fill-primary text-primary"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">
                        (
                        {product.reviews || Math.floor(Math.random() * 50) + 10}
                        )
                      </span>
                    </div>
                  </div>

                  <div className="p-4 pt-2 flex justify-between items-center">
                    <div className="font-medium">
                      ${product.sizes[size]?.price.toFixed(2)}
                      {product.sizes[size]?.compareAtPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ${product.sizes[size]?.compareAtPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button
                      className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-black px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
