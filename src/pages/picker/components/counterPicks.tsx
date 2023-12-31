import React from 'react'
import { pickListItems } from '../../../types/heroTypes'
import { Card, CardContent, Typography, CardMedia, Grid } from '@mui/material'
import { useSelector } from 'react-redux';
import { RootState } from '../../../reducers/combinedReducers';

export default function CounterPicks() {
  const counters:any[] = useSelector((state: RootState) => state.predictreducer.counters);
  return (
    <Grid
      container
      spacing={1}
      sx={{
        padding: "1rem",
      }}
    >
        {counters.map((counter)=>{
            return(
              <Grid item xs={4} lg={2}  key={counter.id}>
              <Card sx={{ display: "flex", height:"100%",width: "100%", justifyContent:"center",alignItems:"start",backgroundColor:"white" }}>
              <CardContent sx={{ flex: "1 0 auto", width: "100%" }}>
              <CardMedia
                component="img"
                sx={{ width: "100%" }}
                image={"/images/heros/"+ counter.id+".png"} 
                alt="Hero portrait"
              />
                <Typography component="div" variant="inherit" fontSize={"1.2rem"} padding={"10px"}>
                  {counter.localized_name}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize={"0.9rem"} padding={"10px"}>
                 {counter.description}
                </Typography>
              </CardContent>
             
            </Card>
            </Grid>
            )
        })}
    </Grid>
  )
}
