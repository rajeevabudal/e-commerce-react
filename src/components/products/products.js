import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductForm from "./productsform";
import Card from "../../common/Card/card";
import Grid from "@mui/material/Grid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import "./products.css";
const ProductsPage = () => {
  const navigate = useNavigate();
  const isAddProduct = useSelector((state) => state.product.isAddProduct);

  const [state, setState] = React.useState({
    productData: [],
    alignment: "web",
    categories: [],
  });
  const { productData, alignment, categories } = state;
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

    getCategory
      .then((res) => {
        console.log(res.data);
        setState({ ...state, categories: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isAddProduct]);

  console.log(categories);

  function displayProductForm() {
    return <ProductForm />;
  }

  const handleChange = (event, newAlignment) => {
    setState({ ...state, alignment: newAlignment });
  };
  function displayProduct() {
    return (
      <>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          className="ecommerce-card"
        >
          {categories.map((cat) => {
            return (
              <>
                <ToggleButtonGroup
                  color="primary"
                  value={alignment}
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform"
                >
                  <ToggleButton value="web">{cat}</ToggleButton>
                </ToggleButtonGroup>
              </>
            );
          })}
        </Grid>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          className="ecommerce-card"
        >
          {productData.map((product) => {
            return (
              <Grid item xs={2} sm={4} md={4} className="card-overview">
                <Card
                  imageUrl={product.imageUrl}
                  title={product.name}
                  description={product.description}
                />
              </Grid>
            );
          })}
        </Grid>
      </>
    );
  }
  return <>{isAddProduct ? displayProductForm() : displayProduct()}</>;
};

export default ProductsPage;
