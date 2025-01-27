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
import { motion } from "framer-motion";

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

const staticEmail = process.env.REACT_APP_STATIC_EMAIL;
const staticPassword = process.env.REACT_APP_STATIC_PASSWORD;

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
      const visitorsCollection = collection(db, currentCollection);
      const snapshot = await getDocs(visitorsCollection);
      const batch = writeBatch(db);

      snapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    } else {
      alert("Invalid credentials : Access Denied");
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
      <motion.h1
        className="text-4xl text-center font-bold mb-8 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Visitors
      </motion.h1>

      <motion.div
        className="flex flex-col justify-center items-center w-full gap-4 mb-4 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-4">
          <h1
            className={`text-md font-bold cursor-pointer ${
              currentCollection === "Github Visitors"
                ? "border-b-2 border-b-green-600"
                : ""
            } px-4 py-1`}
            onClick={() => {
              setPassword("");
              setEmail("");
              setCurrentCollection("Github Visitors");
            }}
          >
            GitHub
          </h1>
          <h1
            className={`text-md font-bold cursor-pointer ${
              currentCollection === "Portfolio Visitors"
                ? "border-b-2 border-b-green-600"
                : ""
            } px-4 py-1`}
            onClick={() => {
              setPassword("");
              setEmail("");
              setCurrentCollection("Portfolio Visitors");
            }}
          >
            Portfolio
          </h1>
        </div>
      </motion.div>

      <motion.div
        className="flex mb-4 text-white justify-between items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-6">
          <p className="bg-green-500 text-white p-1 px-2 rounded">
            Total: {visitors.length}
          </p>
        </div>
        {visitors.length > 0 && (
          <button
            className="bg-red-500 text-white p-1 px-2 rounded"
            onClick={() => setShowPopup(true)}
          >
            Clear Data
          </button>
        )}
      </motion.div>

      {showPopup && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white p-8 rounded shadow-md"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
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
                onClick={() => {
                  setShowPopup(false);
                  setPassword("");
                  setEmail("");
                  deleteCollectionData();
                }}
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {isDesktopOrLaptop ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <TableView
            columns={columns}
            loading={loading}
            currentItems={currentItems}
            startingID={startingID}
            fillEmptyRows={fillEmptyRows}
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ListView
            visitors={currentItems}
            loading={loading}
            startingID={startingID}
          />
        </motion.div>
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
