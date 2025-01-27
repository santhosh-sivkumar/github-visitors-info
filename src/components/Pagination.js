import React from "react";
import { motion } from "framer-motion"; // Importing framer-motion

const Pagination = ({ totalItems, itemsPerPage, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      <ul className="flex space-x-2">
        {pageNumbers.map((number) => (
          <motion.li
            key={number}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }} // Add smooth fade-in animation for page numbers
          >
            <button
              onClick={() => {
                paginate(number);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`px-3 py-1 rounded-md transform transition-all ${
                currentPage === number
                  ? "bg-gray-200 text-gray-800 scale-110"
                  : "bg-gray-800 text-white hover:scale-105"
              }`}
            >
              {number}
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
