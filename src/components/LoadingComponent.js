// src/LoadingComponent.js
import React from "react";

const LoadingComponent = ({ columns, children }) => (
  <tbody>
    <tr className="text-center">
      <td colSpan={columns.length} className="py-4">
        {children}
      </td>
    </tr>
  </tbody>
);

export default LoadingComponent;
