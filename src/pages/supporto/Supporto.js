import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "../../components/Navbar";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems, secondaryListItems } from "../../components/listItems";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import SelectBar from "../../components/SelectBar";
import { TextareaAutosize } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import NavbarItemSupport from "../../components/NavbarItemSupport";
import ButtonClickedGreen from "../../components/ButtonClickedGreen";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },

  generalContainer: {
    display: "flex",
    padding: "20px",
    flexDirection: "row",
    justifyContent: "space-around",
    marginRight: "20px",
    marginLeft: "20px",
    marginBottom: "20px",
  },
  cardContainer: {
    width: "350px",
  },
  card: {
    alignItems: "center",

    // marginLeft: "10px",
    // marginRight: "10px",
    // marginTop: "10px",
    // marginBottom: "10px",
  },
  modalContainer: {
    width: "full-width",
    backgroundColor: "#9EA0A5",
  },
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
    height: "fit-content",
  },
  paperTop: {
    backgroundColor: "#47B881",
    //height: "30%",
    //opacity: "25%",
    alignItems: "center",
  },
  paperBottom: {
    display: "flex",
    backgrounColor: "#FFFFFF",
    height: "70%",
    padding: "7%",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  intestazione: {
    color: "black",
    marginTop: "9%",
    marginBottom: "4%",
    marginLeft: "7%",
  },
  divSelectBar: {
    marginTop: "8%",
    marginRight: "18%",
  },
  // selectBar: {
  //   marginTop: "50px",
  // },
  divTextarea: {
    marginTop: "10%",
    marginLeft: "1%",
  },
  textarea: {
    width: "410px",
    height: "260px",
    border: "1px solid rgba(0, 0, 0, 0.32)",
    marginTop: "2%",

    // fontFamily: "Roboto",
  },
  // bottone: {
  //   size: "small",
  // },
  divBottone: {
    marginTop: "2%",
  },
}));

function Supporto() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Navbar />
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        <Container maxWidth="lg" className={classes.container}>
          <div className={classes.containerNavbarItem}>
            <NavbarItemSupport fontSize="large" />
          </div>
        </Container>

        <Container className={classes.modalContainer}>
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
                  <Typography variant="h8">
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
                    <Typography variant="h11">
                      Ascoltiamo i tuoi bisogni:
                    </Typography>
                    <TextareaAutosize
                      className={classes.textarea}
                      aria-label="minimum height"
                      rowsMin={10}
                      placeholder="Inserisci il messaggio"
                    />
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
        </Container>
      </main>
    </div>
  );
}

export default Supporto;
