import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL ='http://localhost:5000/';

export const loginuser = createAsyncThunk('loginuser', async ({email,password}:any,thunkAPI) => {
  
  return await axios
      .post(baseURL+"api/login", {email,password})
      .then((res) => {
        return res.data
       
      }).catch((err) => {
          return thunkAPI.rejectWithValue(err.response.data.error);
      })
})

 export const registeruser =createAsyncThunk('registeruser',async({email,username,password}:any,thunkAPI)=>{
  return await axios
      .post(baseURL+"api/register", {email,username,password})
      .then((res) => {
        return res.data
      }).catch((err) => {
          
          return thunkAPI.rejectWithValue(err.response.data.error);
      })
})

export const reAuth =createAsyncThunk('reAuth',async({token}:any,thunkAPI)=>{
  
    return await axios
      .get(baseURL+"verifyusertoken",{headers: {
        "auth-token": token
    }})
      .then((res) => {
        return res.data
       
      }).catch((err) => {
        if (err.response.status === 400) {
          return thunkAPI.rejectWithValue(err.response.data);
        }
        else if(err.response.status === 401){
          return thunkAPI.rejectWithValue(err.response.error);
        }
        else{
          return thunkAPI.rejectWithValue("Something went wrong");
        }
      })
  })