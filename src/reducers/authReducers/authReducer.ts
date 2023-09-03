import { createSlice } from "@reduxjs/toolkit";
import { User, userReturn } from "../../types/userTypes";
import { loginuser, registeruser } from "./authAPI";

let currentUser: User = {
  username: "",
  email: "",
  id: "",
  token: "",
};


const session = localStorage.getItem("users");

if (typeof session == "string"&& session) {
  const returned: User = JSON.parse(session);
  currentUser = {
    username: returned.username,
    email: returned.email,
    token: returned.token,
    id: returned.id,
  };
}

const initialState = (currentUser.token!=="")?{ isLoggedIn: true, user: currentUser, error: "" }:{ isLoggedIn: false, user: currentUser, error: "" };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("users");
      state.isLoggedIn = false;
      state.user = currentUser;
    },
    SetErrors:(state,action)=>{
      console.log(action.payload)
      state.error =action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registeruser.fulfilled, (state, action) => {
      const returned: userReturn = action.payload;
      currentUser = {
        username: returned.user.username,
        email: returned.user.email,
        token: returned.user.token,
        id: returned.user._id,
      };
      state.user =currentUser
      localStorage.setItem("users", JSON.stringify(currentUser));
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(registeruser.rejected, (state, action: any) => {
      state.isLoggedIn = false;
      state.error = action.payload;
      state.user = currentUser;
    });
    builder.addCase(loginuser.fulfilled, (state, action) => {
      const returned: userReturn = action.payload;
      currentUser = {
        username: returned.user.username,
        email: returned.user.email,
        token: returned.user.token,
        id: returned.user._id,
      };
      localStorage.setItem("users", JSON.stringify(currentUser));
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = "";
      state.user =currentUser
    });
    builder.addCase(loginuser.rejected, (state, action: any) => {
      state.isLoggedIn = false;
      state.error = action.payload;
      state.user = currentUser;
    });
  },
});

