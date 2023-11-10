import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axiosConfig";


export const getHeros = createAsyncThunk('getHeros', async ({}:any,thunkAPI) => {
  
  return await instance
      .get("api/get_heros")
      .then((res) => {
       
        return res.data
      }).catch((err) => {
          return thunkAPI.rejectWithValue(err.response.data.error);
      })
})

export const predict = createAsyncThunk('predict', async ({radiant,dire}:any,thunkAPI) => {
  return await instance.post("api/predict",{
    radiant:radiant,
    dire:dire
  }).then((res)=>{
    return res.data;
  }).catch((err)=>{
    return thunkAPI.rejectWithValue(err.response.data.error);
  })
})

export const counter = createAsyncThunk('counter', async ({hero}:any,thunkAPI) => {
  return await instance.post("api/counter",{
    hero
  }).then((res)=>{
    return res.data;
  }).catch((err)=>{
    return thunkAPI.rejectWithValue(err.response.data.error);
  })
})

export const save_match = createAsyncThunk('save_match', async ({radiant,dire,prediction}:any,thunkAPI) => {
  return await instance.post("api/save_match",{
    radiant:radiant,
    dire:dire,
    created: new Date().toDateString(),
    prediction:prediction
  }).then((res)=>{
    return res.data;
  }).catch((err)=>{
    return thunkAPI.rejectWithValue(err.response.data.error);
  })
})
