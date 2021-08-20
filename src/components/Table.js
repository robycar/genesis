import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "rgba(247, 209, 84, 0.24)",
    color: theme.palette.common.black,
    //fontFamily: "Roboto",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "white",
    },
  },
}))(TableRow);

function createData(name, run, passed, nA, failed) {
  return { name, run, passed, nA, failed };
}

const rows = [
  createData("", "Run", "Passed", "N/A", "Failed"),
  createData("Registrazione", 159, 6.0, 24, 4.0),
  createData("Plug-In", 237, 9.0, 37, 4.3),
  createData("Focus P-CSCF", 262, 16.0, 24, 6.0),
  createData("Total", 305, 3.7, 67, 4.3),
];

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 750,
  },
}));

function CustomizedTables() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              Test Status Summary - Last 30 Test Suite
            </StyledTableCell>
            <StyledTableCell align="right">{""}</StyledTableCell>
            <StyledTableCell align="right">{""}</StyledTableCell>
            <StyledTableCell align="right">{""}</StyledTableCell>
            <StyledTableCell align="right">{""}</StyledTableCell>
            <StyledTableCell align="right">{""}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.run}</StyledTableCell>
              <StyledTableCell align="right">{row.passed}</StyledTableCell>
              <StyledTableCell align="right">{row.nA}</StyledTableCell>
              <StyledTableCell align="right">{row.failed}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default CustomizedTables;
