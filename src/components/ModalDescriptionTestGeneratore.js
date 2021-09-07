import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { ButtonBase, Fade, FormControl, Paper, TextField, Typography } from "@material-ui/core";
import InputSelect from "./InputSelect";
import Backdrop from "@material-ui/core/Backdrop";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import ImageIcon from "@material-ui/icons/Image";
import IconButton from "@material-ui/core/IconButton";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import InputRadio from "./InputRadio";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "react-bootstrap";
import { Input } from "@material-ui/core";
import ButtonClickedGreen from "./ButtonClickedGreen";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { textChangeRangeIsUnchanged } from "typescript";


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

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3, 2),
    height: "fit-content",
    width: "85%",
  },
  icon: {
    color: "rgba(71, 184, 129, 1)",
  },
  titolo: {
    fontWeight: 500,
    fontStyle: "normal",
    fontSize: "24px",
    color: "#66788A",
    lineHeight: "20px",
    padding: "1%",

  },
  closeButton: {
    color: "#66788A",
    marginLeft: "68%",
  },
  generalContainer: {
    //padding: "3%",
    display: "flex",
    // margin: "2%",
    // marginLeft: "1%",
    alignItems: "center",
    justifyContent: "center",
  },
  divInputRadio: {
    marginBottom: "2%",
  },
  divLinea: {
    marginTop: "3%",
    marginBottom: "9.5%",
  },
  labelLinea: {
    color: "red",
  },
  divider: {
    width: "90%",
    marginLeft: "5%",
    lineHeight: "1px",
    // marginTop: "2%",
  },
  2: {
    marginTop: "1%",
    marginRight: "1%",
  },
  paperContainer2: {
    marginTop: "10px",
    marginRight: "1%",
  },
  paperContainer3: {
    //marginTop: "0px",
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
      <IconButton type="button" onClick={handleOpen} aria-label="show">
        <ImageIcon />
      </IconButton>
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
            <ListItem>
              <ListItemIcon>
                <LibraryBooks fontSize="large" className={classes.icon} />
              </ListItemIcon>
              <Typography className={classes.titolo}>
                {" "}
                Test Generatore Description{" "}
              </Typography>
              <IconButton aria-label="close" className={classes.closeButton}>
                <CloseIcon />
              </IconButton>
            </ListItem>
            <Divider className={classes.divider} />


            <div className={classes.generalContainer}  disabled>

              <Paper className={classes.divLinea} elevation={0}>
                <Typography className={classes.labelLinea} variant="h9">
                  NOME TEST: XXXXX{" "}
                </Typography>
              </Paper>

              <Paper className={classes.paperContainer2} elevation={0}>

                <Paper className={classes.divSelect} elevation={0}>
                  <Typography className={classes.label} variant="h11">
                    Creato da{" "}
                  </Typography>
                  <TextField className="modalTGD" InputProps={{
                        readOnly: true,
                      }} defaultValue="nome"/>
                </Paper>
                
                <Paper className={classes.divSelect} elevation={0}>
                  <Typography className={classes.label} variant="h11">
                    Data creazione{" "}
                  </Typography>
                  <TextField className="modalTGD" InputProps={{
                        readOnly: true,
                      }} defaultValue="01/01/0000" />
                </Paper>

                <Paper className={classes.divSelect} elevation={0}>
                  <Typography className={classes.label} variant="h11">
                    Descrizione{" "}
                  </Typography>
                  <TextField className="modalTGD" InputProps={{
                        readOnly: true,
                      }} defaultValue="descrizione" />
                </Paper>

                <Paper className={classes.divSelect} elevation={0}>
                  <Typography className={classes.label} variant="h11">
                    Template{" "}
                  </Typography>
                  <TextField className="modalTGD" InputProps={{
                        readOnly: true,
                      }} defaultValue="template" />
                </Paper>

              </Paper>


             <Paper className={classes.paperContainer2 } elevation={0}>

              <Paper className={classes.divSelect} elevation={0}>
                  <Typography className={classes.label} variant="h11">
                    Modificato da{" "}
                  </Typography>
                  <TextField className="modalTGD" InputProps={{
                        readOnly: true,
                      }} defaultValue="nome" />
                      
                </Paper>

                <Paper className={classes.divSelect} elevation={0}>
                  <Typography className={classes.label} variant="h11">
                    Data modifica{" "}
                  </Typography>
                  <TextField className="modalTGD" InputProps={{
                        readOnly: true,
                      }} defaultValue="01/01/0000" />
                </Paper>

              <Paper className={classes.divSelect} elevation={0}>
                  <Typography className={classes.label} variant="h11">
                    Ultima data avvio{" "}
                  </Typography>
                  <TextField className="modalTGD" InputProps={{
                        readOnly: true,
                      }} defaultValue="01/01/0000" />
                </Paper>

                <Paper className={classes.divSelect}  elevation={0}>
                  <Typography className={classes.label} variant="h11">
                    Ultima data fine{" "}
                  </Typography>
                  <TextField className="modalTGD" InputProps={{
                        type:"text",
                        readOnly: true,
                      }} defaultValue="nome" />
                </Paper>



              </Paper>

              <Paper className={classes.paperContainer2 } elevation={0}>


              <Paper className={classes.divSelect} elevation={0}>
                  <Button  className="button-green-active my-5  btn-block" >scarica Path CSV chiamato</Button>
                </Paper>

                <Paper className={classes.divSelect} elevation={0}>
                  <Button  className="button-green-active my-5  btn-block" >scarica Path CSV chiamante</Button>
                </Paper>

                <Paper className={classes.divSelect} elevation={0}>
                  <Button  className="button-green-active my-5  btn-block" >visualizza report</Button>
                </Paper>


              </Paper>

            </div>

            {/* <Divider className={classes.divider} /> */}
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}
