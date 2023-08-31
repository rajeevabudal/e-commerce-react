import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Container from "@mui/material/Container";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import axios from "axios";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getOrderedDetails,
  getQuantity,
  getSteps,
} from "../../redux/productSlice";
import SelectAddress from "../address/address";
import "./products.css";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    // ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginTop: 120,
  }));

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [state, setState] = React.useState({
    productDetails: {},
    placeOrder: false,
    vertical: "top",
    horizontal: "right",
    error: "",
    open: false,
    isError: false,
    quantity: 0,
  });

  const {
    productDetails,
    placeOrder,
    vertical,
    horizontal,
    error,
    open,
    isError,
    quantity,
  } = state;
  React.useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products/${id}`)
      .then((result) => {
        setState({ ...state, productDetails: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({ ...state, open: false });
  };
  const displayErrorMessage = () => {
    return (
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
        autoHideDuration={6000}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    );
  };
  const handlePlaceOrder = () => {
    if (quantity === 0 || quantity === "") {
      setState({
        ...state,
        isError: true,
        error: "Please enter the quantity",
        placeOrder: false,
      });
    } else {
      dispatch(getOrderedDetails(productDetails));
      setState({ ...state, placeOrder: true });
      navigate("/products/selectAddress");
      dispatch(getSteps(1));
      dispatch(getQuantity(quantity));
    }
  };

  const handleQuantity = (event) => {
    setState({ ...state, quantity: event.target.value });
  };

  console.log(error, isError);
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Item>
                {placeOrder ? (
                  <SelectAddress />
                ) : (
                  <div>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <div>
                          <img
                            src={productDetails.imageUrl}
                            style={{ height: "100%", width: "100%" }}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={8}>
                        <div>
                          <h1>{productDetails.name}</h1>
                          <p>
                            Category: <b>{productDetails.name}</b>
                          </p>
                          <p>{productDetails.description}</p>
                          <p style={{ color: "red" }}>
                            &#8377;{productDetails.price}
                          </p>
                          <TextField
                            autoComplete="given-name"
                            name="Quantity"
                            required
                            fullWidth
                            id="Quantity"
                            label="Enter Quantity"
                            onChange={(e) => handleQuantity(e)}
                            value={quantity}
                            autoFocus
                            style={{ width: "20%" }}
                          />
                          <div>
                            <Button
                              variant="contained"
                              className="place-order"
                              onClick={handlePlaceOrder}
                            >
                              Place Order
                            </Button>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                )}
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Container>
      {isError && displayErrorMessage()}
    </>
  );
}
