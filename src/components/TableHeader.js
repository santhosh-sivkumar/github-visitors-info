// src/TableHeader.js
import React from "react";

const TableHeader = ({ columns }) => (
  <thead>
    <tr className="bg-gray-800 border border-gray-300">
      {columns.map((col, index) => (
        <th
          key={index}
          className="px-4 py-2 text-white font-bold"
          style={{ width: "150px" }}
        >
          {col.header}
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHeader;
