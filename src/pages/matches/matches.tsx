import { ThumbDown, ThumbUp } from "@mui/icons-material";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import { useEffect } from "react";
import { get_matches } from "../../reducers/matchesReducers/matchAPI";
import { useDispatch,useSelector } from "react-redux";
import { AppDispatch } from "../..";
import { RootState } from "../../reducers/combinedReducers";

export default function Matches() {
  const matches = useSelector((state:RootState)=>state.matchesreducer.matches)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(()=>{
    dispatch(get_matches({page:1}))
  },[])
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  }));
  return (
    <div>
      <TableContainer component={Paper}>
        <Table
          sx={{
            width: "calc(100% - 2rem)",
            margin: "1rem",
            textAlign: "start",
          }}
          size="small"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell
                sx={{
                  width: "30%",
                }}
              >
                Radiant
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  width: "30%",
                }}
              >
                Dire
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  width: "10%",
                }}
              >
                Created
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  width: "15%",
                }}
              >
                Prediction
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  width: "15%",
                }}
              >
                Feedback
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches.map((row: any) => (
              <TableRow key={row.radiant._id}>
                <TableCell component="th" scope="row">
                  <Grid container spacing={0}>
                    {row.radiant.map((hero: any) => {
                      return (
                        <Grid key={hero.id} item xs={12} sm={6} lg={2}>
                          <img
                            src={"/images/heros/" + hero.id + ".png"}
                            style={{
                              width: "100%",
                            }}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Grid container spacing={0}>
                    {row.dire.map((hero: any) => {
                      return (
                        <Grid key={hero.id} item xs={12} sm={6} lg={2}>
                          <img
                            src={"/images/heros/" + hero.id + ".png"}
                            style={{
                              width: "100%",
                            }}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    fontSize: "0.7rem",
                  }}
                >
                  {row.created}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "0.7rem",
                  }}
                >
                  Radiant : {row.prediction.radiant}
                  <br />
                  Dire : {row.prediction.dire}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    fontSize: "0.7rem",
                  }}
                >
                  {!row.feedback && row.feedback !=0 ? (
                    <div>
                      <Button variant="contained" color="success" sx={{
                        margin: "0.2rem",
                      }}>
                        <ThumbUp />
                      </Button>

                      <Button
                        variant="contained"
                        color="error"
                        sx={{
                          margin: "0.2rem",
                        }}
                      >
                        <ThumbDown />
                      </Button>
                    </div>
                  ) : row.feedback === 1 ? (
                    <Button variant="contained" color="success" disabled={true} sx={{
                        margin: "0.2rem",
                      }}>
                      <ThumbUp />
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="error"
                      disabled={true}
                      sx={{
                        margin: "0.2rem",
                      }}
                    >
                      <ThumbDown />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
