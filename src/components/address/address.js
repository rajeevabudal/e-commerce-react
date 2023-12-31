import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Creatable from "react-select/creatable";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Select from "react-select";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Stepper from "../../common/stepper/stepper";
import { getAddress, getSteps } from "../../redux/productSlice";
import "./address.css";

let options = [];
const createOption = (label, value) => ({
  label,
  value: value,
});
const defaultTheme = createTheme();
export default function SelectAddress() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [addressData, setAddressData] = React.useState([]);
  const [addressId, setAddressId] = React.useState(0);
  const [state, setState] = React.useState({
    vertical: "top",
    horizontal: "right",
    error: "",
    open: false,
    isError: false,
  });

  const { isError, vertical, horizontal, error, open } = state;
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    options = addressData;
    let arrayAddress = [];
    axios
      .get("http://localhost:8080/api/addresses", axiosConfig)
      .then((response) => {

        response.data.map((address) => {
          arrayAddress.push(
            createOption(
              address.name + "--->" + address.street + "," + address.city,
              address
            )
          );
          setAddressData(arrayAddress);
        });
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  const steps = useSelector((state) => state.product.steps);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const data = new FormData(event.currentTarget);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let addressSubmitData = {
      name: data.get("Name"),
      contactNumber: data.get("ContactNumber"),
      street: data.get("Street"),
      city: data.get("City"),
      state: data.get("State"),
      landmark: data.get("Landmark"),
      zipcode: data.get("ZipCode"),
      user: user,
    };
    let isAddressAvailableToSave = true;
    if (
      addressSubmitData.name === "" &&
      addressSubmitData.contactNumber === "" &&
      addressSubmitData.street === "" &&
      addressSubmitData.city === "" &&
      addressSubmitData.state === "" &&
      addressSubmitData.landmark === "" &&
      addressSubmitData.zipcode === ""
    ) {
      isAddressAvailableToSave = false;
      setState({ ...state, isError: true, error: "All Fields Are Mandatory", open: true});
    }
    isAddressAvailableToSave &&
      axios
        .post(
          "http://localhost:8080/api/addresses",
          addressSubmitData,
          axiosConfig
        )
        .then((res) => console.log(res.data))
        .catch((error) => {
          console.log(error);
        });
  };

  const handleBack = () => {
    navigate(-1);
    dispatch(getSteps(steps - 1));
  };

  const handleNext = () => {
    if (addressId !== 0) {
      const token = localStorage.getItem("token");
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      navigate("/products/confirmOrder");

      dispatch(getSteps(steps + 1));

      axios
        .get(`http://localhost:8080/api/addresses/${addressId}`, axiosConfig)
        .then((response) => {
          dispatch(getAddress(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setState({ ...state, isError: true, error: "Please select address", open: true});
    }
  };

  const handleSelectAddress = (selectedValue) => {
    setAddressId(selectedValue?.value?.id);
  };

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
      <Grid sx={{ flexGrow: 1 }} className="address-commerce">
        <p>Select Address</p>
        <Select
          options={addressData}
          onChange={(newValue) => handleSelectAddress(newValue)}
        />
        <span className="address-span">-OR-</span>
        <span className="address-span">
          <Typography component="h1" variant="h5">
            Add Address
          </Typography>
        </span>
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
                      //   onChange={(e) => handleChange("name", e)}
                      //   value={name}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="ContactNumber"
                      label="Contact Number"
                      //onChange={(e) => handleChange("manufacturer", e)}
                      name="ContactNumber"
                      //value={manufacturer}
                      autoComplete="ContactNumber"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="Street"
                      label="Street"
                      id="Street"
                      autoComplete="Street"
                      //   onChange={(e) => handleChange("availableItems", e)}
                      //   value={availableItems}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="City"
                      label="City"
                      id="City"
                      autoComplete="City"
                      //   onChange={(e) => handleChange("price", e)}
                      //   value={price}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="State"
                      label="State"
                      type="text"
                      id="State"
                      autoComplete="State"
                      //   onChange={(e) => handleChange("imageUrl", e)}
                      //   value={imageUrl}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="Landmark"
                      label="Landmark"
                      type="text"
                      id="Landmark"
                      autoComplete="Landmark"
                      //   onChange={(e) => handleChange("description", e)}
                      //value={description}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="ZipCode"
                      label="Zip Code"
                      type="text"
                      id="ZipCode"
                      autoComplete="ZipCode"
                      //   onChange={(e) => handleChange("description", e)}
                      //value={description}
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
                  SAVE ADDRESS
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
        <div className="address-btn">
          <Button
            type="submit"
            fullWidth
            variant="text"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </Grid>
      {isError && displayErrorMessage()}
    </>
  );
}
