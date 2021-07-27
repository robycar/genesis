import React, { useState } from "react";
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
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import Button from "@material-ui/core/Button";
import SearchBar from "./Search";
import ButtonClickedGreen from "./ButtonClickedGreen";
import ButtonClickedBlue from "./ButtonClickedBlue";
import ButtonNotClickedGreen from "./ButtonNotClickedGreen";
import ButtonNotClickedBlue from "./ButtonNotClickedBlue";
import { logDOM } from "@testing-library/react";
import "../styles/App.css";
import ButtonList from "./ButtonList";
import TestSuiteRunningTable from "./TestSuiteRunningTable";
import TestSuiteCaricatiTable from "./TestSuiteCaricatiTable";
import TestSuiteSchedulatiTable from "./TestSuiteSchedulatiTable";
import TestSuiteConclusiTable from "./TestSuiteConclusiTable";

function createData(
  name,
  calories,
  fat,
  carbs,
  protein,
  prova1,
  prova2,
  prova3,
  prova4
) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    prova1,
    prova2,
    prova3,
    prova4,
  };
}

const rows = [
  createData("Cupcake", 305, 3.7, 67, 4.3, 1, 2, 3, 4),
  createData("Donut", 452, 25.0, 51, 4.9, 1, 2, 3, 4),
  createData("Eclair", 262, 16.0, 24, 6.0, 1, 2, 3, 4),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 1, 2, 3, 4),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1, 2, 3, 4),
  createData("Honeycomb", 408, 3.2, 87, 6.5, 1, 2, 3, 4),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 1, 2, 3, 4),
  createData("Jelly Bean", 375, 0.0, 94, 0.0, 1, 2, 3, 4),
  createData("KitKat", 518, 26.0, 65, 7.0, 1, 2, 3, 4),
  createData("Lollipop", 392, 0.2, 98, 0.0, 1, 2, 3, 4),
  createData("Marshmallow", 318, 0, 81, 2.0, 1, 2, 3, 4),
  createData("Nougat", 360, 19.0, 9, 37.0, 1, 2, 3, 4),
  createData("Oreo", 437, 18.0, 63, 4.0, 1, 2, 3, 4),
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
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name TS",
  },
  { id: "calories", numeric: true, disablePadding: false, label: "Calories" },
  { id: "fat", numeric: true, disablePadding: false, label: "Fat (g)" },
  { id: "carbs", numeric: true, disablePadding: false, label: "Carbs (g)" },
  { id: "protein", numeric: true, disablePadding: false, label: "Protein (g)" },
  { id: "prova1", numeric: true, disablePadding: false, label: "Prova1" },
  { id: "prova2", numeric: true, disablePadding: false, label: "Prova2" },
  { id: "prova3", numeric: true, disablePadding: false, label: "Prova3" },
  { id: "prova4", numeric: true, disablePadding: false, label: "Prova4" },
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
          >
            Total Test Case
          </Typography>
          <SearchBar className={classes.searchBar} />
          <div className={classes.buttonRight}>
            <ButtonClickedBlue nome="Load Test Suite" />
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
    justifyContent: "space-around",
    marginTop: "10px",
    marginBottom: "10px",
  },
  buttonClickedBlue: {
    backgroundColor: "#1665D8",
    color: "primary",
    marginLeft: "10px",
    marginRight: "10px",
    width: "200px",
    height: "40px",
  },

  buttonNotClickedBlue: {
    backgroundColor: "whute",
    border: "1px solid #1665D8",
    variant: "contained",
    color: "#1665D8",
    marginLeft: "10px",
    marginRight: "10px",
    width: "200px",
    height: "40px",
  },

  buttonRight: {
    display: "flex",
    justifyContent: "flex-end",
  },

  // inactive: {
  //   backgroundColor: "#9b59b6 !important",
  // },
  // active: {
  //   backgroundColor: "#3498db !important",
  // },
  box: {
    width: "200px",
    height: "200px",
    margin: "10px",
    border: "1px solid black",
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
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
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const [appState, changeState] = useState({
    activeObject: null,
    objects: [
      { id: 1, name: "Test Suite Running" },
      { id: 2, name: "Test Suite Conclusi" },
      { id: 3, name: "Test Suite Caricati" },
      { id: 4, name: "Test Suite Schedulati" },
    ],
  });

  // console.log(appState.activeObject);
  // console.log(appState.objects[0]);

  function toggleActive(index) {
    changeState({ ...appState, activeObject: appState.objects[index] });

    // console.log(appState.objects[index].name);
  }

  function toggleActiveStyles(index) {
    if (appState.objects[index] === appState.activeObject) {
      return "box nav-table-active";
    } else {
      return "box nav-table-inactive";
    }
  }
  //  ||appState.activeObject === null

  const [show, setShow] = useState(true);

  function showActive() {
    setShow(!show);
  }

  return (
    <>
      <div className={classes.buttonContainer}>
        {/* <ButtonList /> */}
        {appState.objects.map((elements, index) => (
          <ButtonNotClickedBlue
            key={index}
            nome={elements.name}
            className={toggleActiveStyles(index)}
            onClick={() => {
              toggleActive(index);
              // showActive();
            }}
          />
        ))}
        {/* <ButtonNotClickedBlue
            onClick={() => {
              alert("Ciao");
            }}
            nome="Test in Running"
          />

          <ButtonNotClickedBlue nome="Test Running" />

          <ButtonNotClickedBlue nome="Test Schedulati" />

          <ButtonClickedBlue nome="Test Conclusi" /> */}
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
      </div>
      {appState.activeObject === null && <TestSuiteRunningTable />}
      {appState.objects[0] === appState.activeObject && (
        <TestSuiteRunningTable />
      )}
      {appState.objects[1] === appState.activeObject && (
        <TestSuiteConclusiTable />
      )}
      {appState.objects[2] === appState.activeObject && (
        <TestSuiteCaricatiTable />
      )}
      {appState.objects[3] === appState.activeObject && (
        <TestSuiteSchedulatiTable />
      )}
      {/* <TableContainer>
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
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
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
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.carbs}</TableCell>
                    <TableCell align="center">{row.fat}</TableCell>
                    <TableCell align="center">{row.calories}</TableCell>
                    <TableCell align="center">{row.protein}</TableCell>
                    <TableCell align="center">{row.prova1}</TableCell>
                    <TableCell align="center">{row.prova2}</TableCell>
                    <TableCell align="center">{row.prova3}</TableCell>
                    <TableCell align="center">{row.prova4}</TableCell>
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
      /> */}
    </>
  );
}