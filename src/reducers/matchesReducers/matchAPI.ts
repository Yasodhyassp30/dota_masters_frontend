import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axiosConfig";


export const get_matches = createAsyncThunk('getMatches',async ({page}:any,thunkAPI)=>{
    return await instance.post("api/get_matches",{
        page
    }).then((res)=>{
        return res.data
    }).catch((err)=>{
        return thunkAPI.rejectWithValue(err.response.data.error)
    })
})
