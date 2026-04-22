import React, { useState, useRef, useEffect } from 'react';

const Collapsible = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Calculate height of the content when it changes
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border rounded-lg shadow-sm mb-4">
      {/* Header/Trigger */}
      <button
        className="flex justify-between items-center w-full p-4 font-semibold text-left bg-gray-100 hover:bg-gray-200 transition duration-300 rounded-t-lg"
        onClick={toggleExpansion}
        aria-expanded={isExpanded}
      >
        <span>{title}</span>
        {/* Chevron Icon (rotate based on state) */}
        <svg
          className={`w-4 h-4 transform transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : 'rotate-0'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {/* Collapsible Content */}
      <div
        style={{
          maxHeight: isExpanded ? `${contentHeight}px` : '0',
        }}
        className="overflow-hidden transition-max-height duration-500 ease-in-out"
      >
        <div ref={contentRef} className="p-4 bg-white border-t border-gray-200">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Collapsible;
