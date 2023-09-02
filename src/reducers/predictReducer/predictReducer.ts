import { createSlice } from "@reduxjs/toolkit";
import { hero } from "../../types/heroTypes";


const inititalHeros: hero[] = Array(5).fill({
    id: 0,
    position: 0,
    gpm: 0,
  });

const initialState = {
    radiantHeroes:inititalHeros,
    direHeroes:inititalHeros,
    loading:false,
}

export const TeamBoardSlice = createSlice({
  name: "predict",
  initialState,
  reducers: {
    addHeroRadiant: (state,action) => {
     state.radiantHeroes[action.payload.position] = action.payload.hero;
    },
    addHerosDire:(state,action)=>{
     state.direHeroes[action.payload.position] = action.payload.hero;
    }
  },
  extraReducers: (builder) => {},
});

