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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const [order, setOrder] = useState(false);
  const [book, setBook] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.state?.orderNow) {
      setOrder(true);
      setBook(false);
    }
    console.log("authUser -->", authUser);
  }, []);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const orderedBookName = item?.name || "";
  const orderQuantity = item?.quantity || "";
  const orderprice = item?.price || "";
  const orderEmail = authUser?.email || "";
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

  // --- Fixed paymentHandler: correct amount, robust error handling, fallback key ---
  const paymentHandler = async (data) => {
    if (!authUser) {
      toast.error("Login required for UPI payment.");
      return;
    }

    if (!item || !item.price) {
      toast.error("Invalid product data.");
      return;
    }

    // use local quantity state
    const amountInPaise = Math.round(item.price * quantity * 100); // integer paisa
    const currency = "INR";

    try {
      const response = await fetch("http://localhost:3000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency,
          receipt: `receipt_order_${Date.now()}`,
          // optional metadata your backend might expect
          userEmail: authUser?.email,
          userId: authUser?._id,
          bookId: item?._id,
          notes: { bookName: item?.name, quantity },
        }),
      });

      let orderResp;
      try {
        orderResp = await response.json();
      } catch (e) {
        orderResp = null;
      }

      if (!response.ok) {
        const msg = (orderResp && orderResp.message) || `Order init failed (${response.status})`;
        toast.error(msg);
        console.error("Order init error:", orderResp || response.statusText);
        return;
      }

      console.log("order", orderResp);

      // prepare orderInfo to save after successful payment
      const orderInfo = {
      name: data.name || authUser?.name || "Anonymous User",
      email: data.email || authUser?.email || "unknown@example.com",
      address: data.address,
      number: data.number,
      bookName: item.name,
      image: item.image,
      payment: data.payment,
      price: item.price,
      quantity: quantity,
      totalPrice: item.price * quantity,
      orderDate: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      
    };

      // Razorpay key fallback: backend may return key or key_id; if not, use env or test key
      const razorpayKey =
        (orderResp && (orderResp.key || orderResp.key_id)) ||
        process.env.REACT_APP_RAZORPAY_KEY ||
        "rzp_test_odYlXvbgATLRUR"; // replace with your test key in .env if needed

      const options = {
        key: razorpayKey,
        amount: orderResp.amount || amountInPaise,
        currency,
        name: "Karan's Book Store",
        description: `Order for ${item.name}`,
        image:
          "https://t4.ftcdn.net/jpg/02/11/07/81/360_F_211078110_mttxEdu3gsSbMKajsy98E4M4E5RUCiuo.jpg",
        order_id: orderResp.id || orderResp.order_id || undefined,

        handler: async function (response) {
          const body = { ...response, orderId: options.order_id };

          try {
            const validateResponse = await fetch("http://localhost:3000/validate", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            });

            const jsonResponse = await validateResponse.json().catch(() => null);
            console.log("validate ->", jsonResponse);

            if (validateResponse.ok && (jsonResponse?.valid || jsonResponse?.success || jsonResponse)) {
              try {
                const completedOrderInfo = {
                  ...orderInfo,
                  paymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                  status: "completed" // Mark online payments as completed
                };

                await axios.post("http://localhost:3000/product/order", completedOrderInfo);

                const existingOrders = JSON.parse(localStorage.getItem("orderInfo")) || [];
                existingOrders.push(completedOrderInfo);
                localStorage.setItem("orderInfo", JSON.stringify(existingOrders));

                toast.success("Order Placed Successfully !!");
                navigate("/", { replace: true });
              } catch (err) {
                toast.error("Order Save Failed After Payment!");
                console.error(err);
              }
            } else {
              toast.error("Payment validation failed!");
              console.error("Validation failed:", jsonResponse);
            }
          } catch (err) {
            toast.error("Validation API error");
            console.log(err);
          }
        },

        prefill: {
          name: authUser?.name || "Customer",
          email: authUser?.email || "customer@example.com",
          contact: data.number || "9699823258",
        },

        notes: {
          address: data.address || "MainBook Delivery Address",
        },

        theme: {
          color: "#70d8be",
        },
      };

      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded.");
        console.error("window.Razorpay is undefined");
        return;
      }

      // open Razorpay checkout
      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert("Payment Failed: " + (response.error?.description || ""));
        console.log("Payment Failed", response.error);
      });
      rzp1.open();
    } catch (err) {
      toast.error("Payment initialization failed");
      console.error(err);
    }
  };

  const onSubmit = async (data) => {
    if (!item || !item.price) {
      toast.error("Invalid item.");
      return;
    }

    const orderInfo = {
      name: data.name || authUser?.name || "Anonymous User",
      email: data.email || authUser?.email || "unknown@example.com",
      address: data.address,
      number: data.number,
      bookName: item.name,
      image: item.image,
      payment: data.payment,
      price: item.price,
      quantity: quantity,
      totalPrice: item.price * quantity,
      orderDate: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      
    };

    if (selectedPaymentMethod === "UPI Payment") {
      await paymentHandler(data);
      return;
    }

    try {
      // For Cash on Delivery
      const res = await axios.post("http://localhost:3000/product/order", orderInfo);
      if (res.data) {
      // Store ALL orders in localStorage
      const existingOrders = JSON.parse(localStorage.getItem("orderInfo")) || [];
      existingOrders.push(orderInfo); // This will now include COD orders
      localStorage.setItem("orderInfo", JSON.stringify(existingOrders));

 
        toast.success("Order Placed Successfully !!");
        navigate(from, { replace: true });
      }
    } catch (err) {
      toast.error("Something went wrong !!");
      console.log(err);
    }
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
                    className="w-full h-full md:h-72 object-cover"
                  />
                </div>

                <div className="md:flex">
                  <div className="flex flex-col md:gap-4 p-4 md:mt-4">
                    <h2 className="text-gray-900 text-2xl md:mb-12 font-semibold">{item.name}</h2>
                    <p className="text-black text-xl md:mt-4">{item.title}</p>

                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-4 md:mt-12">
                      <div className="flex items-center space-x-3">
                        <button onClick={decreaseQty} className="bg-gray-300 px-3 py-1 rounded-md font-bold text-xl hover:bg-gray-400">-</button>
                        <span className="text-lg font-semibold text-purple-600">₹{item.price}</span>
                        <button onClick={increaseQty} className="bg-gray-300 px-3 py-1 rounded-md font-bold text-xl hover:bg-gray-400">+</button>
                      </div>

                      <div className="text-lg text-gray-900 font-semibold">
                        Total: <b className="text-emerald-600">₹{item.price * quantity}</b> <span className="text-sm text-gray-600">(x {quantity})</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2 flex md:absolute md:right-2 md:flex-col space-x-4 md:space-x-0 justify-center md:mt-8">
                    <button onClick={handleOrder} className="bg-pink-500 h-12 w-40 text-white px-6 py-2 md:mt-8 mt-0 rounded-md text-lg font-semibold hover:bg-pink-600 active:scale-105 transition duration-300">Order Book</button>
                    <button onClick={handleCart} className="bg-blue-500 h-12 w-40 md:mt-20 text-white px-6 py-2 mt-0 rounded-md text-lg font-semibold hover:bg-blue-600 active:scale-105 transition duration-300">Add to Cart</button>
                  </div>
                </div>
              </div>

              <div className="text-center text-xl md:mt-8 mt-4 font-semibold px-2 py-2">
                <h1>A reader lives a thousand lives before he dies. The man who never reads lives only one</h1>
              </div>
            </div>
          )}
        </div>
      )}

      {order && (
        <div className="max-w-6xl w-full bg-white dark:bg-slate-900 dark:border mt-8 border-white p-4 rounded-2xl shadow-2xl">
          <h1 className="text-4xl font-bold text-center mb-6 text-fuchsia-500 dark:text-yellow-400">Order Summary</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium mb-1 text-gray-700 dark:text-gray-300">Name</label>
                <input type="text" placeholder="Your Name" {...register("name")} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
                <div>
                <label className="block text-lg font-medium mb-1 text-gray-700 dark:text-gray-300">Contact Number</label>
                <input type="text" placeholder="Your Contact Number" {...register("number")} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
               <div>
                <label className="block text-lg font-medium mb-1 text-gray-700 dark:text-gray-300">Address</label>
                <textarea rows="1" placeholder="Your Address" {...register("address")} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
              <div>
                <label className="block text-lg font-medium mb-1 text-gray-700 dark:text-gray-300">Quantity</label>
                <input 
                  type="number" 
                  value={quantity} 
                  readOnly 
                  {...register("quantity")}  
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-black" 
                />
              </div>
               <div>
                <label className="block text-lg font-medium mb-1 text-gray-700 dark:text-gray-300">Price (₹)</label>
                <input 
                  type="number" 
                  value={orderprice *quantity || 0} 
                  readOnly 
                  {...register("price")}  
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-black" 
                />
              </div>
              
              

               
            </div>

            <div className="space-y-6">
               
              <div>
              <label className="block text-lg font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
              <input 
                type="text" 
                value={orderEmail} 
                readOnly 
                {...register("email")}  
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-black" 
              />
            </div>
             
              <div>
                <label className="block text-lg font-medium mb-1 text-gray-700 dark:text-gray-300">Book Name</label>
                <input type="text" value={orderedBookName} readOnly {...register("bookName")} className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-black" />
              </div>

                
              <div>
                <label className="block text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Payment Method</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input type="radio" value="Cash On Delivery" {...register("payment", { required: true })} onChange={() => setSelectedPaymentMethod("Cash On Delivery")} className="form-radio text-blue-600 w-5 h-5" checked={selectedPaymentMethod === "Cash On Delivery"} />
                    <span className="text-gray-700 dark:text-gray-300">Cash On Delivery</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="radio" value="UPI Payment" {...register("payment", { required: true })} onChange={() => setSelectedPaymentMethod("UPI Payment")} className="form-radio text-blue-600 w-5 h-5" checked={selectedPaymentMethod === "UPI Payment"} />
                    <span className="text-gray-700 dark:text-gray-300">UPI Payment</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {selectedPaymentMethod === "UPI Payment" ? (
                  <button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg text-lg font-semibold transition-all">Pay Now</button>
                ) : (
                  <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg text-lg font-semibold transition-all">Confirm Order</button>
                )}

                <button type="button" onClick={returntoShop} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg text-lg font-semibold transition-all">Back to Shop</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Shop;
