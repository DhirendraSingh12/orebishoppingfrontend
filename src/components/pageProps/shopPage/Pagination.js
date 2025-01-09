import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../home/Products/Product";
import { fetchProducts } from "../../../Redux/authSlice/productSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
console.log(products)
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {products.map((item) => (
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
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;