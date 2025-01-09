import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../components/home/Products/Product";
import { fetchProducts } from "../../Redux/authSlice/productSlice";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import { getCategory } from "../../services";
import { GiReturnArrow } from "react-icons/gi";

const ApplicationPage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const [categoryList, setCategoryList] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const fetchCategoryData = async () => {
    try {
      const response = await getCategory();
      const filteredCategory = response.filter(
        (category) => category.categoryName === "Tarpaulin Applications"
      );
      setCategoryList(filteredCategory || []);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(prevCategory => 
      prevCategory === categoryName ? null : categoryName
    );
  };

  const toggleExpand = (categoryId) => {
    setExpanded((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };
  const filteredProducts = products.filter((item) => {
    if (!selectedCategory) {
      return item.productCategory === "Tarpaulin Applications";
    }
        return (
      item.productCategory === selectedCategory || 
      item.subCategory === selectedCategory
    );
  });

  const renderCategories = (categories) => {
    return categories.map((category) => (
      <li key={category._id} className="border-b border-gray-200 pb-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={category._id}
            onChange={() => handleCategorySelect(category.categoryName)}
            checked={selectedCategory === category.categoryName}
          />
          <label htmlFor={category._id} className="cursor-pointer">
            {category.categoryName}
          </label>
          {category.children?.length > 0 && (
            <span
              onClick={() => toggleExpand(category._id)}
              className="text-xs cursor-pointer ml-auto hover:text-blue-500"
            >
              <GiReturnArrow />
            </span>
          )}
        </div>
        {expanded[category._id] && category.children?.length > 0 && (
          <ul className="ml-6 mt-2 border-l border-gray-300 pl-4">
            {renderCategories(category.children)}
          </ul>
        )}
      </li>
    ));
  };

  // Debug logging
  useEffect(() => {
  }, [selectedCategory, filteredProducts]);

  return (
    <div className="max-w-container mx-auto px-4">
      <div className="w-full min-h-screen flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full pt-10">
          <div className="w-full">
            <div>
              <ul className="flex flex-col gap-4 text-sm lg:text-base text-gray-600">
                {renderCategories(categoryList)}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10 pt-10">
          <ProductBanner />

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {loading ? (
              <p>Loading products...</p>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <Product
                  key={item._id}
                  _id={item._id}
                  img={`${process.env.REACT_APP_API_IMAGE}${item.image}`}
                  productName={item.productName}
                  price={item.productPrice}
                  des={item.description}
                  parts={item.parts}
                  otherFeatures={item.otherFeatures}
                  specifications={item.specifications}
                  features={item.features}
                />
              ))
            ) : (
              <p>No products found in this category.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;