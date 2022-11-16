import { useState, useEffect } from "react";
import {NavLink, Routes, Route, useParams,useLocation } from "react-router-dom";
import useFetch from "./useFetch.js";
import ProductDetailInfo from "./ProductDetailInfo.js";
import ProductDetailNutrition from "./ProductDetailNutrition.js";
import ProductDetailStorage from "./ProductDetailStorage.js";

export default function ProductDetails(props) {
  const params = useParams();
  const pathname = useLocation().pathname;

  const [product, setProduct] = useState({});
  const { get } = useFetch("https://react-tutorial-demo.firebaseio.com/");
  useEffect(() => {
    get(`productinfo/id${params.id}.json`)
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.log("Could not load product details", error));
  }, []);

  return (
    <div className="product-details-layout">
      <div>
        <h2>{product.name}</h2>
        <img
          src={product.image}
          width="125"
          height="125"
          className="product-details-image"
          alt={product.name}
        />
      </div>
      <div>
        <div className="tabs">
          <ul>
            <li>
              <NavLink
                className={!!pathname.match(/\d$/) ? "tab-active" : ""}
                to={""}
              >
                Details
              </NavLink>
            </li>
            <li>
              <NavLink
                className={pathname.includes("/nutrition") ? "tab-active" : ""}
                to={"nutrition"}
              >
                Nutrition
              </NavLink>
            </li>
            <li>
              <NavLink
                className={pathname.includes("/storage") ? "tab-active" : ""}
                to={"storage"}
              >
                Storage
              </NavLink>
            </li>
          </ul>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <ProductDetailInfo
                onProductAdd={props.onProductAdd}
                product={product}
              />
            }
          ></Route>

          <Route
            path={"nutrition"}
            element={<ProductDetailNutrition nutrition={product.nutrition} />}
          ></Route>

          <Route
            path={"storage"}
            element={<ProductDetailStorage storage={product.storage} />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}