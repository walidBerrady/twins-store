import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Home() {
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
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
          Featured Fragrances
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="group bg-white rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="p-4">
                <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                  <img
                    src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=300&auto=format&fit=crop"
                    alt={`Featured Perfume ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold mb-1 text-gray-900">
                  Signature Scent {i + 1}
                </h3>
                <p className="text-sm text-gray-600 mb-2">From $89.99</p>
                <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-900 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
