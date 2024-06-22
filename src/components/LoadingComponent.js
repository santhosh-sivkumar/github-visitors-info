// src/LoadingComponent.js
import React from "react";

const LoadingComponent = ({ columns, children }) => (
  <tbody className="border border-gray-300 bg-[#252b32]">
    <tr className="text-center text-white">
      <td colSpan={columns.length} className="py-4">
        {children}
      </td>
    </tr>
  </tbody>
);

export default LoadingComponent;
