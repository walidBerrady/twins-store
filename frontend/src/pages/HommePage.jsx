import { useEffect } from "react";
import useProductStore from "../store/useProductStore";

function FemmePage() {
  const { products, fetchProducts, loading, error } = useProductStore();

  useEffect(() => {
    fetchProducts({ category: "Femme" }); // Fetch Femme products
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8">Femme Perfumes</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded-lg shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-800 font-bold mt-1">
              From ${product.sizes?.["5ml"]?.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FemmePage;
