import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsSuitHeartFill } from "react-icons/bs";
import { logout } from "../../../Redux/authSlice/authSlice";
import { getCategory } from "../../../services";
import { ImPlus } from "react-icons/im";

const HeaderBottom = () => {
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (ref.current.contains(e.target)) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [show, ref]);

  const [searchQuery, setSearchQuery] = useState("");
 
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.cartItems); 

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/signup");
  };

  const [categoryList, setCategoryList] = useState([]);
  const [expanded, setExpanded] = useState({});

  const fetchCategoryData = async () => {
    try {
      const response = await getCategory();
      setCategoryList(response || []);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderCategories = (categories) => {
    return categories.map((category) => (
      <li key={category._id} className="border-b border-gray-200 pb-2">
        <div className="flex items-center gap-2">
          <label htmlFor={category._id} className="cursor-pointer">
            {category.categoryName}
          </label>
          {category.children && category.children.length > 0 && (
            <span
              onClick={() => toggleExpand(category._id)}
              className="text-xs cursor-pointer ml-auto hover:text-blue-500"
            >
              <ImPlus />
            </span>
          )}
        </div>
        {expanded[category._id] && category.children.length > 0 && (
          <ul className="ml-6 mt-2 border-l border-gray-300 pl-4">
            {renderCategories(category.children)}
          </ul>
        )}
      </li>
    ));
  };
  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <div
            onClick={() => setShow(!show)}
            ref={ref}
            className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
          >
            <HiOutlineMenuAlt4 className="w-5 h-5" />
            <p className="text-[14px] font-normal">Shop by Category</p>

            {show && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-36 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6"
              >
                {renderCategories(categoryList)}
              </motion.ul>
            )}
          </div>

          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
              placeholder="Search your products here"
            />
            <FaSearch className="w-5 h-5" />
          </div>

          {isAuthenticated ? (
            <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
              <div onClick={() => setShowUser(!showUser)} className="flex">
                <FaUser />
                <FaCaretDown />
              </div>
              {showUser && (
                <motion.ul
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
                >
                  <li
                    onClick={handleLogout} // Implement handleLogout for logout functionality
                    className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
                  >
                    Logout
                  </li>
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Profile
                  </li>
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Others
                  </li>
                </motion.ul>
              )}
              <Link to="/cart">
                <div className="relative">
                  <FaShoppingCart />
                  {cartItems.length > 0 && (
            <p className="absolute top-1 right-2 bg-primeColor text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
              {cartItems.length}
            </p>
          )}
                </div>
              </Link>
              <BsSuitHeartFill />
            </div>
          ) : (
            <div className="flex gap-4">
              <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
                <Link to="/signin">
                  <div className="relative">
                    <FaUser />
                  </div>
                </Link>
              </div>
            </div>
          )}
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
