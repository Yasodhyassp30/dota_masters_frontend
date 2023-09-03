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