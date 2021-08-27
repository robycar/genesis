import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "name", label: "Nome Test Case", minWidth: 150,defaultSort:"desc" },
  { id: "IdTemplate", label: "ID Template", minWidth: 150, align: "center" },
  {
    id: "IdCreated",
    label: "ID Created By",
    minWidth: 150,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "IdModified",
    label: "ID Modified By",
    minWidth: 150,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "LineaChiamante",
    label: "N° Linea Chiamante",
    minWidth: 150,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "LineaChiamato",
    label: "N° Linea Chiamato",
    minWidth: 150,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "LineaChiamante2",
    label: "N° Linea Chiamante 2",
    minWidth: 150,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "LineaChiamante3",
    label: "N° Linea Chiamante 3",
    minWidth: 150,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "TipoLineaChiamante",
    label: "Tipo Linea Chiamante",
    minWidth: 150,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "TipoLineaChiamato",
    label: "Tipo Linea Chiamato",
    minWidth: 150,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "TipoLineaChiamante2",
    label: "Tipo Linea Chiamante 2",
    minWidth: 150,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "TipoLineaChiamante3",
    label: "Tipo Linea Chiamante 3",
    minWidth: 150,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "OpbChiamante",
    label: "OPB Chiamante",
    minWidth: 150,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "OpbChiamato",
    label: "OPB Chiamato",
    minWidth: 150,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "OpbChiamante2",
    label: "OPB Chiamante 2",
    minWidth: 150,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "OpbChiamante3",
    label: "OPB Chiamante 3",
    minWidth: 150,
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

function createData(
  name,
  IdTemplate,
  IdCreated,
  IdModified,
  LineaChiamante,
  LineaChiamato,
  LineaChiamante2,
  LineaChiamante3,
  TipoLineaChiamante,
  TipoLineaChiamato,
  TipoLineaChiamante2,
  TipoLineaChiamante3,
  OpbChiamante,
  OpbChiamato,
  OpbChiamante2,
  OpbChiamante3
) {
  //const density = IdCreated / IdModified;
  return {
    name,
    IdTemplate,
    IdCreated,
    IdModified,
    LineaChiamante,
    LineaChiamato,
    LineaChiamante2,
    LineaChiamante3,
    TipoLineaChiamante,
    TipoLineaChiamato,
    TipoLineaChiamante2,
    TipoLineaChiamante3,
    OpbChiamante,
    OpbChiamato,
    OpbChiamante2,
    OpbChiamante3,
  };
}

const rows = [
  createData("Test1", "xxxx", 1324171354, 3287263),
  createData("Test2", "xxxx", 1403500365, 9596961),
  createData("Test3", "xxxx", 60483973, 301340),
  createData("Test4", "xxxx", 327167434, 9833520),
  createData("Test5", "xxxx", 37602103, 9984670),
  createData("Test6", "xxxx", 25475400, 7692024),
  createData("Test7", "xxxx", 83019200, 357578),
  createData("Test8", "xxxx", 4857000, 70273),
  createData("Test9", "xxxx", 126577691, 1972550),
  createData("Test10", "xxxx", 126317000, 377973),
  createData("Test11", "xxxx", 67022000, 640679),
  createData("Test12", "xxxx", 67545757, 242495),
  createData("Test13", "xxxx", 146793744, 17098246),
  createData("Test14", "xxxx", 200962417, 923768),
  createData("Test15", "xxxx", 210147125, 8515767),
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 510,
    marginTop: "1%",
    marginBottom: "5%",
  },
  tableHead: {
    backgroundColor: "#1976d2",
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className={classes.tableHead}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.IdTemplate}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}
