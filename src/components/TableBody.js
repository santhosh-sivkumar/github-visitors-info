// src/TableBody.js
import React from "react";
import { motion } from "framer-motion";

const TableBody = ({ currentItems, columns, startingID, fillEmptyRows }) => {
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <tbody className="border border-gray-300" style={{ height: "500px" }}>
      {currentItems.map((visitor, index) => (
        <motion.tr
          key={visitor.id}
          className="hover:bg-green-900 border border-gray-300 text-center bg-[#252b32] rounded-lg h-[50px]"
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          custom={index}
          whileHover={{
            scale: 1.02,
            boxShadow: "0px 8px 15px rgba(0, 255, 127, 0.2)",
          }}
        >
          {columns.map((col, colIndex) => (
            <td key={colIndex} className="px-4 py-1 text-white">
              {col.accessor(visitor, startingID, index)}
            </td>
          ))}
        </motion.tr>
      ))}
      {fillEmptyRows}
    </tbody>
  );
};

export default TableBody;
