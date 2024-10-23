import React, { useState, useContext, useEffect } from "react";
import { BiCart } from "react-icons/bi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaAmazon } from "react-icons/fa";
import Context from "./Context/Context";
import { BiMenu } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CategorySlider from "./Pages/Category/CategorySlider";
import CategoryHeader from "./Pages/Category/CategoryHeader";

function Header() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const { addToCart, removeFromCart, cart, logout } = useContext(Context);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);
  const totalPrice = cartItems.reduce((a, b) => a + b.price * b.quantity, 0);
  function logoutWeb() {
    logout();
    navigate("/");
    localStorage.removeItem("userEmail");
  }

  function toggleCart() {
    setShow((prev) => !prev);
    if (!show) {
      setCartItems(cart);
    }
  }

  const schema = z.object({
    searchField: z.string().max(20, "max 20"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  function search(data) {
    if (data.searchField) {
      navigate("/Dashboard/Search", {
        state: { searchData: data.searchField },
      });
    } else {
      navigate("/Dashboard/EmptySearch");
    }
    reset();
  }
  return (
    <header>
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-green-500 p-3 md:px-8 ">
        {/* Logo */}
        <div className="sm:hidden">
          <CategorySlider />
        </div>
        <Link to={"/Dashboard"}>
          <FaAmazon className="text-white text-4xl md:text-5xl" />
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit(search)}
          className=" flex w-full mx-4 gap-3 "
        >
          <input
            type="text"
            placeholder="Search"
            className="border-2 px-4 py-2 rounded-md w-[100px] sm:w-[120px] md:w-[200px] lg:w-[300px]"
            {...register("searchField")}
          />
          {errors.searchField && <p>{errors.searchField.message}</p>}
          {}
          {/* <Link to={"/Dashboard/Search"}></Link> */}
          <button type="submit" className="bg-white rounded-md w-7 h-9 mt-1">
            <BiSearch className="ml-1  " />{" "}
          </button>
        </form>
        <div>
          <CategoryHeader />
        </div>

        {/* Cart and Buttons */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <BiCart
              className="text-white text-3xl cursor-pointer hover:scale-110 transition-transform"
              onClick={toggleCart}
            />
          </div>
          <button
            className="hidden sm:block bg-white text-black hover:bg-black hover:text-white rounded-md px-3 py-1 transition duration-300"
            onClick={logoutWeb}
          >
            Logout
          </button>

          <Link to={"/Dashboard/admin"} className="hidden sm:block">
            <button className="bg-white text-black whitespace-nowrap hover:bg-gray-600 hover:text-white rounded-md px-4 py-1 transition duration-300">
              Admin Page
            </button>
          </Link>
        </div>

        {/* Mobile Menu */}
      </nav>

      {/* Cart Modal */}
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-md p-5 shadow-lg w-full sm:w-[80%] h-[70%] md:h-[60%] flex flex-col justify-between">
            <div className="text-2xl mb-4 text-center">
              <h1>Cart</h1>
            </div>
            {cartItems.length > 0 ? (
              <div className="w-full overflow-y-auto">
                {cartItems.map((item) => (
                  <div>
                    <div
                      className="flex justify-between items-center w-full mb-3 border-b pb-2"
                      key={item.id}
                    >
                      <div className="flex items-center">
                        <img
                          className="w-12 h-12 rounded-md"
                          src={item.image}
                          alt={item.name}
                        />
                        <div className="ml-4">
                          <h1>{item.name}</h1>
                          <p className="text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <p className="font-bold text-lg">{item.price}</p>
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h1 className="text-center text-lg text-gray-700">
                No items found
              </h1>
            )}
            <div className="flex w-full justify-end">
              <h1 className="bg-red-400 rounded-md p-2 font-bold">
                {" "}
                The total price is : ${totalPrice}
              </h1>
            </div>
            <button
              className="mt-4 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md w-full md:w-[40%] mx-auto transition duration-300"
              onClick={toggleCart}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
