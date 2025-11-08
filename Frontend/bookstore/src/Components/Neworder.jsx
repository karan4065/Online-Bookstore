import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Neworder = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [authUser] = useAuth();

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("orderInfo")) || [];

    if (authUser && authUser.email) {
      const userOrders = allOrders.filter((o) => o.email === authUser.email);
      setOrders(userOrders);
    } else {
      setOrders([]);
    }
  }, [authUser]);

  const handleForOrder = () => {
    navigate("/course");
  };

  const formatDate = (iso) => {
    const date = new Date(iso);
    return date.toDateString();
  };

  // ✅ UPDATED CANCEL FUNCTION WITH ADMIN CANCEL REQUEST
  const handleCancel = (indexToRemove) => {
    const orderToRemove = orders[indexToRemove];
    if (!orderToRemove) return;

    // ✅ 1. Create Cancel Request for Admin
    const cancelReq = {
      ...orderToRemove,
      cancelRequest: true,
      requestDate: new Date().toISOString(),
    };

    const adminRequests = JSON.parse(localStorage.getItem("cancelRequests")) || [];
    adminRequests.push(cancelReq);
    localStorage.setItem("cancelRequests", JSON.stringify(adminRequests));

    // ✅ 2. Remove from user orders (UI)
    const updatedUserOrders = orders.filter((_, i) => i !== indexToRemove);
    setOrders(updatedUserOrders);

    // ✅ 3. Remove from main order list
    const allOrders = JSON.parse(localStorage.getItem("orderInfo")) || [];
    const updatedAllOrders = allOrders.filter(
      (o) =>
        !(
          o.email === orderToRemove.email &&
          o.orderDate === orderToRemove.orderDate &&
          o.bookName === orderToRemove.bookName
        )
    );
    localStorage.setItem("orderInfo", JSON.stringify(updatedAllOrders));
  };

  // If no user
  if (!authUser) {
    return (
      <div className="flex flex-col items-center mt-60 justify-center py-20">
        <p className="text-center text-2xl font-semibold">Please login to view your orders</p>
        <button
          onClick={() => {
            const modal = document.getElementById("my_modal_3");
            if (modal && typeof modal.showModal === "function") modal.showModal();
            else navigate("/login");
          }}
          className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-md font-medium text-xl"
        >
          Login
        </button>
      </div>
    );
  }

  // If logged in but no orders
  if (authUser && !orders.length) {
    return (
      <div className="flex flex-col items-center mt-60 justify-center py-20">
        <p className="text-center text-2xl font-semibold">No Orders Yet !!</p>
        <button
          onClick={handleForOrder}
          className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-md font-medium text-xl"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl mt-20 font-bold text-center text-purple-700">Your Orders</h2>

      {orders.map((order, index) => {
        const total = order.price * order.quantity;

        return (
          <div
            key={index}
            className="max-w-6xl mx-auto mt-8 p-4 border dark:bg-slate-900 dark:text-white bg-white shadow-lg rounded-xl"
          >
            <div className="grid grid-cols-5 font-bold bg-cyan-500 text-white px-4 py-2 rounded-t">
              <div className="col-span-2">Product</div>
              <div className="text-center">Quantity</div>
              <div className="text-center">Price</div>
              <div className="text-center">Total</div>
            </div>

            <div className="grid grid-cols-5 items-center px-4 py-4 border-b">
              <div className="col-span-2 flex gap-4">
                <img
                  src={order.image || "https://via.placeholder.com/80x100?text=Book"}
                  alt={order.bookName}
                  className="w-20 h-24 object-cover border"
                />
                <p>{order.bookName}</p>
              </div>

              <div className="text-center">
                <input
                  type="number"
                  readOnly
                  value={order.quantity}
                  className="w-10 text-center dark:text-black border rounded"
                />
              </div>

              <div className="text-center">₹{Number(order.price).toFixed(2)}</div>
              <div className="text-center">₹{Number(total).toFixed(2)}</div>
            </div>

            <div className="mt-2 pt-2">
              <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-400">
                Shipping Timeline
              </h3>
              <ul className="text-sm space-y-1">
                <li><strong>Order Date: </strong> {formatDate(order.orderDate)}</li>
                <li><strong>Expected Delivery: </strong> {formatDate(order.estimatedDelivery)}</li>
                <li><strong>Shipping Method: </strong> Standard Delivery</li>
              </ul>
              <p className="text-sm text-center text-lime-700">Shipped • Expected in 5 days</p>
            </div>

            <div className="mt-2 border-t pt-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-400">
                Customer Info
              </h3>
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Contact:</strong> {order.number}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Payment:</strong> {order.payment}</p>
            </div>

            <div className="flex justify-center md:justify-end gap-6 mt-6">
              <button
                onClick={() => handleCancel(index)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancel Order
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Neworder;
