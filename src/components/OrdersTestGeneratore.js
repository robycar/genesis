import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
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
import ButtonClickedBlue from "../components/ButtonClickedBlue";
import ButtonNotClickedBlue from "../components/ButtonNotClickedBlue";
import "../styles/App.css";
import TestGeneratoreRunningTable from "./TestGeneratoreRunningTable";
import TestGeneratoreCaricatiTable from "./TestGeneratoreCaricatiTable";
import TestGeneratoreSchedulatiTable from "./TestGeneratoreSchedulatiTable";
import TestGeneratoreConclusiTable from "./TestGeneratoreConclusiTable";


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
            Total Test Generatore
          </Typography>
          <SearchBar className={classes.searchBar} />
          <div className={classes.buttonRight}>
            <ButtonClickedBlue nome="Load Test Generatore" />
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


  const [appState, changeState] = useState({
    activeObject: null,
    objects: [
      { id: 1, name: "Test Generatore Caricati" },
      { id: 2, name: "Test Generatore Schedulati" },
      { id: 3, name: "Test Generatore Running" },
      { id: 4, name: "Test Generatore Conclusi" },
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
        
      </div>
      {appState.activeObject === null && <TestGeneratoreCaricatiTable />}
      {appState.objects[2] === appState.activeObject && <TestGeneratoreRunningTable />}
      {appState.objects[3] === appState.activeObject && <TestGeneratoreConclusiTable />}
      {appState.objects[0] === appState.activeObject && <TestGeneratoreCaricatiTable />}
      {appState.objects[1] === appState.activeObject && <TestGeneratoreSchedulatiTable />}
      
    </>
  );
}
