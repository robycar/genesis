import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  paper: {
    width: 543,
    height: 500,
    overflow: "auto",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
  edit: {
    paddingLeft: "30px",
    fontSize: "22px",
  },
  lastGrid: {
    width: 543,
    height: 1,
  },
  buttonGreen: {
    backgroundColor: "#47B881 !important",
    border: "1px solid #47B881 !important",
    borderRadius: 5,
    color: "white !important",
    marginLeft: "10px",
    "&:hover": {
      backgroundColor: "white !important",
      color: "#47B881 !important",
    },
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList() {
  const roleGeneral = [
    { name: "Admin management", type: "permission", side: "left" },
    { name: "Admin user management", type: "permission", side: "left" },
    { name: "Admin utente management", type: "permission", side: "left" },
    { name: "Report manager", type: "permission", side: "left" },
    { name: "Workstation management", type: "permission", side: "left" },
    { name: "Line management", type: "permission", side: "left" },
    { name: "Line management", type: "permission", side: "left" },
    { name: "Line management", type: "permission", side: "left" },
    { name: "Line management", type: "permission", side: "left" },
    { name: "Line management", type: "permission", side: "left" },
    { name: "Line management", side: "left" },
  ];

  const [data, setData] = useState([]);

  const bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

  const getLevel = () => {
    var myHeaders = new Headers();

    myHeaders.append("Authorization", bearer);

    // console.log(bearer.toString());

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:9081/api/funzione", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.funzioni);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getLevel();
  }, []);

  const prova = [];

  for (let i = 0; i < data.length; i++) {
    prova.push(data[i].nome);
  }
  console.log(prova);
  const sinistra = prova;
  const destra = [];
  for (let i = 0; i < roleGeneral.length; i++) {
    if (roleGeneral[i].side == "left") sinistra.push(roleGeneral[i].name);
    else destra.push(roleGeneral[i].name);
  }
  console.log(sinistra);
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(sinistra);
  const [right, setRight] = React.useState(destra);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <Typography className={classes.edit}>
          {" "}
          Permessi Non Accordati
        </Typography>
        {customList(left)}
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <Typography className={classes.edit}> Permessi Accordati </Typography>
        {customList(right)}
      </Grid>
      <Grid className={classes.lastGrid}></Grid>
      <Grid item>
        <Grid>
          <Button className={classes.buttonGreen} size="medium">
            Salva
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
