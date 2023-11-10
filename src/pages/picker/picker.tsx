import {
  Autocomplete,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers/combinedReducers";
import CounterPicks from "./components/counterPicks";
import { TeamBoardSlice } from "../../reducers/predictReducer/predictReducer";
import { AppDispatch } from "../..";
import { counter, getHeros } from "../../reducers/predictReducer/predictAPI";
import { useEffect } from "react";

export default function Picker() {
  const dispatch = useDispatch<AppDispatch>();
  const heros = useSelector(
    (state: RootState) => state.predictreducer.heroList
  );
  const SelectedHero = useSelector(
    (state: RootState) => state.predictreducer.pickerHero
  );
  interface herosList {
    id: number;
    localized_name: string;
  }

  useEffect(() => {
    dispatch(getHeros({}));
    
  }, []);
  return (
    <Grid
      container
      spacing={1}
      sx={{
        padding: "1rem",
      }}
    >
      <Grid item xs={12} lg={6}>
        <Autocomplete
          size="small"
          options={heros}
          disablePortal
          getOptionLabel={(option: herosList) => option.localized_name}
          sx={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }}
          renderInput={(params) => <TextField {...params} label="Hero" />}
          onChange={(event, value) => {
            if(value){
              dispatch(TeamBoardSlice.actions.selectHero(value.id));
              dispatch(counter({hero:value.id}));
            }
          }}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
       {(SelectedHero.id!=0)? <Card sx={{ display: "flex", width: "100%" }}>
          <CardContent sx={{ flex: "1 0 auto", width: "60%" }}>
            <Typography component="div" variant="h6">
              {SelectedHero.localized_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {SelectedHero.description}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: "auto" }}
            image={"/images/heros/" + SelectedHero.id + ".png"}
            alt="Hero portrait"
          />
        </Card>:<div></div>}
      </Grid>
        <CounterPicks/>
    </Grid>
  );
}
