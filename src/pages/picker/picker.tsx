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

export default function Picker() {
  const dispatch = useDispatch();
  const heros = useSelector(
    (state: RootState) => state.predictreducer.heroList
  );
  interface herosList {
    id: number;
    localized_name: string;
  }
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
          onChange={(event, value) => {}}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card sx={{ display: "flex", width: "100%" }}>
          <CardContent sx={{ flex: "1 0 auto", width: "60%" }}>
            <Typography component="div" variant="h6">
              Ember Spirit
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Able to transform enemy attacks into self-healing, Abaddon can
              survive almost any assault. Shielding allies and launching his
              double-edged coil at a friend or foe, he is always ready to ride
              into the thick of battle.
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: "auto" }}
            image="/images/heros/105.png"
            alt="Hero portrait"
          />
        </Card>
      </Grid>
    </Grid>
  );
}
