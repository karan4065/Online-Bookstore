import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";

const OrderStatus = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cancelRequests")) || [];
    setRequests(stored);
  }, []);

const handleAccept = (index) => {
  const request = requests[index]; // request we are accepting

  // 1. Remove request from cancelRequests list
  const updatedRequests = [...requests];
  updatedRequests.splice(index, 1);
  setRequests(updatedRequests);
  localStorage.setItem("cancelRequests", JSON.stringify(updatedRequests));

  // 2. Remove the same order from main orderInfo
  const allOrders = JSON.parse(localStorage.getItem("orderInfo")) || [];
  const updatedOrders = allOrders.filter(
    (o) =>
      !(
        o.email === request.email &&
        o.orderDate === request.orderDate &&
        o.bookName === request.bookName
      )
  );

  localStorage.setItem("orderInfo", JSON.stringify(updatedOrders));
};


  return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900  text-gray-900 dark:text-white">
          <AdminNavbar />
      <h2 className="text-3xl mt-8 font-bold text-center   mb-6">Cancel Requests</h2>

      {/* No Requests */}
      {requests.length === 0 ? (
        <p className="text-center text-xl font-semibold text-gray-600">
          No Cancel Requests
        </p>
      ) : (
        <div className="space-y-4 px-4">
          {requests.map((req, index) => (
            <div
              key={index}
              className="p-4 bg-white dark:bg-slate-800 shadow rounded-lg border"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="font-semibold">User</p>
                  <p>{req.name}</p>
                </div>

                <div>
                  <p className="font-semibold">Book</p>
                  <p>{req.bookName}</p>
                </div>

                <div>
                  <p className="font-semibold">Price</p>
                  <p>₹ {Number(req.price).toFixed(2)}</p>
                </div>

                <div>
                  <p className="font-semibold">Requested On</p>
                  <p>{new Date(req.requestDate).toDateString()}</p>
                </div>
              </div>

              <div className=" flex justify-end">
                <button
                  onClick={() => handleAccept(index)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Accept Request
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
