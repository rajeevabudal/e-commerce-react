import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Stepper from "../../common/stepper/stepper";
import Divider from "@mui/material/Divider";
import { getAddress, getSteps } from "../../redux/productSlice";
import "./confirmorder.css";

export default function ConfirmOrder() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const dispatch = useDispatch();
  const navigate = useNavigate(-1);
  const steps = useSelector((state) => state.product.steps);
  const address = useSelector((state) => state.product.address);
  const quantity = useSelector((state) => state.product.commerceQuantity);
  const orderedDetails = useSelector((state) => state.product.orderedDetails);
  const [userAddress, setUserAddress] = React.useState("");
  const handlePlaceOrder = () => {
    dispatch(getSteps(steps + 1));
    console.log(quantity);
    const user = localStorage.getItem("user");
    console.log(user);
    console.log(userAddress);
    console.log(orderedDetails.name);
    const token = localStorage.getItem("token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let orderSubmit = {
      quantity: quantity,
      user: user,
      product: orderedDetails.id,
      address: address.id,
    };

    axios
      .post("http://localhost:8080/api/orders", orderSubmit, axiosConfig)
      .then((response) => {
        console.log(response);
        navigate("/products/list");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleBack = () => {
    dispatch(getSteps(steps - 1));
    dispatch(getAddress(""));
    navigate(-1);
  };
  React.useEffect(() => {
    let addressString = "";
    for (let key in address) {
      addressString =
        address["name"] +
        "\n" +
        "Contact Number :" +
        address["contactNumber"] +
        "\n" +
        address["street"] +
        " " +
        address["city"] +
        "\n" +
        address["state"] +
        "\n" +
        address["zipcode"];
    }
    setUserAddress(addressString);
  }, [address]);
  console.log(userAddress);
  return (
    <>
      <Container maxWidth="lg" className="stepper-address">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Item>
                <Stepper />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Item className="order-address-details">
                <div className="order-details">
                  <div>
                    <h1>{orderedDetails.name}</h1>
                  </div>
                  <div>
                    <span>Quantity: {quantity}</span>
                  </div>
                  <div>
                    <span>Category: {orderedDetails?.category}</span>
                  </div>
                  <div>
                    <span>C{orderedDetails?.description}</span>
                  </div>
                  <div>
                    <h1>Total Price : {orderedDetails?.price * quantity}</h1>
                  </div>
                </div>
                <div className="divider-details">
                  <Divider orientation="vertical" />
                </div>
                <div className="address-details">
                  <div>
                    <p>
                      <b>Address Details :</b>{" "}
                    </p>
                  </div>
                  <div className="details-user-address">{userAddress}</div>
                </div>
              </Item>
            </Grid>
          </Grid>
          <div className="back-place-order">
            <Button onClick={handleBack}>Back</Button>
            <Button
              disabled={steps === 3}
              onClick={handlePlaceOrder}
              variant="contained"
            >
              PLACE ORDER
            </Button>
          </div>
        </Box>
      </Container>
    </>
  );
}
