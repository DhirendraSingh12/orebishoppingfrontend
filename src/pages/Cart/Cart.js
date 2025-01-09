import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard";
import { clearCart } from "../../Redux/authSlice/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [totalAmt, setTotalAmt] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);

  useEffect(() => {
    let price = 0;
    cartItems.forEach((item) => {
      price += item.price * item.quantity;
    });
    setTotalAmt(price);
  }, [cartItems]);

  useEffect(() => {
    if (totalAmt <= 200) {
      setShippingCharge(30);
    } else if (totalAmt <= 400) {
      setShippingCharge(25);
    } else {
      setShippingCharge(20);
    }
  }, [totalAmt]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Cart" />
      {cartItems.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          <div className="mt-5">
            {cartItems.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>

          <button
            onClick={handleClearCart}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Reset cart
          </button>

          <div className="max-w-7xl flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
              <div>
                <p className="flex justify-between py-1.5 text-lg px-4 border">
                  Subtotal <span>${totalAmt.toFixed(2)}</span>
                </p>
                <p className="flex justify-between py-1.5 text-lg px-4 border">
                  Shipping <span>${shippingCharge}</span>
                </p>
                <p className="flex justify-between py-1.5 text-lg px-4 border">
                  Total <span>${(totalAmt + shippingCharge).toFixed(2)}</span>
                </p>
              </div>
              <Link to="/OrderBillinngPage">
                <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col justify-center items-center gap-4 pb-20"
        >
          <img className="w-80" src={emptyCart} alt="Empty Cart" />
          <h1 className="text-xl font-bold">Your Cart feels lonely.</h1>
          <p className="text-center text-sm px-10">
            Fill it with items to give it purpose!
          </p>
          <Link to="/shop">
            <button className="bg-primeColor px-8 py-2 rounded-md text-white hover:bg-black">
              Continue Shopping
            </button>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
