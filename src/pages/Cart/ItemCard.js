import React from "react";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
} from "../../Redux/authSlice/cartSlice";

const ItemCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item._id));
  };
  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }));
    }
  };
  const handleIncrement = () => {
    dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }));
  };

  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        <ImCross
          onClick={handleRemove}
          className="text-primeColor hover:text-red-500 cursor-pointer"
        />
        <img className="w-32 h-32" src={item.img} alt={item.productName} />
        <h1 className="font-semibold">{item.productName}</h1>
      </div>
      <div className="col-span-3 flex justify-between px-4 items-center">
        <p>${item.price}</p>
        <div className="flex items-center justify-center gap-4 p-1 bg-gray-100 rounded-lg shadow-md">
          <span
            onClick={handleDecrement}
            className="cursor-pointer text-2xl text-gray-600 hover:text-gray-800 transition-colors duration-300"
          >
            -
          </span>
          <p className="text-lg font-semibold text-gray-800">{item.quantity}</p>
          <span
            onClick={handleIncrement}
            className="cursor-pointer text-2xl text-gray-600 hover:text-gray-800 transition-colors duration-300"
          >
            +
          </span>
        </div>

        <p>${(item.price * item.quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ItemCard;
