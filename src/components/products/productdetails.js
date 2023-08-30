import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import axios from "axios";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSteps } from "../../redux/productSlice";
import "./products.css";
import SelectAddress from "../address/address";

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

  const [state, setState] = React.useState({
    productDetails: {},
    placeOrder: false,
  });

  const { productDetails, placeOrder } = state;
  React.useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products/${id}`)
      .then((result) => {
        console.log(result.data);
        setState({ ...state, productDetails: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePlaceOrder = () => {
    navigate("/products/selectAddress");
    setState({ ...state, placeOrder: true });
    dispatch(getSteps(1));
  };
  console.log(placeOrder);
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
                            // onChange={(e) => handleChange("name", e)}
                            // value={name}
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
    </>
  );
}
