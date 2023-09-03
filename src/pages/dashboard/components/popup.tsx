import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { RootState } from "../../../reducers/combinedReducers";
import { TeamBoardSlice } from "../../../reducers/predictReducer/predictReducer";
import { useEffect, useState } from "react";

export default function Popup() {
  const open = useSelector((state: RootState) => state.predictreducer.popup);
  const options = useSelector(
    (state: RootState) => state.predictreducer.heroList
  );
  const dispatch = useDispatch();
  const [hero, setHero] = useState({
    id: 0,
    name: "",
    gpm: 0,
    position:0
  });
  const handleClose = () => {
    dispatch(TeamBoardSlice.actions.closePopup());
  };

  const handleChange = (event:SelectChangeEvent<number>) => {
    setHero({...hero,
        position: parseInt(event.target.value as string)} );
  };
  interface herosList {
    id: number;
    localized_name: string;
  }
  useEffect(() => {
    setHero({...hero})
  },[hero.position])
  return (
    <Dialog open={open} onClose={()=>{
        handleClose()
        setHero({
            id: 0,
            name: "",
            gpm: 0,
            position:0
        })
    }} maxWidth="sm">
      <DialogTitle>Pick Hero</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Autocomplete
              size="small"
              options={options}
              disablePortal
              getOptionLabel={(option: herosList) => option.localized_name}
              sx={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }}
              renderInput={(params) => <TextField {...params} label="Hero" />}
              onChange={(event, value) => {
                if (value) {
                  setHero({
                    id: value.id,
                    name: value.localized_name,
                    gpm: 0,
                    position:0
                  });
                }
              }}
            />

            <TextField
              sx={{ width: "100%", marginBottom: "1rem" }}
              label="Hero GPM"
              size="small"
              onChange={(event) => {
                setHero({
                  ...hero,
                  gpm: parseInt(event.target.value),
                });
              }}
            />
           <Select
                size="small"
                value={hero.position}
                onChange={handleChange}
            >   <MenuItem value={0}>Pick a Position</MenuItem>
                <MenuItem value={1}>Position 1</MenuItem>
                <MenuItem value={2}>Position 2</MenuItem>
                <MenuItem value={3}>Position 3</MenuItem>
                <MenuItem value={4}>Position 4</MenuItem>
                <MenuItem value={5}>Position 5</MenuItem>
            </Select>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={
                hero.id !== 0
                  ? `/images/heros/${hero.id}.jpg`
                  : "/images/other/profile.png"
              }
              alt="hero"
              style={{ width: "60%" }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
            setHero({
              id: 0,
              name: "",
              gpm: 0,
              position:0
            });
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            dispatch(TeamBoardSlice.actions.addHeroRadiant({hero:hero,position:hero.position}));
            setHero({
              id: 0,
              name: "",
              gpm: 0,
              position:0
            });
            handleClose();
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
