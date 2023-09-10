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

export default function Matches() {
  const rows: any[] = [
    {
      radiant: [
        {
          position: 1,
          gpm: 612,
          id: 115,
        },
        {
          position: 5,
          gpm: 317,
          id: 100,
        },
        {
          position: 4,
          gpm: 329,
          id: 50,
        },
        {
          position: 1,
          gpm: 684,
          id: 41,
        },
        {
          position: 3,
          gpm: 674,
          id: 97,
        },
      ],
      dire: [
        {
          position: 5,
          gpm: 399,
          id: 84,
        },
        {
          position: 1,
          gpm: 1000,
          id: 71,
        },
        {
          position: 2,
          gpm: 609,
          id: 22,
        },
        {
          position: 4,
          gpm: 399,
          id: 26,
        },
        {
          position: 3,
          gpm: 603,
          id: 104,
        },
      ],
      created: "2023/06/09",
      prediction: {
        radiant: "55%",
        dire: "45%",
      },
      feedback: 0,
    },
    {
        radiant: [
          {
            position: 1,
            gpm: 612,
            id: 115,
          },
          {
            position: 5,
            gpm: 317,
            id: 100,
          },
          {
            position: 4,
            gpm: 329,
            id: 50,
          },
          {
            position: 1,
            gpm: 684,
            id: 41,
          },
          {
            position: 3,
            gpm: 674,
            id: 97,
          },
        ],
        dire: [
          {
            position: 5,
            gpm: 399,
            id: 84,
          },
          {
            position: 1,
            gpm: 1000,
            id: 71,
          },
          {
            position: 2,
            gpm: 609,
            id: 22,
          },
          {
            position: 4,
            gpm: 399,
            id: 26,
          },
          {
            position: 3,
            gpm: 603,
            id: 104,
          },
        ],
        created: "2023/06/09",
        prediction: {
          radiant: "55%",
          dire: "45%",
        },
        feedback: 1,
      },
      {
        radiant: [
          {
            position: 1,
            gpm: 612,
            id: 115,
          },
          {
            position: 5,
            gpm: 317,
            id: 100,
          },
          {
            position: 4,
            gpm: 329,
            id: 50,
          },
          {
            position: 1,
            gpm: 684,
            id: 41,
          },
          {
            position: 3,
            gpm: 674,
            id: 97,
          },
        ],
        dire: [
          {
            position: 5,
            gpm: 399,
            id: 84,
          },
          {
            position: 1,
            gpm: 1000,
            id: 71,
          },
          {
            position: 2,
            gpm: 609,
            id: 22,
          },
          {
            position: 4,
            gpm: 399,
            id: 26,
          },
          {
            position: 3,
            gpm: 603,
            id: 104,
          },
        ],
        created: "2023/06/09",
        prediction: {
          radiant: "55%",
          dire: "45%",
        },
      },
  ];
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
            {rows.map((row: any) => (
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
