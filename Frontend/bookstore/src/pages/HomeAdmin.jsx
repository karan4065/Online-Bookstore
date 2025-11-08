import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Footer from "../Components/Footer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function HomeAdmin() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalOrders: 0,
    pendingOrders: 0,
    revenue: 0,
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const booksRes = await axios.get("http://localhost:3000/book/countbooks");
        const totalBooks = booksRes.data.length;

        const ordersRes = await axios.get("http://localhost:3000/product/orders");
        const orders = ordersRes.data;

        const totalOrders = orders.length;

        const pendingOrders = orders.filter(
          (order) => order.payment === "Cash On Delivery"
        ).length;

        const revenue = orders.reduce((total, order) => {
          const price = Number(order.price) || 0;
          const qty = Number(order.quantity) || 1;
          return total + price * qty;
        }, 0);

        const merged = {};

        orders.forEach((order) => {
          const book = order.bookName;
          const price = Number(order.price) || 0;
          const qty = Number(order.quantity) || 1;

          if (!merged[book]) {
            merged[book] = {
              quantity: qty,
              totalPrice: price * qty,
            };
          } else {
            merged[book].quantity += qty;
            merged[book].totalPrice += price * qty;
          }
        });

        const chartLabels = Object.keys(merged);
        const chartQuantities = chartLabels.map((name) => merged[name].quantity);
        const chartPrices = chartLabels.map((name) => merged[name].totalPrice);

        setChartData({
          labels: chartLabels,
          datasets: [
            {
              label: "Quantity",
              data: chartQuantities,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgb(75, 192, 192)",
              borderWidth: 1,
              yAxisID: "y",
            },
            {
              label: "Total Price (₹)",
              data: chartPrices,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderColor: "rgb(255, 99, 132)",
              borderWidth: 1,
              yAxisID: "y1",
            },
          ],
        });

        setStats({
          totalBooks,
          totalOrders,
          pendingOrders,
          revenue,
        });
      } catch (error) {
        console.error("Error fetching stats:", error.response || error);
      }
    };

    fetchStats();
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          padding: 20,
          font: { size: 12 },
        },
      },
      title: {
        display: true,
        text: "Orders Analysis - Quantity vs Price",
        color: "rgb(156, 163, 175)",
        font: { size: 14 },
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        beginAtZero: true,
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        beginAtZero: true,
      },
      x: {
        ticks: {
          font: { size: 10 },
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white">

      <AdminNavbar />

      <main className="max-w-screen-2xl mx-auto px-4 md:px-10 py-6 md:py-10">

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Quick overview and shortcuts
          </p>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow hover:scale-[1.03] transition">
            <div className="text-sm text-gray-500 dark:text-gray-300">Total Books</div>
            <div className="text-xl md:text-2xl font-bold mt-2">{stats.totalBooks}+</div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow hover:scale-[1.03] transition">
            <div className="text-sm text-gray-500 dark:text-gray-300">Total Orders</div>
            <div className="text-xl md:text-2xl font-bold mt-2">{stats.totalOrders}+</div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow hover:scale-[1.03] transition">
            <div className="text-sm text-gray-500 dark:text-gray-300">Pending (COD)</div>
            <div className="text-xl md:text-2xl font-bold mt-2">{stats.pendingOrders}+</div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow hover:scale-[1.03] transition">
            <div className="text-sm text-gray-500 dark:text-gray-300">Revenue</div>
            <div className="text-xl md:text-2xl font-bold mt-2">₹{stats.revenue.toFixed(2)}</div>
          </div>
        </section>

        {/* Chart Section */}
        <section className="mb-8 p-4 md:p-8 bg-white dark:bg-slate-800 rounded-lg shadow">

          {/* Scrollable wrapper for small screens */}
          <div className="w-full overflow-x-auto">
            <div className="min-w-[300px] h-[350px] sm:h-[450px] md:h-[500px]">
              {chartData.labels.length === 0 ? (
                <p className="text-lg md:text-xl font-semibold text-gray-600 dark:text-gray-300 h-full flex items-center justify-center">
                  No orders yet
                </p>
              ) : (
                <Bar data={chartData} options={chartOptions} />
              )}
            </div>
          </div>

        </section>

        <div className="">
          <Footer />
        </div>

      </main>
    </div>
  );
}
