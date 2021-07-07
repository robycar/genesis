import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
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
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import Button from "@material-ui/core/Button";
import SearchBar from "./Search";
import { NavLink } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import ImageIcon from "@material-ui/icons/Image";
import { palette } from "@material-ui/system";
import ShowModalDescription from "../components/ShowModalDescription";

function createData(name, nomeTemplate, visualizza, modifica, elimina) {
  return {
    name,
    nomeTemplate,
    visualizza,
    modifica,
    elimina,
  };
}

const rows = [
  createData(
    "Template1",
    <IconButton aria-label="edit">
      <EditIcon />
    </IconButton>,
    <ShowModalDescription />,
    305,
    <IconButton aria-label="delete">
      <DeleteIcon />
    </IconButton>
  ),
  createData(
    "Template2",
    <IconButton aria-label="edit">
      <EditIcon />
    </IconButton>,
    <ShowModalDescription />,
    305,
    <IconButton aria-label="delete">
      <DeleteIcon />
    </IconButton>
  ),
  createData(
    "Template3",
    <IconButton aria-label="edit">
      <EditIcon />
    </IconButton>,
    <ShowModalDescription />,
    305,
    <IconButton aria-label="delete">
      <DeleteIcon />
    </IconButton>
  ),
  createData(
    "Template4",
    <IconButton aria-label="edit">
      <EditIcon />
    </IconButton>,
    <ShowModalDescription />,
    305,
    <IconButton aria-label="delete">
      <DeleteIcon />
    </IconButton>
  ),
  createData(
    "Template5",
    <IconButton aria-label="edit">
      <EditIcon />
    </IconButton>,
    <ShowModalDescription />,
    305,
    <IconButton aria-label="delete">
      <DeleteIcon />
    </IconButton>
  ),
  createData(
    "Template6",
    <IconButton aria-label="edit">
      <EditIcon />
    </IconButton>,
    <ShowModalDescription />,
    305,
    <IconButton aria-label="delete">
      <DeleteIcon />
    </IconButton>
  ),
  createData(
    "Teamplate7",
    <IconButton aria-label="edit">
      <EditIcon />
    </IconButton>,
    <ShowModalDescription />,
    305,
    <IconButton aria-label="delete">
      <DeleteIcon />
    </IconButton>
  ),
  createData(
    "Teamplate8",
    <IconButton aria-label="edit">
      <EditIcon />
    </IconButton>,
    <ShowModalDescription />,
    305,
    <IconButton aria-label="delete">
      <DeleteIcon />
    </IconButton>
  ),
  createData(
    "Teamplate9",
    <IconButton aria-label="edit">
      <EditIcon />
    </IconButton>,
    <ShowModalDescription />,
    305,
    <IconButton aria-label="delete">
      <DeleteIcon />
    </IconButton>
  ),
  createData(
    "Cupcake",
    <IconButton aria-label="edit">
      <EditIcon />
    </IconButton>,
    <ShowModalDescription />,
    305,
    <IconButton aria-label="delete">
      <DeleteIcon />
    </IconButton>
  ),
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
    id: "",
    numeric: false,
    disablePadding: true,
    label: "",
  },
  {
    id: "nomeTemplate",
    numeric: true,
    disablePadding: false,
    label: "Nome Template",
  },
  {
    id: "visualizza",
    numeric: true,
    disablePadding: false,
    label: "Visualizza",
  },
  { id: "modifica", numeric: true, disablePadding: false, label: "Modifica" },
  { id: "elimina", numeric: true, disablePadding: false, label: "Elimina" },
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
    <TableHead className={classes.tableHead}>
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
            align={headCell.numeric ? "center" : "center"}
            padding={headCell.disablePadding ? "none" : "default"}
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
    //marginLeft: "30%",
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
  searchBar: {
    marginLeft: "8%",
    width: "650px",
    // marginTop: "3%",
    // marginBottom: "5%",
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
          {/* <LibraryBooksIcon />
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Template
          </Typography> */}

          <div className={classes.searchBar}>
            <SearchBar />
          </div>
          <div className={classes.buttonRight}>
            <Button
              color="secondary"
              size="medium"
              variant="contained"
              className="button-red"
              component={NavLink}
              activeClassName="button-red-active"
              exact
              to="/editing/template/carica"
            >
              CARICA{" "}
            </Button>
            <Button
              color="primary"
              size="medium"
              variant="contained"
              className="button-red"
              //component={NavLink}
              activeClassName="button-red-active"
              // exact
              // to="/editing/template/carica"
            >
              CREA{" "}
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
  //   root: {
  //     width: "100%",
  //   },
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
    marginBottom: "5%",
  },

  buttonRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
  tableHead: {
    backgroundColor: "#f50057",
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("nomeTemplate");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

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
                    <TableCell align="center">{row.modifica}</TableCell>
                    <TableCell align="center">{row.visualizza}</TableCell>
                    <TableCell align="center">{row.nomeTemplate}</TableCell>
                    <TableCell align="center">{row.elimina}</TableCell>
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
