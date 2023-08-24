import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
export default function ProductDetails() {
  const { id } = useParams();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [state, setState] = React.useState({
    productDetails: {},
  });

  const { productDetails } = state;
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

  console.log(productDetails);
  return (
    <>
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
              <p style={{ color: "red" }}>&#8377;{productDetails.price}</p>
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
                <Button variant="contained">Place Order</Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
