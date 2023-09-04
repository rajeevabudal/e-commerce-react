import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import ProductForm from "./productsform";
import Card from "../../common/Card/card";
import Grid from "@mui/material/Grid";
import Select from "react-select";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import {
  productAddtion,
  productEdit,
  productDelete,
  getCategoryList,
  getProductDetails,
} from "../../redux/productSlice";
import AlertDialogSlide from "../../common/Dialog/dialog";
import "./products.css";
const ProductsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAddProduct = useSelector((state) => state.product.isAddProduct);
  const isEditProduct = useSelector((state) => state.product.isEditProduct);
  const searchValue = useSelector((state) => state.product.searchValue);
  const searchData = useSelector((state) => state.product.searchData);
  const isSearched = useSelector((state) => state.product.isSearched);
  const [state, setState] = React.useState({
    alignment: "",
    categories: ["all"],
    product: {},
    isDelete: false,
    sortData: "",
  });

  const options = [
    { label: "Default", value: "default" },
    { label: "Price: High to Low", value: "hightolow" },
    { label: "Price: Low to High", value: "lowtohigh" },
    { label: "Newest", value: "newest" },
  ];
  const { alignment, categories, product, isDelete, sortData } = state;
  const [productData, setProdData] = React.useState([]);
  const [unfilteredProductData, setUnfilteredProductData] = React.useState([]);
  const [isSortClicked, setIsSortClicked] = React.useState(false);
  const [sortedData, setSortedData] = React.useState([]);
  React.useEffect(() => {
    isSearched && setProdData(searchData);

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: token,
    };
    !isSearched &&
      axios
        .get("http://localhost:8080/api/products", headers)
        .then((res) => {
          console.log(res.data);
          dispatch(getProductDetails(res.data));
          setUnfilteredProductData(res.data);
          // setState({ ...state, productData: res.data });
          setProdData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

    const getCategory = axios.get(
      "http://localhost:8080/api/products/categories",
      headers
    );

    let catArray = ["all"];
    getCategory
      .then((res) => {
        console.log(res.data);
        dispatch(getCategoryList(res.data));
        catArray = [...catArray, ...res.data];
        setState({ ...state, categories: catArray });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isAddProduct, searchValue]);

  function displayProductForm() {
    return <ProductForm product={product} />;
  }

  const handleChange = (event, newAlignment) => {
    console.log(sortData);
    let unfilteredData = [...unfilteredProductData];
    if (event.target.value === "all") {
      if (!isSortClicked) {
        setProdData(unfilteredProductData);
      } else {
        if (sortData === "lowtohigh") {
          unfilteredData.sort((a, b) => a.price - b.price);
          setProdData(unfilteredData);
          dispatch(getProductDetails(unfilteredData));
        } else if (sortData === "hightolow") {
          unfilteredData.sort((a, b) => b.price - a.price);
          setProdData(unfilteredData);
          dispatch(getProductDetails(unfilteredData));
        } else if (sortData === "default") {
          setProdData(unfilteredProductData);
          dispatch(getProductDetails(unfilteredProductData));
        }
      }

      // handleChange("Default")
    } else {
      console.log(unfilteredData);
      let filteredProduct = unfilteredData.filter(
        (product) => product.category === event.target.value
      );
      dispatch(getProductDetails(filteredProduct));
      setProdData(filteredProduct);
    }

    setState({ ...state, alignment: newAlignment });
  };

  const handleEdit = (product) => {
    setState({ ...state, product: product });
    dispatch(productEdit(true));
    navigate(`/products/edit/${product.id}`);
  };

  const handleDelete = (product) => {
    setState({ ...state, isDelete: true, product: product });
    dispatch(productDelete(true));
  };

  const handleBuy = (product) => {
    navigate(`/products/${product.id}`);
  };
  const handleSort = (newValue) => {
    setIsSortClicked(true);
    let sortableData = [...productData];
    if (newValue.value === "lowtohigh") {
      sortableData.sort((a, b) => a.price - b.price);
      setProdData(sortableData);
      setSortedData(sortableData);
      dispatch(getProductDetails(sortableData));
      setState({ ...state, sortData: newValue.value });
    } else if (newValue.value === "hightolow") {
      sortableData.sort((a, b) => b.price - a.price);
      setProdData(sortableData);
      setSortedData(sortableData);
      dispatch(getProductDetails(sortableData));
      setState({ ...state, sortData: newValue.value });
    } else if (newValue.value === "default") {
      setProdData(unfilteredProductData);
      setSortedData(unfilteredProductData);
      dispatch(getProductDetails(sortableData));
      setState({ ...state, sortData: newValue.value });
    }
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
              <div className="toggle-group">
                <ToggleButtonGroup
                  color="primary"
                  value={cat}
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform"
                >
                  <ToggleButton value={cat}>{cat}</ToggleButton>
                </ToggleButtonGroup>
              </div>
            );
          })}
        </Grid>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          className="sortable-select"
        >
          <Select
            options={options}
            onChange={(newValue) => handleSort(newValue)}
            // value={sortData}
          />
        </Grid>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          className="ecommerce-card"
        >
          {productData.length > 0 ? (
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
                    handleBuy={() => handleBuy(product)}
                  />
                </Grid>
              );
            })
          ) : (
            <CircularProgress />
          )}
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
        displayProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(productData);
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
