import ShippingReturns from "../components/ShippingReturns";

const ShippingReturnsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center py-8">
          Livraison & Retours
        </h1>
        <ShippingReturns />
      </div>
    </div>
  );
};

export default ShippingReturnsPage;
