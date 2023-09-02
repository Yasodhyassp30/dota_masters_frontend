import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers/combinedReducers";
import { AppDispatch } from "../..";
import { loginuser } from "../../reducers/authReducers/authAPI";
import { FormikErrors, useFormik } from "formik";
import { useState } from "react";
import dota_logo from "./images/dota_logo.png";

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>()
  const error = useSelector((state: RootState) => state.authreducer.error);
  
  interface validation {
    email: string | null;
    password: string | null;
  }
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () =>
    setShowPassword((show: boolean) => !show);

  const validate = (values: validation) => {
    const errors: FormikErrors<validation> ={};
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Must be 8 characters";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
      dispatch(loginuser({
        email:values.email, 
        password:values.password}))
    },
  });
  return (
    <div>
      <Box
        sx={{
          "& .MuiOutlinedInput-root": {
            marginBottom: "10px",
            width: "100%",
            fontSize: "0.9rem",
          },
        }}
      >
        <form onSubmit={(e)=>{
            e.preventDefault()
            formik.handleSubmit()
        }}>
        <div style={
            {
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
            }
        }>
        <img src={dota_logo} alt="dota_logo" style={{ width: "100%" }} />
        
        </div>
        <label
          htmlFor="api_error"
          style={{
            color: "red",
            fontSize: "0.7rem",
          }}
        >
          {error}
        </label>
        <label
          htmlFor="email_error"
          style={{
            color: "red",
            fontSize: "0.7rem"
          }}
        >
          {formik.touched.email ? formik.errors.email : ""}
        </label>
        <TextField
          type="email"
          id="email"
          required
          size="small"
          placeholder="Email"
          fullWidth
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label
          htmlFor="password_error"
          style={{
            color: "red",
            fontSize: "0.7rem",
          }}
        >
          {formik.touched.password ? formik.errors.password : ""}
        </label>
        <OutlinedInput
          id="password"
          required
          size="small"
          placeholder="Password"
          fullWidth
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? (
                  <Visibility fontSize="small" />
                ) : (
                  <VisibilityOff fontSize="small" />
                )}
              </IconButton>
            </InputAdornment>
          }
        />

        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: "#7393B3",
            color: "white",
            width: "100%",
            marginTop: "1rem",
            fontSize: "0.8rem",
          }}
        >
          Login
        </Button>
        </form>
        <Link href="/register" underline="none"  fontSize={12}>
            {'New User ? Register here'}
        </Link>
      </Box>
    </div>
  );
}
