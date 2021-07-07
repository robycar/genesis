import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Fade, Paper, Typography } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import InputUpload from "../components/InputUpload";
import CreaItem from "../components/CreaItem";
import InputSelect from "../components/InputSelect";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "fit-content",
    height: "fit-content",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 6, 3),
  },
  modal: {
    height: "fit-content",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  paperBottom: {
    display: "flex",
    flexDirection: "row",
    backgrounColor: "#FFFFFF",
    justifyContent: "center",
    // marginBottom: "3%",
    padding: "1%",
  },

  intestazione: {
    color: "#47B881",
    marginTop: "5%",
  },
  icon: {
    transform: "scale(1.8)",
    color: "#47B881",
    marginTop: "8px",
  },
  bottoni: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "3%",
    marginTop: "2%",
  },
  divider: {
    marginBottom: "3%",
    width: "90%",
    marginLeft: "5%",
    lineHeight: "1px",
    marginTop: "2%",
  },
  nomeTemplate: {
    // marginBottom: "3%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2%",
    marginBottom: "1%",
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  // const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
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
                <CreaItem titolo="Crea Nuovo Template" />
              </div>
              <Divider className={classes.divider} />
              <div className={classes.nomeTemplate}>
                <Paper className={classes.nomeTemplate} elevation={0}>
                  <Typography>Nome Template</Typography>
                  <InputSelect />
                </Paper>
              </div>

              <div className={classes.paperBottom}>
                <div>
                  <InputUpload label="Chiamato" />
                  <InputUpload label="Chiamante 1" />
                </div>
                <div>
                  <InputUpload label="Chiamante 2" />
                  <InputUpload label="Chiamante 3" />
                </div>
              </div>
              <Divider className={classes.divider} />
              <div className={classes.bottoni}>
                <Button variant="contained" color="primary">
                  Conferma
                </Button>

                <Button variant="contained" color="secondary">
                  Cancel
                </Button>
              </div>
            </Paper>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
