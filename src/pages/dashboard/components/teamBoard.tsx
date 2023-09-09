import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { ClearAll, Edit } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { TeamBoardSlice } from "../../../reducers/predictReducer/predictReducer";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../../reducers/combinedReducers";
import { useState } from "react";
import { predict } from "../../../reducers/predictReducer/predictAPI";
import { AppDispatch } from "../../..";
import { hero } from "../../../types/heroTypes";

export default function Teamboard() {
  const radiantHeroes = useSelector(
    (state: RootState) => state.predictreducer.radiantHeroes
  );
  const direHeroes = useSelector(
    (state: RootState) => state.predictreducer.direHeroes
  );
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const error = useSelector((state: RootState) => state.predictreducer.error);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const fontStyles = {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 700,
    fontSize: "1rem",
    color: "#FFFFFF",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    textAlign: "center",
    letterSpacing: "1px",
    marginTop: "16px",
    marginBottom: "16px",
  };
  const cardStyles = {
    width: "100%",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "start",
    padding: "0.2rem",
    height: "100%",
  };
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={5}>
        <Typography variant="h2" sx={fontStyles}>
          Team Radiant
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {radiantHeroes.map((hero, index) => {
            return (
              <Grid
                item
                key={index}
                sx={{
                  margin: "0.5rem",
                  width: "100%",
                }}
              >
                <Card sx={cardStyles}>
                  <CardMedia
                    component="img"
                    image={
                      hero.id === 0
                        ? "/images/other/profile.png"
                        : "/images/heros/" + hero.id + ".png"
                    }
                  />
                  <CardContent
                    sx={{
                      padding: "2px",
                      flex:"1"
                    }}
                  >
                    <Typography
                      fontSize={"0.8rem"}
                      fontWeight={"600"}
                      variant="h5"
                      component="div"
                    >
                      {hero.id === 0 ? "Pick Hero" : hero.name}
                    </Typography>
                    <Typography
                      fontSize={"0.7rem"}
                      variant="body2"
                      color="text.secondary"
                    >
                      {hero.position === 0
                        ? "Pick"
                        : "Position :" + hero.position}
                    </Typography>
                    <Typography
                      fontSize={"0.6rem"}
                      variant="body2"
                      color="green"
                    >
                      {hero.id === 0 ? "" : "GPM :" + hero.gpm}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      onClick={() => {
                        dispatch(
                          TeamBoardSlice.actions.openPopup({
                            isRadiant: true,
                            position: index,
                          })
                        );
                      }}
                    >
                      <Edit
                        sx={{
                          fontSize: "1rem",
                        }}
                      />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </div>
      </Grid>
      <Grid item xs={12} lg={2}>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{
              width: "60%",
              maxWidth: "150px",
              objectFit: "fill",
            }}
            alt="Vs"
            src="/images/other/vs.png"
          />
        </div>
      </Grid>
      <Grid item xs={12} lg={5}>
        <Typography variant="h1" sx={fontStyles}>
          Team Dire
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {direHeroes.map((hero, index) => {
            return (
              <Grid
                item
                key={index}
                sx={{
                  margin: "0.5rem",
                  width: "100%",
                }}
              >
                <Card sx={cardStyles}>
                  <CardMedia
                    component="img"
                    image={
                      hero.id === 0
                        ? "/images/other/profile.png"
                        : "/images/heros/" + hero.id + ".png"
                    }
                  />
                  <CardContent
                    sx={{
                      padding: "2px",
                      flex:"1"
                    }}
                  >
                    <Typography
                      fontSize={"0.8rem"}
                      fontWeight={"600"}
                      variant="h5"
                      component="div"
                    >
                      {hero.id === 0 ? "Pick Hero" : hero.name}
                    </Typography>
                    <Typography
                      fontSize={"0.7rem"}
                      variant="body2"
                      color="text.secondary"
                    >
                      {hero.position === 0
                        ? "Pick"
                        : "Position :" + hero.position}
                    </Typography>
                    <Typography
                      fontSize={"0.6rem"}
                      variant="body2"
                      color="green"
                    >
                      {hero.id === 0 ? "" : "GPM :" + hero.gpm}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      onClick={() => {
                        dispatch(
                          TeamBoardSlice.actions.openPopup({
                            isRadiant: false,
                            position: index,
                          })
                        );
                      }}
                    >
                      <Edit
                        sx={{
                          fontSize: "1rem",
                        }}
                      />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </div>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          padding: "1rem",
        }}
      >
        <Button
          variant="contained"
          size="large"
          startIcon={<CheckCircleOutlineIcon />}
          color="success"
          onClick={() => {
            const radiantCheck = radiantHeroes.filter((hero) => hero.id === 0);
            const direCheck = direHeroes.filter((hero) => hero.id === 0);

            if (radiantCheck.length === 0 && direCheck.length === 0) {
              dispatch(
                predict({
                  radiant: radiantHeroes ,
                  dire: direHeroes ,
                })
              );
            } else {
              dispatch(
                TeamBoardSlice.actions.setErrors("Please pick all heroes")
              );
              setOpen(true);
            }
          }}
        >
          Predict Win
        </Button>

        <Button
          variant="contained"
          size="large"
          startIcon={<ClearAll />}
          color="error"
          sx={{
            marginLeft: "1rem",
          }}
          onClick={() => {
           
              dispatch(
                TeamBoardSlice.actions.resetHeroes()
              );
             
            
          }}
        >
          Clear All
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
}
