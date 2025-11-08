import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminNavbar from "./AdminNavbar";
import Footer from "../Components/Footer";
import { FaRupeeSign } from "react-icons/fa";

const Adminpage = () => {
  const [bookData, setBookData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    title: "",
  });

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookData.name || !bookData.price) {
      toast.error("Name and price are required");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3000/book/create", bookData);
      toast.success(res.data?.message || "Book created");
      setBookData({ name: "", price: "", category: "", image: "", title: "" });
    } catch (error) {
      toast.error("Failed to create book");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col">
      <AdminNavbar />

      <main className="flex-grow flex items-center justify-center py-10 px-4 md:px-10">
        <div className="bg-white dark:bg-slate-800 text-black dark:text-white shadow-lg rounded-2xl p-6 w-full max-w-6xl">

          <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
            Create New Book
          </h1>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="md:col-span-2 space-y-6 w-full"
            >
              <input
                name="name"
                placeholder="Book Name"
                value={bookData.name}
                onChange={handleChange}
                className="w-full border px-3 py-3 rounded-md dark:bg-slate-900 dark:border-gray-600"
              />

              <input
                name="title"
                placeholder="Title"
                value={bookData.title}
                onChange={handleChange}
                className="w-full border px-3 py-3 rounded-md dark:bg-slate-900 dark:border-gray-600"
              />

              <div className="flex flex-col md:flex-row gap-3">
                <input
                  name="price"
                  type="number"
                  placeholder="Price"
                  value={bookData.price}
                  onChange={handleChange}
                  className="w-full md:w-1/2 border px-3 py-3 rounded-md dark:bg-slate-900 dark:border-gray-600"
                />
                <input
                  name="category"
                  placeholder="Category"
                  value={bookData.category}
                  onChange={handleChange}
                  className="w-full md:w-1/2 border px-3 py-3 rounded-md dark:bg-slate-900 dark:border-gray-600"
                />
              </div>

              <input
                name="image"
                placeholder="Image URL"
                value={bookData.image}
                onChange={handleChange}
                className="w-full border px-3 py-3 rounded-md dark:bg-slate-900 dark:border-gray-600"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md font-semibold transition"
              >
                Create Book
              </button>
            </form>

            {/* PREVIEW */}
            <aside className="md:col-span-1 w-full">
              <h1 className="text-xl font-bold mb-4 text-center">Preview</h1>

              <div className="border p-4 rounded-md bg-gray-50 dark:bg-slate-900 dark:border-gray-600">

                <div className="h-56 w-full rounded-md overflow-hidden bg-white flex items-center justify-center border dark:border-gray-600">
                  {bookData.image ? (
                    <img
                      src={bookData.image}
                      alt="Preview"
                      className="object-contain h-full w-full"
                    />
                  ) : (
                    <div className="text-sm text-gray-400">
                      Image preview will appear here
                    </div>
                  )}
                </div>

                <div className="mt-4 space-y-1">
                  <div className="text-sm">
                    <span className="font-semibold">Name:</span>{" "}
                    {bookData.name || "—"}
                  </div>

                  <div className="text-sm">
                    <span className="font-semibold">Title:</span>{" "}
                    {bookData.title || "—"}
                  </div>

                  <div className="text-sm">
                    <span className="font-semibold">Category:</span>{" "}
                    {bookData.category || "—"}
                  </div>

                  <div className="text-sm flex items-center">
                    <span className="font-semibold mr-1">Price:</span>
                    {bookData.price ? (
                      <span className="inline-flex items-center">
                        <FaRupeeSign className="mr-1" /> {bookData.price}
                      </span>
                    ) : (
                      "—"
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Adminpage;
