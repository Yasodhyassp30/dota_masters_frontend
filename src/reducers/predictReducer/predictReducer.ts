import { createSlice } from "@reduxjs/toolkit";
import { hero } from "../../types/heroTypes";
import {getHeros} from './predictAPI';


const inititalHeros: hero[] = Array(5).fill({
    id: 0,
    position: 0,
    gpm: 0,
    name:""
  });

const initialState = {
    radiantHeroes:inititalHeros,
    direHeroes:inititalHeros,
    heroList:[],
    loading:false,
    popup:false,
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
    },
    closePopup:(state)=>{
      state.popup = false;
    },
    openPopup:(state)=>{
      state.popup = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getHeros.fulfilled, (state, action) => {
      state.loading = false;
      const returned:string = action.payload.heros;
      const heros = JSON.parse(returned);
      state.heroList = heros;
    });
    builder.addCase(getHeros.rejected, (state, action) => {
      state.loading = false;
      state.heroList = [];
    })
  },
});

