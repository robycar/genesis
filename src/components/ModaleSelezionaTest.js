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
import Button from "@material-ui/core/Button";

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
    marginLeft: "55px",
    marginTop: "4%",
    marginBottom: "2%",
  },
}));

function SimpleModal(props) {
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
                <ListItem button>
                  <ListItemIcon>
                    <BackupIcon className={classes.icon} />
                  </ListItemIcon>
                  <Typography className={classes.intestazione} variant="h5">
                    {props.titolo1}{" "}
                  </Typography>
                </ListItem>
              </div>

              <div className={classes.paperBottom}>
                <Typography variant="h6">{props.titolo2}</Typography>
                <div className={classes.divSelectBar}>
                  <div className={classes.divTextarea}>
                    <Typography className={classes.contenuto} variant="h11">
                      {props.label1}{" "}
                    </Typography>
                  </div>
                  <SelectBar nome="Seleziona" classeName={classes.selectBar} />
                </div>

                <div className={classes.divTextarea}>
                  <Typography className={classes.contenuto} variant="h11">
                    {props.label2}
                  </Typography>
                </div>
                <SelectBar nome="Seleziona" classeName={classes.selectBar} />

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
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
export default SimpleModal;
