import {authSlice} from './authReducers/authReducer';
import {combineReducers } from '@reduxjs/toolkit'
import {TeamBoardSlice} from './predictReducer/predictReducer';
import { MatchSlice } from './matchesReducers/matchReducer';


export const rootReducer = combineReducers(
    {
        authreducer:authSlice.reducer,
        predictreducer:TeamBoardSlice.reducer,
        matchesreducer:MatchSlice.reducer
    }
    );
  
export type RootState = ReturnType<typeof rootReducer>