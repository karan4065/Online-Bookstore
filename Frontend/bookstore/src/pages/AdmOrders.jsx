import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminNavbar from "./AdminNavbar";

export default function AdmOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/product/orders");
      const cancelReq = JSON.parse(localStorage.getItem("cancelRequests")) || [];

      // ✅ Merge cancel requests into order list
      const updatedOrders = res.data.map((order) => {
        const foundReq = cancelReq.find(
          (r) =>
            r.email === order.email &&
            r.bookName === order.bookName
        );
        return { ...order, cancelRequested: !!foundReq };
      });

      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders);
    } catch (err) {
      console.error("Fetch orders error:", err);
      toast.error("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Handle Search Filtering
  useEffect(() => {
    const term = search.toLowerCase();
    const result = orders.filter((order) =>
      order.bookName.toLowerCase().includes(term)
    );
    setFilteredOrders(result);
  }, [search, orders]);

  // ✅ Mark Completed
  const updateStatus = async (order) => {
    const id = order._id;
    const newStatus = "completed";

    const previous = [...orders];
    const updated = orders.map((o) =>
      o._id === id ? { ...o, status: newStatus } : o
    );

    setOrders(updated);

    try {
      await axios.patch(`http://localhost:3000/product/orders/${id}`, {
        status: newStatus,
      });
      toast.success("Order marked as completed");
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update status");
      setOrders(previous);
    }
  };

  // ✅ Accept Cancellation
  const acceptCancellation = async (order) => {
    if (!window.confirm("Accept cancellation request for this order?")) return;

    const id = order._id;
    const previous = [...orders];

    const remaining = orders.filter((o) => o._id !== id);
    setOrders(remaining);

    try {
      await axios.delete(`http://localhost:3000/product/orders/${id}`);

      const reqList = JSON.parse(localStorage.getItem("cancelRequests")) || [];
      const updatedReq = reqList.filter(
        (r) =>
          !(
            r.email === order.email &&
            r.orderDate === order.orderDate &&
            r.bookName === order.bookName
          )
      );
      localStorage.setItem("cancelRequests", JSON.stringify(updatedReq));

      toast.success("Cancellation accepted & order removed");
    } catch (err) {
      console.error("Cancel accept error:", err);
      toast.error("Failed to delete order");
      setOrders(previous);
    }
  };

  // ✅ Cancel Order
  const cancelOrder = async (order) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    const id = order._id;
    const previous = [...orders];
    const remaining = orders.filter((o) => o._id !== id);

    setOrders(remaining);

    try {
      await axios.delete(`http://localhost:3000/product/orders/${id}`);
      toast.success("Order cancelled");
    } catch (err) {
      console.error("Cancel order error:", err);
      toast.error("Failed to cancel order");
      setOrders(previous);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white">
      <AdminNavbar />

      <main className="max-w-8xl mx-auto p-6 pt-8">

        {/* ✅ Heading + Search Bar Container */}
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-2xl font-bold">All Orders</h1>

          {/* ✅ Search Input */}
          <input
            type="text"
            placeholder="Search book by name..."
            className="w-64 px-4 py-2 rounded-md border dark:bg-slate-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="p-6 bg-white dark:bg-slate-800 rounded shadow">
            Loading orders...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-6 bg-white dark:bg-slate-800 rounded shadow">
            No matching orders found.
          </div>
        ) : (
          <div className="space-y-8">
            {filteredOrders.map((order) => {
              const id = order._id;
              const total =
                Number(order.price || 0) * Number(order.quantity || 1);

              return (
                <div
                  key={id}
                  className="bg-white dark:bg-slate-800 rounded-lg shadow px-4 py-8 grid grid-cols-1 md:grid-cols-6 gap-4 items-center"
                >
                  <div>
                    <div className="font-semibold">{order.bookName}</div>
                    <div className="text-md text-gray-500 dark:text-gray-300">
                      {order.payment}
                    </div>
                  </div>

                  <div>
                    <div className="font-medium">Customer</div>
                    <div>{order.name}</div>
                  </div>

                  <div>
                    <div className="font-medium">Contact</div>
                    <div>{order.number}</div>
                  </div>

                  <div>
                    <div className="font-medium">Address</div>
                    <div className="truncate max-w-xs">{order.address}</div>
                  </div>

                  <div className="text-right md:text-left">
                    <div className="font-medium">Qty / Total</div>
                    <div>
                      {order.quantity} / ₹ {Number(total).toFixed(2)}
                    </div>
                  </div>

                  <div className="flex justify-end md:justify-center items-center space-x-3">

                    {order.cancelRequested ? (
                      <button
                        onClick={() => acceptCancellation(order)}
                        className="w-40 h-10 px-4 rounded text-sm font-semibold bg-red-600 text-white hover:bg-red-700"
                      >
                        Accept Cancellation
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => updateStatus(order)}
                          disabled={order.status === "completed"}
                          className={`w-32 h-10 px-4 rounded text-sm font-semibold ${
                            order.status === "completed"
                              ? "bg-green-600 text-white cursor-not-allowed opacity-60"
                              : "bg-blue-700 text-white hover:bg-blue-800"
                          }`}
                        >
                          {order.status === "completed"
                            ? "Completed"
                            : "Mark Completed"}
                        </button>

                        <button
                          onClick={() => cancelOrder(order)}
                          className="w-32 h-10 px-4 rounded text-sm font-semibold bg-red-500 text-white hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
