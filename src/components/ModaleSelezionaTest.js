import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Fade, Paper, Typography } from "@material-ui/core";
import SelectBar from "./SelectBar";
import Backdrop from "@material-ui/core/Backdrop";
import BackupIcon from "@material-ui/icons/Backup";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Button from "@material-ui/core/Button";
import acccessControl from "../service/url";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

// function getModalStyle() {
//   const top = 50 + rand();
//   const left = 50 + rand();

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

function SimpleModal() {
  const classes = useStyles();

  const useStyles = makeStyles((theme) => ({
    paper: {
      width: 500,
      backgroundColor: theme.palette.background.paper,
      // border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "5%",
    },
    paperTop: {
      height: "20%",
      display: "flex",
      alignItems: "center",
      //opacity: "25%",
    },
    paperBottom: {
      padding: "2%",
      backgrounColor: "#FFFFFF",
      //justifyContent: "center",
      flexDirection: "column",
      marginTop: "5%",
    },
    divSelectBar: {
      marginTop: "25px",
    },
    selectBar: {
      width: "50%",
      height: "100",
      marginTop: "50px",
    },
    divTextarea: {
      marginTop: "20px",
    },
    intestazione: {
      color: "#47B881",
      marginTop: "5%",
      flexDirection: "row",
    },
    icon: {
      transform: "scale(1.8)",
      color: "#47B881",
      marginTop: "9px",
    },
    bottoni: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      marginLeft: "55px",
      marginTop: "4%",
      marginBottom: "2%",
    },
  }));

  /*----------- GET TEST SUITE ------------------*/

  let bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

  if (bearer != null) {
    bearer = bearer.replace(/"/g, "");
  }

  const [appearTest, setAppearTest] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [nome, setNome] = useState("");
  const [data, setData] = useState([]);

  const handleOpen = (rowData) => {
    setNome(rowData.nome);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getAppearTest = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/testsuite`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAppearTest(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAppearTest();
  }, []);

  // function SimpleModal(props) {
  //   const classes = useStyles();
  //   const [open, setOpen] = React.useState(false);

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Load Test XXXX
      </button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Paper className={classes.paper}>
            {/* <div>
              <ListItem button>
                <ListItemIcon>
                  <BackupIcon className={classes.icon} />
                </ListItemIcon>
                <Typography className={classes.intestazione} variant="h5">
                  {props.titolo1}{" "}
                </Typography>
              </ListItem>
            </div> */}

            <div className={classes.paperBottom}>
              {/* <Typography variant="h6">{props.titolo2}</Typography>
              <div className={classes.divSelectBar}>
                <div className={classes.divTextarea}>
                  <Typography className={classes.contenuto} variant="h11">
                    {props.label1}{" "}
                  </Typography>
                </div>
                <SelectBar nome="Seleziona" classeName={classes.selectBar} />
              </div> */}

              <div className={classes.divTextarea}>
                
              
              <TextField
                select
                label="Seleziona Test Suite "
                value={appearTest.nome}
                defaultValue={nome}
                onChange={(e) => setNome(e.target.value)}
              >
                {appearTest.map((nome) => (
                  <MenuItem key={nome} value={nome}>
                    {nome}
                  </MenuItem>
                ))}
              </TextField>
              </div>

              <div className={classes.bottoni}>
                <Button variant="contained" color="secondary">
                  Schedula Test
                </Button>

                <Button variant="contained" color="primary">
                  Carica Test
                </Button>
              </div>
            </div>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}

export default SimpleModal;
