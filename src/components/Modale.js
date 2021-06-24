import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import ButtonClickedGreen from "./ButtonClickedGreen";
import { Fade, Paper, Typography } from "@material-ui/core";
import SelectBar from "./SelectBar";
import Backdrop from "@material-ui/core/Backdrop";
import BackupIcon from "@material-ui/icons/Backup";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperTop: {
    height: "20%",
    display: "flex",
    alignItems: "center",
    //opacity: "25%",
  },
  paperBottom: {
    backgrounColor: "#FFFFFF",
    justifyContent: "center",
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
    marginTop: "50px",
    marginLeft: "5px",
  },
  intestazione: {
    color: "#47B881",
    marginTop: "5%",
    marginLeft: "5%",
    flexDirection: "row",
  },
  icon: {
    size: "medium",
    color: "#47B881",
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Load Test Case
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
          <div className={classes.paper}>
            <Paper>
              <div>
                <Typography className={classes.intestazione} variant="h5">
                  Load Test Case
                </Typography>
              </div>

              <div className={classes.paperBottom}>
                <Typography variant="h8">Seleziona test Case:</Typography>
                <div className={classes.divSelectBar}>
                  <div className={classes.divTextarea}>
                    <Typography className={classes.contenuto} variant="h11">
                      Nome del Test
                    </Typography>
                  </div>
                  <SelectBar
                    nome="Nome del test"
                    classeName={classes.selectBar}
                  />
                </div>
              </div>
              <div className={classes.divSelectBar}>
                <div className={classes.divTextarea}>
                  <Typography className={classes.contenuto} variant="h11">
                    Descrizione
                  </Typography>
                </div>
                <SelectBar nome="Descrizione" classeName={classes.selectBar} />
              </div>
            </Paper>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
