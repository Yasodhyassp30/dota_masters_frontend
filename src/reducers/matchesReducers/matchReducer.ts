import { createSlice } from "@reduxjs/toolkit";
import { matches } from "../../types/heroTypes";
import {delete_match, get_matches,provide_feedback} from "./matchAPI";

const initialState = {
    matches:<matches[]>[],
    msg:"" ,
    openSnackBar:false
}

export const MatchSlice=createSlice({
    name:"matches",
    initialState,
    reducers:{
        snackBarClose:(state)=>{
            state.openSnackBar =false;
        },
        snackBarOpen:(state)=>{
            state.openSnackBar = true;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(get_matches.fulfilled,(state,action)=>{
            state.matches = action.payload.matches as matches[]
        });
        builder.addCase(provide_feedback.fulfilled,(state,action)=>{
            state.msg =action.payload.msg
            state.matches.forEach((match)=>{
                if(match._id.$oid === action.payload.id){ 
                    match.feedback =action.payload.feedback
                    state.openSnackBar = true
                }
            })

        });
        builder.addCase(delete_match.fulfilled,(state,action)=>{
            state.msg =action.payload.msg
            state.matches = state.matches.filter((match)=>match._id.$oid!==action.payload.id)
            state.openSnackBar = true
        })
    }
})  