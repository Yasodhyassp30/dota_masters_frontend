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
              <Grid item xs={6} lg={2}  key={counter.id}>
              <Card sx={{ display: "flex", width: "100%", justifyContent:"center",alignItems:"center" }}>
              <CardContent sx={{ flex: "1 0 auto", width: "100%" }}>
              <CardMedia
                component="img"
                sx={{ width: "auto" }}
                image={"/images/heros/"+ counter.id+".png"} 
                alt="Hero portrait"
              />
                <Typography component="div" variant="inherit">
                  {counter.localized_name}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize={"0.7rem"}>
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
