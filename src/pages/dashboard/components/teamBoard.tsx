import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Typography,
  } from "@mui/material";
  import { Edit } from "@mui/icons-material";
  import { useDispatch } from "react-redux";
  import { TeamBoardSlice } from "../../../reducers/predictReducer/predictReducer";
  import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
  import { useSelector } from "react-redux/es/hooks/useSelector";
  import { RootState } from "../../../reducers/combinedReducers";
  
  export default function Teamboard() {
    const radiantHeroes = useSelector((state:RootState) => state.predictreducer.radiantHeroes);
    const direHeroes = useSelector((state:RootState) => state.predictreducer.direHeroes);
    const dispatch = useDispatch();

    const fontStyles = {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 700,
      fontSize: '1rem',
      color: '#FFFFFF', 
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      textAlign: 'center',
      letterSpacing: '1px', 
      marginTop: '16px', 
      marginBottom: '16px'
    }
    const cardStyles = {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      textAlign: "start",
      padding: "0.2rem",
    }
    return (
        <Grid container spacing={0}>
          <Grid item xs={12} lg={5}>
          <Typography variant="h2" sx={fontStyles}>
          Team Radiant
          </Typography>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {radiantHeroes.map((hero, index) => {
                return (
                  <Grid
                    container
                    spacing={0}
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Grid
                      item
                      xs={8}
                      sx={{
                        margin: "0.5rem",
                      }}
                    >
                      <Card
                        sx={cardStyles}
                      >
                        <CardMedia
                          component="img"
                          image={(hero.id===0)?"/images/other/profile.png":"/images/heros/"+hero.id+".jpg"}
                        />
                        <CardContent
                          sx={{
                            padding: "2px",
                          }}
                        >
                          <Typography
                            fontSize={"0.8rem"}
                            fontWeight={"600"}
                            variant="h5"
                            component="div"
                          >
                            {(hero.id===0)?"Pick Hero":hero.name}
                          </Typography>
                          <Typography
                            fontSize={"0.7rem"}
                            variant="body2"
                            color="text.secondary"
                          >
                             {(hero.position===0)?"Pick":"Position :"+ hero.position}
                          </Typography>
                          <Typography
                            fontSize={"0.6rem"}
                            variant="body2"
                            color="green"
                          >
                            {(hero.id===0)?"":"GPM :"+ hero.gpm}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <IconButton   onClick={() => {
                                dispatch(TeamBoardSlice.actions.openPopup())
                              }}>
                            <Edit
                              sx={{
                                fontSize: "1rem",
                              }}

                            
                            />

                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  </Grid>
                );
              })}
            </div>
          </Grid>
          <Grid item xs={12} lg={2}>
            <div
              style={{
                width: "100%",
                height  : "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                style={{
                  width: "60%",
                  maxWidth: "150px",
                  objectFit: "fill",
                 
                }}
                alt="Vs"
                src="/images/other/vs.png"
              />
            </div>
          </Grid>
          <Grid item xs={12} lg={5}>
          <Typography variant="h1" sx={fontStyles}>
          Team Dire
          </Typography>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {direHeroes.map((hero, index) => {
                return (
                  <Grid
                    container
                    spacing={0}
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Grid
                      item
                      xs={8}
                      sx={{
                        margin: "0.5rem",
                      }}
                    >
                      <Card
                        sx={cardStyles}
                      >
                        <CardMedia
                          component="img"
                          image={(hero.id===0)?"/images/other/profile.png":"/images/heros/"+hero.id+".jpg"}
                        />
                        <CardContent
                          sx={{
                            padding: "2px",
                          }}
                        >
                           <Typography
                            fontSize={"0.8rem"}
                            fontWeight={"600"}
                            variant="h5"
                            component="div"
                          >
                            {(hero.id===0)?"Pick Hero":hero.id}
                          </Typography>
                          <Typography
                            fontSize={"0.7rem"}
                            variant="body2"
                            color="text.secondary"
                          >
                             {(hero.position===0)?"Pick":"Position :"+ hero.position}
                          </Typography>
                          <Typography
                            fontSize={"0.6rem"}
                            variant="body2"
                            color="green"
                          >
                            {(hero.id===0)?"":"GPM :"+ hero.gpm}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <IconButton   onClick={() => {
                                dispatch(TeamBoardSlice.actions.openPopup())
                              }}>
                            <Edit
                              sx={{
                                fontSize: "1rem",
                              }}
                            />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  </Grid>
                );
              })}
            </div>
          </Grid>
          <Grid item xs={12} sx={{
            padding: '1rem'
          }}>
            <Button variant="contained" size="large" startIcon={<CheckCircleOutlineIcon />}
            color="success"
            >Predict</Button>
          </Grid>
        </Grid>
    );
  }
  