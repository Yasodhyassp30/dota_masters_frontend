import { Grid } from "@mui/material";
import register_background from "./images/register_background.jpg";
import RegisterForm from "./form";

export default function Register() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundPosition: "center",
        backgroundImage: `url(${register_background})`,
        backgroundSize: "cover",
      }}
    >
      <Grid container spacing={0}>
        <Grid item xs={2} sm={4} lg={5}></Grid>
        <Grid item xs={8} sm={4} lg={2}
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            width: "100%",
            padding: "15px",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <RegisterForm />
        </Grid>
        <Grid item xs={2} sm={4} lg={5}></Grid>
      </Grid>
    </div>
  );
}
