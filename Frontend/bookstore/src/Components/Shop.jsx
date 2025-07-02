import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
 

function Shop() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const item = location.state?.item;
  const { register, handleSubmit } = useForm();
  const [authUser] = useAuth();

  const [order, setOrder] = useState(false);
  const [book, setBook] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.state?.orderNow) {
      setOrder(true);
      setBook(false);
    }
  }, []);
  

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const orderedBookName = item?.name || "";

  const handleCart = () => {
    if (!authUser) {
      toast.error("Please login to add items to cart.");
      return;
    }
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find((i) => i.name === item.name && i.title === item.title);

    if (exists) {
      toast.error("Item is already in cart!");
      return;
    }
  
    cart.push({ ...item, quantity });
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Item added to cart!");
  };
  
  
  
  const handleOrder = () => {
    if (!authUser) {
      toast.error("Login required to order.");
      return;
    }
    setOrder(true);
    setBook(false);
  };
  
  const returntoShop = () => {
    setOrder(false);
    setBook(true);
  }

  const onSubmit = async (data) => {
    const orderInfo = {
      name: data.name,
      email: data.email,
      address: data.address,
      number: data.number,
      bookName:data.bookName,
      payment: data.payment,
      quantity: quantity,
      totalPrice: item.price * quantity,
    };

    try {
      const res = await axios.post("https://mainbook-3.onrender.com/product/order", orderInfo);
      if (res.data) {
        toast.success("Order Placed Successfully !!");
        navigate(from, { replace: true });
      }
      localStorage.setItem("Orders", JSON.stringify(res.data.user));
    } catch (err) {
      toast.error("Something went wrong !!");
      navigate(from, { replace: true });
      console.log(err);
    }
  };

  
  return (
    <div className="container mx-auto p-6 flex justify-center items-center min-h-screen">
      {book && (
        <div>
          <div className="text-center">
            <h2 className="md:text-3xl md:mt-8 mt-12 text-2xl md:mb-4">
              Your next <span className="text-red-500">adventure</span> is just a click away.{" "}
              <span className="text-teal-300">Order now!!</span>
            </h2>
            <h5 className="text-2xl text-center md:mb-4 font-semibold text-cyan-500">
              Your Product :-
            </h5>
          </div>

          {item && (
            <div className="flex flex-col justify-center mt-4 md:mt-2 md:mb-12 items-center">
              <div className="relative border md:h-auto w-full mt-2 md:mt-8 bg-white flex flex-wrap shadow-lg rounded-lg overflow-hidden">
                <div className="flex h-full">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full md:h-72 h-64 object-cover"
                  />
                </div>

                <div className="md:flex">
                  <div className="flex flex-col md:gap-4 p-4 md:mt-4">
                    <h2 className="text-gray-900 text-2xl md:mb-12 font-semibold">{item.name}</h2>
                    <p className="text-black text-xl md:mt-4">{item.title}</p>

                    {/* Quantity Selector and Total Price */}
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-4 md:mt-12">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={decreaseQty}
                          className="bg-gray-300 px-3 py-1 rounded-md font-bold text-xl hover:bg-gray-400"
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold text-purple-600">
                          ₹{item.price}
                        </span>
                        <button
                          onClick={increaseQty}
                          className="bg-gray-300 px-3 py-1 rounded-md font-bold text-xl hover:bg-gray-400"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-lg text-gray-900 font-semibold">
                        Total:{" "}
                        <b className="text-emerald-600">₹{item.price * quantity}</b>{" "}
                        <span className="text-sm text-gray-600">(x {quantity})</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2 flex md:absolute md:right-2 md:flex-col space-x-4 md:space-x-0 justify-center md:mt-8">
                    <button
                      onClick={handleOrder}
                      className="bg-pink-500 h-12 w-40 text-white px-6 py-2 md:mt-8 mt-0 rounded-md text-lg font-semibold hover:bg-pink-600 active:scale-105 transition duration-300"
                    >
                      Order Book
                    </button>
                    <button
                      onClick={handleCart}
                      className="bg-blue-500 h-12 w-40 md:mt-20 text-white px-6 py-2 mt-0 rounded-md text-lg font-semibold hover:bg-blue-600 active:scale-105 transition duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center text-xl md:mt-8 mt-4 font-semibold px-2 py-2">
                <h1>
                  A reader lives a thousand lives before he dies. The man who never reads lives only
                  one
                </h1>
              </div>
            </div>
          )}
        </div>
      )}

{order && (
  <div className="max-w-5xl w-full bg-white dark:bg-slate-900 dark:border mt-8 border-white p-8 rounded-2xl shadow-2xl">
    <h1 className="text-4xl font-bold text-center mb-10 text-fuchsia-500 dark:text-yellow-400">
      Order Summary
    </h1>

    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left Column - Name, Email, Contact, Book Name */}
      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-lg font-medium mb-1 text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            placeholder="Your Name"
            {...register("name")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-lg font-medium mb-1 text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            placeholder="Your Email"
            {...register("email")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Contact */}
        <div>
          <label className="block text-lg font-medium mb-1 text-gray-700 dark:text-gray-300">
            Contact Number
          </label>
          <input
            type="text"
            placeholder="Your Contact Number"
            {...register("number")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Book Name (readonly) */}
        <div>
          <label className="block text-lg font-medium mb-1 text-gray-700 dark:text-gray-300">
            Book Name
          </label>
          <input
            type="text"
            value={orderedBookName}
            readOnly
            {...register("bookName")}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-black"
          />
        </div>
      </div>

      {/* Right Column - Address, Payment, Buttons */}
      <div className="space-y-6">
        {/* Address */}
        <div>
          <label className="block text-lg font-medium mb-1 text-gray-700 dark:text-gray-300">
            Address
          </label>
          <textarea
            rows="5"
            placeholder="Your Address"
            {...register("address")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-lg font-medium mb-1 text-gray-700 dark:text-gray-300">
            Payment Method
          </label>
          <select
            defaultValue=""
            {...register("payment", { required: true })}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select Payment Method
            </option>
            <option value="Cash On Delivery">Cash On Delivery</option>
            <option value="UPI Payment">UPI Payment</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg text-lg font-semibold transition-all"
          >
            Confirm Order
          </button>
          <button
            type="button"
            onClick={returntoShop}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg text-lg font-semibold transition-all"
          >
            Back to Shop
          </button>
        </div>
      </div>
    </form>
  </div>
)}
    </div>
  );
}

export default Shop;
