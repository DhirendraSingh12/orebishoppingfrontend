import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ItemCard from "../Cart/ItemCard";
import { Link } from "react-router-dom";

const BillingPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { fullName, email, address, city, postalcode, country } = useSelector(
    (state) => state.auth.user
  );
  const [totalAmt, setTotalAmt] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [formData, setFormData] = useState({
    fullName: fullName,
    email: email,
    address: address,
    city: city,
    zip: postalcode,
    state: country,
  });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/billing", formData);
      console.log("Billing Address Submitted:", response.data);
      alert("Billing Information Submitted Successfully!");
    } catch (error) {
      console.error("Error submitting billing info:", error);
      alert("Failed to submit billing information.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto p-6">
      <div className="p-6 shadow-lg rounded-lg bg-white">
        <h2 className="text-2xl font-bold mb-4">Billing Address</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full p-3 border rounded-md"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full p-3 border rounded-md"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              required
              className="w-full p-3 border rounded-md"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required
              className="w-full p-3 border rounded-md"
            />
          </div>

          <div>
            <label htmlFor="zip" className="block text-sm font-medium">
              ZIP Code
            </label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              placeholder="ZIP Code"
              required
              className="w-full p-3 border rounded-md"
            />
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              required
              className="w-full p-3 border rounded-md"
            />
          </div>
        </form>
      </div>

      <div className="p-6 shadow-lg rounded-lg bg-white">
        <h2 className="text-2xl font-bold mb-4">My Cart</h2>
        {cartItems.length > 0 ? (
          <div>
            {cartItems.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}

            <div className="mt-3 border-t pt-4 space-y-3 ">
              <p className="flex justify-between py-1 text-lg border border-gray-300 p-2">
                Subtotal: <span>${totalAmt.toFixed(2)}</span>
              </p>
              <p className="flex justify-between py-1 text-lg border border-gray-300 p-2">
                Shipping: <span>${shippingCharge}</span>
              </p>
              <p className="flex justify-between py-1 text-lg font-bold border border-gray-300 p-2">
                Total: <span>${(totalAmt + shippingCharge).toFixed(2)}</span>
              </p>
              <div className="flex justify-center items-center">
                <Link
                  to="/paymentgateway"
                  className="w-full max-w-xs mt-4 bg-green-500 text-white p-3 rounded-md hover:bg-green-700 text-center"
                >
                  Proceed to Payment
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-lg">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default BillingPage;
