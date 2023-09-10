import { createSlice } from "@reduxjs/toolkit";
import { matches } from "../../types/heroTypes";
import {get_matches} from "./matchAPI";

const initialState = {
    matches:<matches[]>[] 
}

export const MatchSlice=createSlice({
    name:"matches",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(get_matches.fulfilled,(state,action)=>{
            state.matches = action.payload.matches as matches[]
        })
    }
})  