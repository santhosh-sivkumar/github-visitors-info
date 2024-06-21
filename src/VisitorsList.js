// @ts-nocheck
// src/VisitorsList.js
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import LoadingComponent from "./LoadingComponent";

const columns = [
  {
    header: "ID",
    accessor: (visitor, startingID, index) => startingID + index,
  },
  { header: "IP Address", accessor: (visitor) => visitor.ip },
  { header: "City", accessor: (visitor) => visitor.city },
  { header: "Region", accessor: (visitor) => visitor.region },
  { header: "Country", accessor: (visitor) => visitor.country_name },
  { header: "Postal Code", accessor: (visitor) => visitor.postal },
  { header: "Date & Time", accessor: (visitor) => visitor.dateTime },
];

const VisitorsList = () => {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchVisitors = () => {
      const visitorsCollection = collection(db, "visitors");
      const q = query(visitorsCollection);

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const visitorsData = [];
        snapshot.forEach((doc) => {
          visitorsData.push({ id: doc.id, ...doc.data() });
        });
        setVisitors(visitorsData);
        setLoading(false);
      });

      return () => unsubscribe();
    };

    fetchVisitors();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = visitors.slice(indexOfFirstItem, indexOfLastItem);

  const startingID = (currentPage - 1) * itemsPerPage + 1;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const emptyRows = itemsPerPage - currentItems.length;
  const fillEmptyRows = Array.from({ length: emptyRows }, (_, index) => (
    <tr key={`empty-${index}`} className="bg-white text-center ">
      {columns.map((col, colIndex) => (
        <td key={colIndex} className="px-4 py-2">
          <p className="text-white">Empty</p>
        </td>
      ))}
    </tr>
  ));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-bold mb-4 text-gray-800">
        Github Visitors
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto rounded-[0.3rem] w-full border-gray-300">
          <thead>
            <tr className="bg-gray-300 border border-gray-300">
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-4 py-2 text-gray-800 font-bold"
                  style={{ width: "150px" }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          {loading ? (
            <LoadingComponent columns={columns}>Loading...</LoadingComponent>
          ) : currentItems.length ? (
            <tbody
              className="border border-gray-300 "
              style={{ height: "500px" }}
            >
              {currentItems.map((visitor, index) => (
                <tr
                  key={visitor.id}
                  className="hover:bg-gray-200 border border-gray-300 text-center bg-gray-100 rounded-lg"
                >
                  {console.log("visitor : ", visitor)}
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-4 py-2">
                      {col.accessor(visitor, startingID, index)}
                    </td>
                  ))}
                </tr>
              ))}
              {fillEmptyRows}
            </tbody>
          ) : (
            <LoadingComponent columns={columns}>No data found</LoadingComponent>
          )}
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <ul className="flex space-x-2">
          {[...Array(Math.ceil(visitors.length / itemsPerPage)).keys()].map(
            (number) => (
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
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default VisitorsList;
