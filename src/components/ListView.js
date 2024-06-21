// src/ListView.js
import React from "react";

const ListView = ({ visitors, loading, startingID }) => {
  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {visitors.map((visitor, index) => (
        <div
          key={visitor.id}
          className="bg-gray-100 p-4 mb-4 rounded shadow-md"
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
        </div>
      ))}
    </div>
  );
};

export default ListView;
