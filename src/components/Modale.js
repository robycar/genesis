import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import SelectBar from "./SelectBar";
import { TextareaAutosize } from "@material-ui/core";
import ButtonClickedGreen from "./ButtonClickedGreen";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  // paper: {
  //   padding: theme.spacing(2),
  //   display: "flex",
  //   overflow: "auto",
  //   flexDirection: "column",
  // },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #3F3F44",
    boxShadow: theme.shadows[5],
    width: "500px",
    height: "600px",
  },
  paperTop: {
    backgroundColor: "#47B881",
    height: "28%",
    //opacity: "25%",
  },
  paperBottom: {
    backgrounColor: "#FFFFFF",
    height: "72%",
    padding: "8%",
    justifyContent: "center",
    flexDirection: "column",
  },
  intestazione: {
    color: "black",
    marginTop: "35px",
    marginLeft: "35px",
  },
  divSelectBar: {
    marginTop: "25px",
  },
  selectBar: {
    width: "400px",
    height: "100",
    marginTop: "50px",
  },
  divTextarea: {
    marginTop: "50px",
    marginLeft: "5px",
  },
  textarea: {
    width: "380px",
    height: "260px",
    border: "1px solid rgba(0, 0, 0, 0.32)",
    marginTop: "10px",
    fontFamily: "Roboto",
  },
  bottone: {
    size: "small",
    marginTop: "10px",
  },
  divBottone: {
    marginTop: "15px",
    marginLeft: "35%",
  },
}));

function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
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
              Nessun problema, seleziona l'argomento e inviaci la tua richiesta
              per avere maggiori informazioni.
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
              <TextareaAutosize
                className={classes.textarea}
                aria-label="minimum height"
                rowsMin={10}
                placeholder="Inserisci il messaggio"
              />
            </div>
            <ButtonClickedGreen nome="Invia" />
          </Paper>
        </div>
      </Fade>
    </Modal>
  );
}

export default TransitionsModal;
