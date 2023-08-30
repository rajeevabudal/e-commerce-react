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
import Stepper from "../../common/stepper/stepper";
import "./confirmorder.css";
import { getSteps } from "../../redux/productSlice";

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
  const handleNext = () => {
    dispatch(getSteps(steps + 1));
  };
  const handleBack = () => {
    dispatch(getSteps(steps - 1));
    navigate(-1);
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

      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Item>xs=12</Item>
            </Grid>
          </Grid>
          <Button onClick={handleBack}>Back</Button>
          <Button disabled={steps === 3}onClick={handleNext}>Next</Button>
        </Box>
      </Container>
    </>
  );
}
