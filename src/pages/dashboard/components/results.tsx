import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers/combinedReducers";
import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";

export default function Results() {
  const results = useSelector(
    (state: RootState) => state.predictreducer.prediction
  );
  const radiant = { value: results[0].value };
  const dire = { value: results[1].value };
  const fontStyles = {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 700,
    fontSize: "1rem",
    color: "black",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    textAlign: "center",
    letterSpacing: "1px",
    paddingTop: "1rem",
    marginBottom: "16px",
  };
  return (

     <Grid container spacing={0}>
      <Grid item xs={12} lg={5.5} >
      <Box
          sx={{ margin: "1rem", textAlign: "center", backgroundColor:"white", borderRadius:"1rem" }}
        >
        <Typography variant="h2" sx={fontStyles}>
          Radiant Win Probability
        </Typography>
        <Box
          sx={{ position: "relative", display: "inline-flex", margin: "1rem" }}
        >
          <CircularProgress
            variant="determinate"
            {...radiant}
            color="success"
            size={200}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              height: "100%",
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
             <Typography
              variant="h4"
              component="div"
              color="text.secondary"
            >{`${results[0].value}%`}</Typography>
          </Box>
        </Box>
        </Box>
        </Grid>
        <Grid item lg={1} >
            </Grid>
        <Grid item xs={12} lg={5.5} >
      <Box
          sx={{ margin: "1rem", textAlign: "center", backgroundColor:"white", borderRadius:"1rem" }}
        >
        <Typography variant="h2" sx={fontStyles}>
          Dire Win Probability
        </Typography>
        <Box
          sx={{ position: "relative", display: "inline-flex", margin: "1rem" }}
        >
          <CircularProgress
            variant="determinate"
            {...dire}
            color="error"
            size={200}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              height: "100%",
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize:"1rem"
            }}
          >
            <Typography
              variant="h4"
              component="div"
              color="text.secondary"
            >{`${results[1].value}%`}</Typography>
          </Box>
        </Box>
        </Box>
        </Grid>
      </Grid>
  );
}
