// src/VisitorsList.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Pagination from "./Pagination";
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
        const visitorsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // @ts-ignore
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
    <tr key={`empty-${index}`} className="bg-white text-center">
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
      <p className="text-start mb-4 text-gray-600">
        Available Data: {visitors.length}
      </p>
      <div className="overflow-x-auto">
        <table className="table-auto rounded-[0.3rem] w-full border-gray-300">
          <TableHeader columns={columns} />
          {loading ? (
            <LoadingComponent columns={columns}>Loading...</LoadingComponent>
          ) : currentItems.length ? (
            <TableBody
              currentItems={currentItems}
              columns={columns}
              startingID={startingID}
              fillEmptyRows={fillEmptyRows}
            />
          ) : (
            <LoadingComponent columns={columns}>No data found</LoadingComponent>
          )}
        </table>
      </div>
      <Pagination
        totalItems={visitors.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default VisitorsList;
