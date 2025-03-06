"use client";

import { useState } from "react";

const ExpandableDescription = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-3">
      <p
        className={`text-gray-600 text-sm ${isExpanded ? "" : "line-clamp-2"}`}
      >
        {description}
      </p>
      {description && description.length > 60 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary text-xs font-medium mt-1 hover:underline focus:outline-none"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default ExpandableDescription;
