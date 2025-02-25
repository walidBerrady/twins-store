import { useParams } from "react-router-dom";

function SizeCategoryPage() {
  const { slug } = useParams();

  // You can use the slug to determine which size category to display
  const getSizeFromSlug = (slug) => {
    switch (slug) {
      case "5ml-perfumes":
        return "5ml";
      case "10ml-perfumes":
        return "10ml";
      case "full-size-perfumes":
        return "Full Size";
      default:
        return "";
    }
  };

  const size = getSizeFromSlug(slug);

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8">{size} Perfumes</h1>
      {/* Add your product listing or other content here */}
    </div>
  );
}

export default SizeCategoryPage;
