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
import { hero } from "../../../types/heroTypes";

export default function Popup() {
  const open = useSelector((state: RootState) => state.predictreducer.popup);
  const radiantHeroes = useSelector((state:RootState) => state.predictreducer.radiantHeroes);
  const direHeroes = useSelector((state:RootState) => state.predictreducer.direHeroes);
  const isRadiant = useSelector((state:RootState) => state.predictreducer.isRadiant);
  const position = useSelector((state:RootState) => state.predictreducer.currentPosition);
  interface herosList {
    id: number;
    localized_name: string;
  }
  const options = useSelector(
    (state: RootState) => state.predictreducer.heroList
  );
  const [postions,setPositions] = useState<number[]>([1,2,3,4,5])
  const [error,setError] = useState(" ")
  const dispatch = useDispatch();
  const [hero, setHero] = useState({
    id: (isRadiant)?radiantHeroes[position].id:direHeroes[position].id,
    name: (isRadiant)?radiantHeroes[position].name:direHeroes[position].name,
    gpm: (isRadiant)?radiantHeroes[position].gpm:direHeroes[position].gpm||0,
    position:(isRadiant)?radiantHeroes[position].position:direHeroes[position].position
  });
  
  const handleClose = () => {
    setError("")
    dispatch(TeamBoardSlice.actions.closePopup());
  };

  const handleChange = (event:SelectChangeEvent<number>) => {
    setHero({...hero,
        position: parseInt(event.target.value as string)} );
  };


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
        <p style={{
          color:"red",
          fontSize:"0.8rem",
        }}>{error}</p>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Autocomplete
              size="small"
              options={options}
              disablePortal
              value={
                {
                id: hero.id,
                localized_name: hero.name
                }}
              getOptionLabel={(option: herosList) => option.localized_name}
              sx={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }}
              renderInput={(params) => <TextField {...params} label="Hero" />}
              onChange={(event, value) => {
                if (value) {
                  setHero({
                    ...hero,
                    id: value.id,
                    name: value.localized_name,
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
                
            >   
            <MenuItem key={0} value={0}>Pick a Position</MenuItem>
            {postions.map((position:number)=>{
              return (<MenuItem key={position} value={position}>Position {position}</MenuItem>)
            })}
            
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
                  ? `/images/heros/${hero.id}.png`
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
            if(hero.id === 0||hero.gpm === 0||hero.position === 0){
              setError("Please fill all the fields")
              return;
            }
            
              dispatch(TeamBoardSlice.actions.addHero({hero:hero}));
            
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
