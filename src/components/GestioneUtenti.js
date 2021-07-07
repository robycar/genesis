import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchBar from "./Search";
import ButtonClickedGreen from "./ButtonClickedGreen";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "../styles/App.css";

function createData(
  id,
  nome,
  cognome,
  telefono,
  email,
  password,
  level,
  gruppo,
  azienda,
  modifica,
  cancella,
) {
  return {
    id,
    nome,
    cognome,
    telefono,
    email,
    password,
    level,
    gruppo,
    azienda,
    modifica,
    cancella,
  };
}

const rows = [
  createData("DEV6301", "Mario", "Rossi", 3354745787, "email@esempio.it", "*****", "Admin","Gruppo1", "Tim"),
  createData("DEV6401", "Mario", "Rossi", 3354745787, "email@esempio.it", "*****", "Admin","Gruppo1", "Tim"),
  createData("DEV8301", "Mario", "Rossi", 3354745787, "email@esempio.it", "*****", "Admin","Gruppo1", "Tim"),
  createData("DEV7301", "Mario", "Rossi", 3354745787, "email@esempio.it", "*****", "Admin","Gruppo1", "Tim"),
  createData("DEV5301", "Mario", "Rossi", 3354745787, "email@esempio.it", "*****", "Admin","Gruppo1", "Tim"),
  createData("DEV6391", "Mario", "Rossi", 3354745787, "email@esempio.it", "*****", "Admin","Gruppo1", "Tim"),
  createData("DEV6601", "Mario", "Rossi", 3354745787, "email@esempio.it", "*****", "Admin","Gruppo1", "Tim"),
  createData("DEV6331", "Mario", "Rossi", 3354745787, "email@esempio.it", "*****", "Admin","Gruppo1", "Tim"),
  createData("DEV3501", "Maria", "Rossi", 3354745787, "email@esempio.it", "*****", "Admin","Gruppo1", "Tim"),
  createData("DEV7401", "Mario", "Rossi", 3354745787, "email@esempio.it", "*****", "Admin","Gruppo1", "Tim"),
  createData("DEV6041", "Mario", "Rossi", 3354745787, "email@esempio.it", "*****", "Admin","Gruppo1", "Tim"),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID Utenza",
  },
  { id: "nome", numeric: false, disablePadding: false, label: "Nome" },
  { id: "cognome", numeric: false, disablePadding: false, label: "Cognome" },
  { id: "telefono", numeric: false, disablePadding: false, label: "Telefono" },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  { id: "password", numeric: false, disablePadding: false, label: "Password" },
  { id: "level", numeric: false, disablePadding: false, label: "Level" },
  { id: "gruppo", numeric: false, disablePadding: false, label: "Gruppo" },
  { id: "azienda", numeric: false, disablePadding: false, label: "Azienda" },
  { id: "modifica", numeric: false, disablePadding: false, label: "Modifica" },
  { id: "cancella", numeric: false, disablePadding: false, label: "Cancella" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 25%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <>
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
            style={{ display: "flex" }}
          >
           Gestione Utenti 
            <SearchBar className={classes.searchBar} />
          </Typography>
          
          <div className={classes.buttonRight}>
          <Button
              className="button-green"
              component={NavLink}
              activeClassName="button-green-active"
              exact
              to="/amministrazione/addutente"
            >
              ADD UTENTE
            </Button>
          </div>
        </>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
    marginBottom: "10px",
  },

  buttonRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <EnhancedTableToolbar numSelected={selected.length} />
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size={dense ? "small" : "medium"}
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.nome}</TableCell>
                    <TableCell align="left">{row.cognome}</TableCell>
                    <TableCell align="left">{row.telefono}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.password}</TableCell>
                    <TableCell align="left">{row.level}</TableCell>
                    <TableCell align="left">{row.gruppo}</TableCell>
                    <TableCell align="left">{row.azienda}</TableCell>
                    <TableCell align="center">
                      <Button
                      className="button-light-yellow"
                      >
                        MODIFICA
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                      className="button-light-red"
                      >
                        CANCELLA
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
