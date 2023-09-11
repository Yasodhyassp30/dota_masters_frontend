import { Delete, ThumbDown, ThumbUp } from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid,
  Paper,
  Snackbar,
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
import { get_matches,provide_feedback,delete_match } from "../../reducers/matchesReducers/matchAPI";
import { MatchSlice } from "../../reducers/matchesReducers/matchReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../..";
import { RootState } from "../../reducers/combinedReducers";

export default function Matches() {
  const matches = useSelector(
    (state: RootState) => state.matchesreducer.matches
  );
  const open = useSelector((state:RootState)=>state.matchesreducer.openSnackBar)
  const msg =  useSelector((state:RootState)=>state.matchesreducer.msg)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(get_matches({ page: 1 }));
  }, []);

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
                  {!row.feedback && row.feedback !== 0 ? (
                    <div>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{
                          margin: "0.2rem",
                        }}
                      onClick={()=>{
                        dispatch(provide_feedback({
                          feedback:1,
                          id:row._id.$oid,
                          
                        }))
                      }}>
                      
                        <ThumbUp fontSize="small"/>
                      </Button>

                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{
                          margin: "0.2rem",
                        }}
                        onClick={()=>{
                          dispatch(provide_feedback({
                            feedback:0,
                            id:row._id.$oid,
                            
                          }))
                        }}
                      >
                        <ThumbDown fontSize="small"  />
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{
                          margin: "0.2rem",
                        }}
                        onClick={()=>{
                          dispatch(delete_match({
                            id:row._id.$oid,
                            
                          }))
                        }}
                      >
                        <Delete fontSize="small"  />
                      </Button>
                    </div>
                  ) : row.feedback === 1 ? (
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      disabled={true}
                      sx={{
                        margin: "0.2rem",
                      }}
                    >
                      <ThumbUp fontSize="small" />
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="error"
                      disabled={true}
                      size="small"
                      sx={{
                        margin: "0.2rem",
                      }}
                    >
                      <ThumbDown fontSize="small" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar open={open} autoHideDuration={6000} onClose={()=>{dispatch(MatchSlice.actions.snackBarClose())}}>
          <Alert onClose={()=>{dispatch(MatchSlice.actions.snackBarClose())}} severity="success" sx={{ width: "100%" }}>
            {msg}
          </Alert>
        </Snackbar>
    </div>
  );
}
