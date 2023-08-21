import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductForm from "./productsform";
import Card from "../../common/Card/card";
import Grid from "@mui/material/Grid";
import {
  productAddtion,
  productEdit,
  productDelete,
  getCategoryList,
} from "../../redux/productSlice";
import AlertDialogSlide from "../../common/Dialog/dialog";
import "./products.css";
const ProductsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAddProduct = useSelector((state) => state.product.isAddProduct);
  const isEditProduct = useSelector((state) => state.product.isEditProduct);
  const [state, setState] = React.useState({
    productData: [],
    alignment: "web",
    categories: [],
    product: {},
    isDelete: false,
  });
  const { productData, alignment, categories, product, isDelete } = state;
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: token,
    };
    const result = axios.get("http://localhost:8080/api/products", headers);
    result
      .then((res) => {
        console.log(res.data);
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
        dispatch(getCategoryList(res.data))
        setState({ ...state, categories: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isAddProduct]);

  function displayProductForm() {
    return <ProductForm product={product} />;
  }

  const handleChange = (event, newAlignment) => {
    setState({ ...state, alignment: newAlignment });
  };

  const handleEdit = (product) => {
    setState({ ...state, product: product });
    dispatch(productEdit(true));
  };

  const handleDelete = (product) => {
    setState({ ...state, isDelete: true, product: product });
    dispatch(productDelete(true));
  };
  function displayProduct() {
    return (
      <>
        {/* <Grid
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
        </Grid> */}
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          className="ecommerce-card"
        >
          {productData.length > 0 &&
            productData.map((product) => {
              return (
                <Grid item xs={2} sm={4} md={4} className="card-overview">
                  <Card
                    imageUrl={product.imageUrl}
                    title={product.name}
                    description={product.description}
                    handleEdit={() => handleEdit(product)}
                    handleDelete={() => handleDelete(product)}
                    price={product.price}
                  />
                </Grid>
              );
            })}
        </Grid>
      </>
    );
  }

  const handleClose = () => {
    setState({ ...state, isDelete: false });
  };

  const handleAgree = () => {
    const token = localStorage.getItem("token");
    const headers = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
    };
    console.log("delter", product);
    setState({ ...state, isDelete: false });
    axios
      .delete(`http://localhost:8080/api/products/${product.id}`, headers)
      .then((res) => {
        console.log(res);
        displayProduct()
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(isAddProduct, productData, isEditProduct, isDelete);
  return (
    <>
      {isAddProduct || isEditProduct ? displayProductForm() : displayProduct()}
      {isDelete && (
        <AlertDialogSlide
          isOpen={isDelete}
          handleClose={handleClose}
          handleAgree={handleAgree}
        />
      )}
    </>
  );
};

export default ProductsPage;
