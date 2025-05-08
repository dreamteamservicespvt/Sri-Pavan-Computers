
import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="flex justify-between items-center w-full py-4 text-left font-medium text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <svg
          className={`w-5 h-5 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen
            ? 'max-h-screen opacity-100 pb-4'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

export default FAQItem;
