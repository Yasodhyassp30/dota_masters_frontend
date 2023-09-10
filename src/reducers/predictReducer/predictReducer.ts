import { createSlice } from "@reduxjs/toolkit";
import { hero } from "../../types/heroTypes";
import { getHeros, predict, save_match } from "./predictAPI";

const inititalHeros: hero[] = Array(5).fill({
  id: 0,
  position: 0,
  gpm: 0,
  name: "",
});

const initialState = {
  radiantHeroes: inititalHeros,
  direHeroes: inititalHeros,
  heroList: [],
  loading: false,
  predicted: true,
  popup: false,
  isRadiant: true,
  currentPosition: 0,
  error: "",
  prediction: [
    {
      value: 0,
      id: 0,
      label: "Radiant",
    },
    {
      value: 0,
      id: 1,
      label: "Dire",
    },
  ],
};

export const TeamBoardSlice = createSlice({
  name: "predict",
  initialState,
  reducers: {
    addHero: (state, action) => {
      state.radiantHeroes.forEach((hero, index) => {
        if (
          hero.id === action.payload.hero.id ||
          (hero.position === action.payload.hero.position && state.isRadiant)
        ) {
          state.radiantHeroes[index] = {
            id: 0,
            position: 0,
            gpm: 0,
            name: "",
          };
        }
      });
      state.direHeroes.forEach((hero, index) => {
        if (
          hero.id === action.payload.hero.id ||
          (hero.position === action.payload.hero.position && !state.isRadiant)
        ) {
          state.direHeroes[index] = {
            id: 0,
            position: 0,
            gpm: 0,
            name: "",
          };
        }
      });
      if (state.isRadiant) {
        state.radiantHeroes[state.currentPosition] = action.payload.hero;
      } else {
        state.direHeroes[state.currentPosition] = action.payload.hero;
      }
    },
    setErrors: (state, action) => {
      state.error = action.payload;
    },
    closePopup: (state) => {
      state.popup = false;
    },
    openPopup: (state, action) => {
      state.isRadiant = action.payload.isRadiant;
      state.currentPosition = action.payload.position;
      state.popup = true;
    },
    resetHeroes: (state) => {
      state.radiantHeroes = inititalHeros;
      state.direHeroes = inititalHeros;
      state.predicted = false;
      state.prediction = [
        {
          value: 0,
          id: 0,
          label: "Radiant",
        },
        {
          value: 0,
          id: 1,
          label: "Dire",
        },
      ];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHeros.fulfilled, (state, action) => {
      state.loading = false;
      const returned: string = action.payload.heros;
      const heros = JSON.parse(returned);
      state.heroList = heros;
    });
    builder.addCase(getHeros.rejected, (state, action) => {
      state.loading = false;
      state.heroList = [];
      state.error = action.payload as string;
    });
    builder.addCase(predict.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      const result = JSON.parse(action.payload.prediction);
      state.prediction[0].value =
        (result[0] as number) * 100 <= 1
          ? 1
          : Math.floor((result[0] as number) * 100);
      state.prediction[1].value = 100 - state.prediction[0].value;
      state.predicted = true;
    });
    builder.addCase(save_match.fulfilled, (state, action) => {
      state.predicted = false;
    });
  },
});
