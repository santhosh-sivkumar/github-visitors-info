// src/ListView.js
import React from "react";
import { motion } from "framer-motion";

const ListView = ({ visitors, loading, startingID }) => {
  if (loading) {
    return (
      <motion.div
        className="text-center py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </motion.div>
    );
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <div>
      {visitors.map((visitor, index) => (
        <motion.div
          key={visitor.id}
          className="bg-[#252b32] p-4 mb-4 rounded shadow-md text-white hover:bg-green-900"
          custom={index}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{
            scale: 1.02,
            boxShadow: "0px 8px 15px rgba(0, 255, 127, 0.2)",
          }}
        >
          <p>
            <strong>ID:</strong> {startingID + index}
          </p>
          <p>
            <strong>IP Address:</strong> {visitor.ip}
          </p>
          <p>
            <strong>City:</strong> {visitor.city}
          </p>
          <p>
            <strong>Region:</strong> {visitor.region}
          </p>
          <p>
            <strong>Country:</strong> {visitor.country_name}
          </p>
          <p>
            <strong>Postal Code:</strong> {visitor.postal}
          </p>
          <p>
            <strong>Date & Time:</strong> {visitor.dateTime}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default ListView;
