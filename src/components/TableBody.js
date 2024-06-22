// src/TableBody.js
import React from "react";

const TableBody = ({ currentItems, columns, startingID, fillEmptyRows }) => (
  <tbody className="border border-gray-300" style={{ height: "500px" }}>
    {currentItems.map((visitor, index) => (
      <tr
        key={visitor.id}
        className="hover:bg-green-900 border border-gray-300 text-center bg-[#252b32] rounded-lg h-[50px]"
      >
        {columns.map((col, colIndex) => (
          <td key={colIndex} className="px-4 py-1 text-white">
            {col.accessor(visitor, startingID, index)}
          </td>
        ))}
      </tr>
    ))}
    {fillEmptyRows}
  </tbody>
);

export default TableBody;
