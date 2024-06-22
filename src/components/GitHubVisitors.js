// @ts-nocheck
// src/GitHubVisitors.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  onSnapshot,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import Pagination from "./Pagination";
import ListView from "./ListView";
import TableView from "./TableView";
import { useMediaQuery } from "react-responsive";

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

const staticEmail = process.env.FROM_EMAIL;
const staticPassword = process.env.EMAIL_PASS;

const GitHubVisitors = () => {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [currentCollection, setCurrentCollection] = useState("Github Visitors");
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchVisitors = () => {
      const visitorsCollection = collection(db, currentCollection);
      const q = query(visitorsCollection);

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const visitorsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const sortedData = visitorsData?.sort(
          (a, b) => b.timestamp.seconds - a.timestamp.seconds
        );

        setVisitors(sortedData);
        setLoading(false);
      });

      return () => unsubscribe();
    };

    fetchVisitors();
  }, [currentCollection]);

  const deleteCollectionData = async () => {
    if (email === staticEmail && password === staticPassword) {
      setVisitors([]);
      setShowPopup(false);
      setPassword("");
      setEmail("");
      const visitorsCollection = collection(db, currentCollection);
      const snapshot = await getDocs(visitorsCollection);
      const batch = writeBatch(db);

      snapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    } else {
      alert("Invalid credentials");
      setShowPopup(false);
      setPassword("");
      setEmail("");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = visitors.slice(indexOfFirstItem, indexOfLastItem);
  const startingID = (currentPage - 1) * itemsPerPage + 1;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const emptyRows = itemsPerPage - currentItems.length;
  const fillEmptyRows = Array.from({ length: emptyRows }, (_, index) => (
    <tr key={`empty-${index}`} className="bg-[#252b32] text-center">
      {columns.map((col, colIndex) => (
        <td key={colIndex} className="px-4 py-2">
          <p className="text-transparent">Empty</p>
        </td>
      ))}
    </tr>
  ));

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  return (
    <div className="container mx-auto px-4 my-4 relative">
      <h1 className="text-2xl text-center font-bold mb-4 text-white">
        Visitors
      </h1>
      <div className="flex justify-center gap-4 mb-4 text-white">
        <h1
          className={`text-md font-bold cursor-pointer ${
            currentCollection === "Github Visitors"
              ? "border-b-2 border-b-green-600"
              : ""
          } px-4 py-1`}
          onClick={() => setCurrentCollection("Github Visitors")}
        >
          GitHub
        </h1>
        <h1
          className={`text-md font-bold cursor-pointer ${
            currentCollection === "Portfolio Visitors"
              ? "border-b-2 border-b-green-600"
              : ""
          } px-4 py-1`}
          onClick={() => setCurrentCollection("Portfolio Visitors")}
        >
          Portfolio
        </h1>
      </div>
      <div className="flex mb-4 text-white  justify-between items-center">
        <div className="flex gap-6">
          <p className=" bg-blue-500 text-white p-1 px-2  rounded">
            Username: {"santhosh-sivkumar"}
          </p>
          <p className=" bg-green-500 text-white p-1 px-2  rounded">
            Total Visitors: {visitors.length}
          </p>
        </div>
        {visitors.length > 0 && (
          <button
            className=" bg-red-500 text-white p-1 px-2  rounded"
            onClick={() => setShowPopup(true)}
          >
            Clear Data
          </button>
        )}
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Enter Credentials</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 p-2 border rounded w-full"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 p-2 border rounded w-full"
            />
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => {
                  setShowPopup(false);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={deleteCollectionData}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {isDesktopOrLaptop ? (
        <TableView
          columns={columns}
          loading={loading}
          currentItems={currentItems}
          startingID={startingID}
          fillEmptyRows={fillEmptyRows}
        />
      ) : (
        <ListView
          visitors={currentItems}
          loading={loading}
          startingID={startingID}
        />
      )}
      <Pagination
        totalItems={visitors.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default GitHubVisitors;
