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

export const provide_feedback = createAsyncThunk('provideFeedback',async({id,feedback}:any,thunkAPI)=>{
    return await instance.put("api/provide_feedback",{
        id,
        feedback
    }).then((res)=>{
        return {
            msg:res.data.msg,
            id,
            feedback
        }
    }).catch((err)=>{
        return thunkAPI.rejectWithValue(err.response.data.error)
    })
})