import React, { useEffect, useState } from "react";

const Neworder = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("LatestOrder"));
    if (orderData) {
      setOrder(orderData);
    }
  }, []);

  if (!order) {
    return <p className="text-center mt-10 text-xl  dark:bg-slate-800 dark:text-white">No order found.</p>;
  }

  return (
    <div className=" dark:bg-slate-800 dark:text-white max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Latest Order</h2>
      <p><strong>Name:</strong> {order.name}</p>
      <p><strong>Email:</strong> {order.email}</p>
      <p><strong>Contact:</strong> {order.number}</p>
      <p><strong>Address:</strong> {order.address}</p>
      <p><strong>Book Name:</strong> {order.bookName}</p>
      <p><strong>Quantity:</strong> {order.quantity}</p>
      <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
      <p><strong>Payment:</strong> {order.payment}</p>
    </div>
  );
};

export default Neworder;
