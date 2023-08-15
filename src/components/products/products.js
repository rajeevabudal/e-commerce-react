import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductForm from "./productsform";
import Card from "../../common/Card/card";

const ProductsPage = () => {
  const navigate = useNavigate();
  const isAddProduct = useSelector((state) => state.product.isAddProduct);

  const [state, setState] = React.useState({
    productData: [],
  });
  const { productData } = state;
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: token,
    };
    const result = axios.get("http://localhost:8080/api/products", headers);
    result
      .then((res) => {
        setState({ ...state, productData: res.data });
      })
      .catch((err) => {
        console.log(err);
      });

    const getCategory = axios.get(
      "http://localhost:8080/api/products/categories",
      headers
    );

    getCategory.then((res)=>{
        console.log(res.data)
    }).catch((err)=>{
        console.log(err);
    })
  }, [isAddProduct]);

  console.log(productData);

  function displayProductForm() {
    return <ProductForm />;
  }

  function displayProduct() {
    return (
      <>
        {productData.map((product) => {
          return (
            <>
              <Card imageUrl = {product.imageUrl} title={product.name} description={product.description}/>
            </>
          );
        })}
      </>
    );
  }
  console.log(isAddProduct);
  return <>{isAddProduct ? displayProductForm() : displayProduct()}</>;
};

export default ProductsPage;
