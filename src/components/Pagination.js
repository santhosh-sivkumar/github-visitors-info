// src/Pagination.js
import React from "react";

const Pagination = ({ totalItems, itemsPerPage, currentPage, paginate }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-center mt-4">
      <ul className="flex space-x-2">
        {[...Array(totalPages).keys()].map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === number + 1
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {number + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
