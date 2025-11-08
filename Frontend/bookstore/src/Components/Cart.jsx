import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import Footer from "../Components/Footer";

function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state?.item;
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

const handleCart = () => {
  if (item) {
    const existing = cart.find((c) => c.id === item.id);

    let updatedCart;

    if (existing) {
      updatedCart = cart.map((c) =>
        c.id === item.id ? { ...c, quantity: (c.quantity || 1) + 1 } : c
      );
    } else {
      updatedCart = [...cart, { ...item, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item added to cart!");
  }
};


  const handleShop = () => {
    navigate("/course");
  };

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item removed from cart!");
  };

const handleOrder = (item) => {
  navigate("/shop", {
    state: {
      item,
      quantity: item.quantity || 1,
      price: item.price * (item.quantity || 1),
      orderNow: true
    }
  });
};


  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-6 flex-grow">
        <h1 className="text-3xl font-semibold text-center mt-16 mb-4">Your Cart !!</h1>

        {item && (
          <div className="flex justify-center">
            <button
              onClick={handleCart}
              className="bg-blue-500 text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-blue-600 active:scale-105 transition duration-300"
            >
              Add Current Item to Cart
            </button>
          </div>
        )}

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow py-40">
            <p className="text-center text-2xl font-semibold">Your cart is empty.</p>
            <button
              onClick={handleShop}
              className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-md font-medium text-xl"
            >
              Go to Shop
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-8 w-full h-full md:h-auto">
            {cart.map((item, index) => (
              <div
                key={index}
                className="md:flex md:justify-between md:items-center border md:p-4 rounded-lg shadow-lg bg-white dark:bg-slate-900 md:h-48 h-auto w-full"
              >
                {/* Left Section */}
                <div className="md:flex md:items-center gap-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="md:w-32 md:h-32 md:p-0 p-2 w-80 h-60 md:ml-0 ml-2 md:mt-0 mt-2 object-cover rounded-md"
                  />
                  <div className="font-semibold text-xl">
                    <h2 className="font-semibold ml-5 md:ml-0">{item.name}</h2>
                    <p className="ml-5 md:ml-0 text-gray-600">{item.title}</p>
                  </div>
                </div>

                {/* Right Section */}
                <div className="text-center flex-col">
                  <p className="text-lg font-bold text-green-600">
                    ₹{item.price}{" "}
                    <span style={{ color: "gray", fontSize: "16px" }}>
                      (x{item.quantity || 1})
                    </span>{" "}
                    = ₹{item.price * (item.quantity || 1)}
                  </p>
                  <div className="p-2 mt-4 flex flex-row justify-around">
                    <button
                      onClick={() => handleOrder(item)}
                      className="bg-blue-500 mr-4 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Order
                    </button>

                    <button
                      onClick={() => removeItem(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
