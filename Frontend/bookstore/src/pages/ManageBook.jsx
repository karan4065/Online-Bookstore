import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminNavbar from "./AdminNavbar";

const ManageBook = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState("");

  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    title: "",
  });

  // Fetch Books
  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/book/get");
      const list = Array.isArray(res.data.books) ? res.data.books : [];
      setBooks(list);
      setFilteredBooks(list);
    } catch (err) {
      console.error("Error fetching books:", err);
      setBooks([]);
      setFilteredBooks([]);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // ✅ Search Filter
  useEffect(() => {
    const term = search.toLowerCase();
    const results = books.filter((book) =>
      book.name.toLowerCase().includes(term)
    );
    setFilteredBooks(results);
  }, [search, books]);

  // Delete Book
  const deleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await axios.delete(`http://localhost:3000/book/delete/${id}`);
      setBooks(books.filter((b) => b._id !== id));
      toast.success("Book deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Open Edit Modal
  const openEdit = (book) => {
    setEditingBook(book._id);
    setFormData({
      name: book.name,
      price: book.price,
      category: book.category,
      image: book.image,
      title: book.title,
    });
    document.getElementById("editModal").showModal();
  };

  // Update Book
  const updateBook = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:3000/book/update/${editingBook}`,
        formData
      );
      fetchBooks();
      document.getElementById("editModal").close();
      toast.success("Book Updated Successfully");
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col">
      <AdminNavbar />

      {/* ✅ Heading + Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-3 md:px-6 mt-6 gap-3">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Manage Books
        </h1>

        <input
          type="text"
          placeholder="Search Book by name..."
          className="w-full md:w-64 px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ✅ Responsive Table */}
      <div className="overflow-x-auto mt-6 px-2 md:px-6 pb-10">
        <table className="min-w-full border bg-white dark:bg-slate-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-200 dark:bg-slate-700">
            <tr>
              <th className="p-3 text-left text-sm md:text-base">Image</th>
              <th className="p-3 text-left text-sm md:text-base">Name</th>
              <th className="p-3 text-left text-sm md:text-base">Title</th>
              <th className="p-3 text-left text-sm md:text-base">Category</th>
              <th className="p-3 text-left text-sm md:text-base">Price (₹)</th>
              <th className="p-3 text-left text-sm md:text-base">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBooks.map((book) => (
              <tr
                key={book._id}
                className="border-b dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
              >
                <td className="p-3">
                  <img
                    src={book.image}
                    alt={book.name}
                    className="w-14 h-16 md:w-16 md:h-20 object-cover rounded-md"
                  />
                </td>

                <td className="p-3 text-sm md:text-base">{book.name}</td>
                <td className="p-3 text-sm md:text-base">{book.title}</td>
                <td className="p-3 text-sm md:text-base">{book.category}</td>
                <td className="p-3 text-sm md:text-base">₹{book.price}</td>

                <td className="p-3 flex flex-col md:flex-row gap-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm"
                    onClick={() => openEdit(book)}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm"
                    onClick={() => deleteBook(book._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredBooks.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="p-5 text-center text-gray-600 dark:text-gray-300"
                >
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Responsive Modal */}
      <dialog id="editModal" className="modal">
        <form
          onSubmit={updateBook}
          method="dialog"
          className="modal-box dark:bg-slate-800 dark:text-white w-11/12 max-w-lg"
        >
          <h3 className="font-bold text-xl md:text-2xl mb-4">Edit Book</h3>

          {/* Inputs */}
          <label className="block mb-1">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-3 dark:bg-black"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <label className="block mb-1">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-3 dark:bg-black"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <label className="block mb-1">Category</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-3 dark:bg-black"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />

          <label className="block mb-1">Price</label>
          <input
            type="number"
            className="w-full p-2 border rounded mb-3 dark:bg-black"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />

          <label className="block mb-1">Image URL</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-3 dark:bg-black"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => document.getElementById("editModal").close()}
              className="px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
            >
              Update
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default ManageBook;
