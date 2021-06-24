import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import ButtonClickedGreen from "./ButtonClickedGreen";
import { Fade, Paper, Typography } from "@material-ui/core";
import SelectBar from "./SelectBar";
import Backdrop from "@material-ui/core/Backdrop";

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
    position: "static",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      <SimpleModal />
    </div>
  );

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
            <Paper className={classes.paperTop}>
              <Typography className={classes.intestazione} variant="h5">
                Non hai trovato quello che cercavi?
              </Typography>
            </Paper>
            <Paper className={classes.paperBottom}>
              <Typography className={classes.contenuto} variant="h8">
                Nessun problema, seleziona l'argomento e inviaci la tua
                richiesta per avere maggiori informazioni.
              </Typography>
              <div className={classes.divSelectBar}>
                <SelectBar
                  nome="Seleziona l'argomento"
                  classeName={classes.selectBar}
                />
              </div>
              <div className={classes.divTextarea}>
                <Typography className={classes.contenuto} variant="h11">
                  Ascoltiamo i tuoi bisogni:
                </Typography>
              </div>
              <div className={classes.divBottone}>
                <ButtonClickedGreen
                  className={classes.bottone}
                  nome="Invia"
                  size="small"
                />
              </div>
            </Paper>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
