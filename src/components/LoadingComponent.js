import React from "react";
import { motion } from "framer-motion"; // Importing framer-motion

const LoadingComponent = ({ columns, children }) => (
  <tbody className="border border-gray-300 bg-[#252b32]">
    <motion.tr
      className="text-center text-white"
      initial={{ opacity: 0, y: -20 }} // Initial state: invisible and slightly above
      animate={{ opacity: 1, y: 0 }} // Animate to full visibility and normal position
      transition={{ duration: 0.6 }} // Smooth transition
    >
      <motion.td
        colSpan={columns.length}
        className="py-4"
        initial={{ scale: 0.8, opacity: 0 }} // Start slightly smaller and invisible
        animate={{ scale: 1, opacity: 1 }} // Animate to full scale and visibility
        transition={{ duration: 0.6, delay: 0.3 }} // Slight delay for better visual effect
      >
        {children}
      </motion.td>
    </motion.tr>
  </tbody>
);

export default LoadingComponent;
