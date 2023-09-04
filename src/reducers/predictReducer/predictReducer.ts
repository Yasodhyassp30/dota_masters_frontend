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
    isRadiant:true,
    currentPosition:0,
    error:""
}

export const TeamBoardSlice = createSlice({
  name: "predict",
  initialState,
  reducers: {
    addHeroRadiant: (state,action) => {
     state.radiantHeroes[state.currentPosition] = action.payload.hero;
     
    },
    addHerosDire:(state,action)=>{
     state.direHeroes[state.currentPosition] = action.payload.hero;
    
    },
    closePopup:(state)=>{
      state.popup = false;
    },
    openPopup:(state,action)=>{
      state.isRadiant = action.payload.isRadiant;
      state.currentPosition = action.payload.position;
      state.popup = true;
    },
    resetHeroes:(state)=>{
      state.radiantHeroes = inititalHeros;
      state.direHeroes = inititalHeros;
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

