import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    question: "How do I choose the right perfume?",
    answer:
      "Choosing the right perfume is personal. Consider your preferences in scents, try samples, and pay attention to how the fragrance evolves on your skin over time. Our detailed product descriptions and scent families can help guide your choice.",
  },
  {
    question:
      "What's the difference between Eau de Parfum and Eau de Toilette?",
    answer:
      "Eau de Parfum (EDP) has a higher concentration of fragrance oils (typically 15-20%) and lasts longer. Eau de Toilette (EDT) has a lower concentration (usually 5-15%) and is generally lighter and less expensive.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Shipping times vary depending on your location. Domestic orders typically arrive within 3-5 business days, while international orders may take 7-14 business days. You can track your order through your account or the link provided in your shipping confirmation email.",
  },
  {
    question: "Do you offer samples?",
    answer:
      "Yes, we offer samples of most of our fragrances. You can purchase individual samples or curated sample sets to try before committing to a full-size bottle.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for unopened, unused items in their original packaging. If you're unsatisfied with your purchase, please contact our customer service team to initiate a return.",
  },
];

const FAQItem = ({ item, isOpen, toggleOpen }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 px-6 text-left focus:outline-none"
        onClick={toggleOpen}
      >
        <span className="font-medium text-gray-900">{item.question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 px-6">
          <p className="text-gray-600">{item.answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto my-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {faqData.map((item, index) => (
          <FAQItem
            key={index}
            item={item}
            isOpen={openIndex === index}
            toggleOpen={() => toggleOpen(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
