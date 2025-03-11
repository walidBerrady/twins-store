import { Link } from "react-router-dom";
import { ArrowRight, Star, ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import useProductStore from "../store/useProductStore";

export default function Home() {
  const { featuredProducts, fetchFeaturedProducts } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts(); 
  }, [fetchFeaturedProducts]);

  const categories = [
    {
      size: "5ml",
      description: "Perfect for trying new scents",
      slug: "5ml-perfumes",
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=400&auto=format&fit=crop",
    },
    {
      size: "10ml",
      description: "Ideal for your collection",
      slug: "10ml-perfumes",
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=400&auto=format&fit=crop",
    },
    {
      size: "Full Size",
      description: "Complete luxury experience",
      slug: "full-size-perfumes",
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=400&auto=format&fit=crop",
    },
  ];

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
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            TWINS FRAGRANCE
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Discover Your Signature Scent
          </p>
          <button
            onClick={() =>
              document
                .getElementById("collections")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-6 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-md border border-white/20 transition-colors"
          >
            Explore Collection
          </button>
        </div>
      </section>

      {/* Size Categories */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
          Shop by Size
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              to={`/shop/${category.slug}`}
              key={category.size}
              className="group bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {category.size}
                </h3>
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
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
            Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                type: "Homme",
                description: "Masculine and sophisticated fragrances",
                image:
                  "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=600&auto=format&fit=crop",
              },
              {
                type: "Femme",
                description: "Elegant and enchanting perfumes",
                image:
                  "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop",
              },
            ].map((collection) => (
              <Link
                to={`/${collection.type.toLowerCase()}`}
                key={collection.type}
                className="group block"
              >
                <div className="relative h-[400px] overflow-hidden rounded-lg">
                  <img
                    src={collection.image || "/placeholder.svg"}
                    alt={`${collection.type} Collection`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                    <h3 className="text-3xl font-bold mb-2">
                      {collection.type}
                    </h3>
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
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Best Seller Fragrances
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our most popular and highly rated fragrances loved by customers
            worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
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
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=256&width=256";
                      e.target.alt = "Product image unavailable";
                    }}
                  />

                  {product.rating && (
                    <div className="absolute bottom-3 left-3 flex items-center bg-white bg-opacity-90 px-2 py-1 rounded-full">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
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
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    From ${product.sizes["5ml"]?.price?.toFixed(2) || "N/A"}
                  </p>

                  <div className="flex gap-2">
                    <Link
                      href={`/product/${product._id}`}
                      className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg text-sm font-medium transition-colors text-center"
                    >
                      View Details
                    </Link>

                    <button
                      className="p-2 rounded-lg bg-primary text-black hover:bg-primary/90 transition-colors"
                      aria-label="Quick add to cart"
                    >
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No featured products available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
