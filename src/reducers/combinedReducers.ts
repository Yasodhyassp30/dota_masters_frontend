import {authSlice} from './authReducers/authReducer';
import {combineReducers } from '@reduxjs/toolkit'
import {TeamBoardSlice} from './predictReducer/predictReducer';


export const rootReducer = combineReducers(
    {
        authreducer:authSlice.reducer,
        predictreducer:TeamBoardSlice.reducer
    }
    );
  
export type RootState = ReturnType<typeof rootReducer>