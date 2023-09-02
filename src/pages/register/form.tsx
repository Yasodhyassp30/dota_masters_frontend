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
import { registeruser } from "../../reducers/authReducers/authAPI";
import { FormikErrors, useFormik } from "formik";
import { useState } from "react";
import dota_logo from "./images/dota_logo.png";

export default function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>()
  const error = useSelector((state: RootState) => state.authreducer.error);
  
  interface validation {
    email: string | null;
    password: string | null;
    username: string | null;
    confirmPassword: string | null;
  }
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () =>
    setShowPassword((show: boolean) => !show);

  const validate = (values: validation) => {
    const errors: FormikErrors<validation> ={};
    if (!values.username) {
      errors.username = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Must be 8 characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Required";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Password does not match";
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
      dispatch(registeruser({username:values.username, 
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
          htmlFor="username_error"
          style={{
            color: "red",
            fontSize: "0.7rem",
          }}
        >
          {formik.touched.username ? formik.errors.username : ""}
        </label>
        <OutlinedInput
          id="username"
          required
          size="small"
          placeholder="Username"
          fullWidth
          value={formik.values.username}
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
        <label
          htmlFor="cpassword_error"
          style={{
            color: "red",
            fontSize: "0.7rem",
          }}
        >
          {formik.touched.confirmPassword ? formik.errors.confirmPassword : ""}
        </label>
        <OutlinedInput
          required
          id="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          size="small"
          placeholder="Confirm Password"
          fullWidth
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
          Register
        </Button>
        </form>
        <Link href="/login" underline="none"  fontSize={12}>
            {'Already have an account? Login'}
        </Link>
      </Box>
    </div>
  );
}
