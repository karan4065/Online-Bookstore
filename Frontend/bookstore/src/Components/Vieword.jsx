import React, { useEffect, useState } from "react";

const Vieword = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("Orders")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50 dark:bg-slate-900 dark:text-white">
      <h1 className="text-3xl font-bold text-center mb-8 text-fuchsia-600">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">No orders found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="border p-6 rounded-lg shadow-md bg-white dark:bg-slate-800"
            >
              <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
                {order.bookName}
              </h2>
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Contact:</strong> {order.number}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
              <p><strong>Payment:</strong> {order.payment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Vieword;
