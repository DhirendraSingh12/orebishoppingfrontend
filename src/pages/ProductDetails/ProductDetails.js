import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import { addToCart } from "../../Redux/authSlice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState({});
  const [selectedParts, setSelectedParts] = useState([]);
  useEffect(() => {
    if (location.state?.item) {
      setProductInfo(location.state.item);
      setPrevLocation(location.pathname);
    }
  }, [location]);

  const handleSelectPart = (partId) => {
    setSelectedParts((prevSelectedParts) => {
      if (prevSelectedParts.includes(partId)) {
        return prevSelectedParts.filter((id) => id !== partId);
      } else {
        return [...prevSelectedParts, partId];
      }
    });
  };

  const handleAddToCart = () => {
    const selectedItems = productInfo.parts.filter((part) =>
      selectedParts.includes(part._id)
    );
    if (selectedItems.length > 0) {
      dispatch(addToCart(selectedItems));
      setSelectedParts([]);
    }
  };

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          <div className="h-full xl:col-span-2">
            <img
              className="w-full h-full"
              src={productInfo.img}
              alt={productInfo.img}
            />
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-4 xl:px-4 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Features</h2>
              <ul className="list-disc list-inside space-y-2">
                {(productInfo.features || []).map((feature, index) => (
                  <li key={index} className="text-gray-700">
                    {feature || "feature"}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Specifications</h2>
              <ul className="list-disc list-inside space-y-2">
                {(productInfo.specifications || []).map((spec, index) => (
                  <li key={index} className="text-gray-700">
                    {spec || "feature"}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Other Features</h2>
              <ul className="list-disc list-inside space-y-2">
                {(productInfo.otherFeatures || []).map((feature, index) => (
                  <li key={index} className="text-gray-700">
                    {feature || "feature"}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {productInfo && productInfo.parts?.length > 0 && (
          <div className="my-4">
            <h3 className="text-lg font-semibold mb-4">Sub Products</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {productInfo.parts.map((part) => (
                <div
                  key={part._id}
                  className={`p-4 border rounded-lg ${
                    selectedParts.includes(part._id)
                      ? "border-blue-500 bg-blue-50"
                      : "hover:border-blue-500 hover:bg-blue-50"
                  } cursor-pointer`}
                  onClick={() => handleSelectPart(part._id)}
                >
                  <img
                    src={`${process.env.REACT_APP_API_IMAGE}${part.image}`}
                    alt={part.partName}
                    className="w-full h-60 object-cover mb-2"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="d-flex justify-between items-center px-2">
                    <p className="font-medium">{part.partName}</p>
                    <p className="text-sm font-normal">{part.price} Dt</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-md"
                onClick={handleAddToCart}
                disabled={selectedParts.length === 0}
              >
                Add Selected to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
