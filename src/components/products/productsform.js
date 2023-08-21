import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Creatable from "react-select/creatable";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const defaultTheme = createTheme();
export default function ProductForm({ product }) {
  const isEditProduct = useSelector((state) => state.product.isEditProduct);
  const categoryList = useSelector((state) => state.product.categoryList);
  const createOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ""),
  });
  const isAddProduct = useSelector((state) => state.product.isAddProduct);
//   const defaultOptions = [createOption("Furniture")];
  const [state, setState] = React.useState({
    isLoading: false,
    value: "",
    options: [],
    name: "",
    manufacturer: "",
    price: 0,
    availableItems: 0,
    description: "",
    imageUrl: "",
  });

  const {
    isLoading,
    value,
    options,
    name,
    manufacturer,
    price,
    availableItems,
    description,
    imageUrl,
  } = state;

  React.useEffect(() => {
    setState({
      ...state,
      name: product.name,
      manufacturer: product.manufacturer,
      price: product.price,
      availableItems: product.availableItems,
      description: product.description,
      imageUrl: product.imageUrl,
    });
    isAddProduct &&
      setState({
        ...state,
        name: "",
        manufacturer: "",
        price: 0,
        availableItems: 0,
        description: "",
        imageUrl: "",
      });
      let categories = categoryList.map((cat)=>{
       return createOption(cat);
      })
      setState({...state, options: categories})
  }, [isEditProduct, isAddProduct]);
  const handleCreate = (inputValue) => {
    setState({ ...state, isLoading: true });
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setState({
        ...state,
        isLoading: false,
        options: [...options, newOption],
        value: newOption,
      });
    }, 1000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const token = localStorage.getItem("token");
    console.log(token);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let productSubmitData = {
      name: data.get("Name"),
      category: data.get("category"),
      price: Number(data.get("Price")),
      description: data.get("ProductDescription"),
      manufacturer: data.get("Manufacturer"),
      availableItems: Number(data.get("AvailableItems")),
      imageUrl: data.get("ImageURL"),
    };
    !isEditProduct
      ? axios
          .post(
            "http://localhost:8080/api/products",
            productSubmitData,
            axiosConfig
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          })
      : axios
          .put(
            `http://localhost:8080/api/products/${product.id}`,
            productSubmitData,
            axiosConfig
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
  };

  const handleChange = (formValue, event) => {
    setState({ ...state, [`${formValue}`]: event.target.value });
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Add Product
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="Name"
                    required
                    fullWidth
                    id="Name"
                    label="Name"
                    onChange={(e) => handleChange("name", e)}
                    value={name}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <Creatable
                    isClearable
                    //isDisabled={isLoading}
                    isLoading={isLoading}
                    onChange={(newValue) =>
                      setState({ ...state, value: newValue })
                    }
                    onCreateOption={handleCreate}
                    options={options}
                    value={value}
                    name="category"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="Manufacturer"
                    label="Manufacturer"
                    onChange={(e) => handleChange("manufacturer", e)}
                    name="Manufacturer"
                    value={manufacturer}
                    autoComplete="Manufacturer"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="AvailableItems"
                    label="Available items"
                    id="AvailableItems"
                    autoComplete="AvailableItems"
                    onChange={(e) => handleChange("avilableItems", e)}
                    value={availableItems}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="Price"
                    label="Price"
                    id="Price"
                    autoComplete="Price"
                    onChange={(e) => handleChange("price", e)}
                    value={price}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="ImageURL"
                    label="Image URL"
                    type="text"
                    id="ImageURL"
                    autoComplete="ImageURL"
                    onChange={(e) => handleChange("imageUrl", e)}
                    value={imageUrl}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="ProductDescription"
                    label="Product Description"
                    type="text"
                    id="ProductDescription"
                    autoComplete="ProductDescription"
                    onChange={(e) => handleChange("description", e)}
                    value={description}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className="signup-btn"
              >
                {isEditProduct ? "MODIFY PRODUCT" : "SAVE PRODUCT"}
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
