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
import NavbarItemEdit from "../../components/NavbarItemEdit";
import { ListItem, ListItemIcon, Paper, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import InputSelect from "../../components/InputSelect";
import "../../styles/App.css";
import DnsIcon from "@material-ui/icons/Dns";
import SelectBar from "../../components/SelectBar";
import MultipleSelect from "../../components/MultipleSelect";

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
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "blue",
  },

  fixedHeight: {
    height: 240,
  },
  buttonContainer: {
    marginBottom: "20px",
  },

  paper: {
    //backgroundColor: "yellow",
    display: "flex",
    alignItems: "center",
    padding: "3%",
    justifyContent: "flex-start",
  },

  label: {
    marginRight: "4%",
    marginLeft: "8%",
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
    color: "rgba(71, 184, 129, 1)",
    padding: "2%",
    // marginTop: "2%",
  },
  divider: {
    width: "90%",
    marginLeft: "5%",
    lineHeight: "1px",
  },
  paperBottone: {
    //padding: "2%",
  },
  bottone: {
    marginTop: "2%",
    marginLeft: "85%",
    marginBottom: "2%",
  },
  divSelect: {
    marginLeft: "5%",
  },
  label1: {
    marginRight: "8%",
  },
  label2: {
    marginRight: "12%",
  },
  label3: {
    marginRight: "12.5%",
  },
  multipleSelect: {
    width: "284px",
  },
}));

function EditingOutboundProxy() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerClose = () => {
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

      <Container maxWidth="lg" className={classes.container}>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <div className={classes.containerNavbarItem}>
            <NavbarItemEdit fontSize="large" />
          </div>

          <div className={classes.buttonContainer}>
            <Button
              className="button-green"
              component={NavLink}
              activeClassName="button-green-active"
              exact
              to="/editing/linee"
            >
              LINEE
            </Button>
            {/* </NavLink> */}

            {/* <NavLink exact to="/dashboard/testsuite"> */}
            <Button
              className="button-green"
              component={NavLink}
              activeClassName="button-green-active"
              exact
              to="/editing/outboundproxy"
            >
              OUTBOUND PROXY
            </Button>
            <Button
              className="button-green"
              component={NavLink}
              activeClassName="button-green-active"
              exact
              to="/editing/template"
            >
              TEMPLATE
            </Button>
            <Button
              className="button-green"
              component={NavLink}
              activeClassName="button-green-active"
              exact
              to="/editing/testcase"
            >
              TEST
            </Button>
          </div>
          <Paper className={classes.generalPaper}>
            <ListItem>
              <ListItemIcon>
                <DnsIcon fontSize="large" className={classes.icon} />
              </ListItemIcon>
              <Typography className={classes.titolo}>
                {" "}
                OutboundBound Proxy{" "}
              </Typography>
            </ListItem>
            <Divider className={classes.divider} />

            <Paper className={classes.divSelect} elevation={0}>
              <Paper className={classes.paper} elevation={0}>
                <Typography className={classes.label1}>
                  Proxy IP Address
                </Typography>
                <InputSelect />
                <Typography>:</Typography>
                <InputSelect />
              </Paper>

              <Paper className={classes.paper} elevation={0}>
                <Typography className={classes.label2}>Descrizione</Typography>
                <InputSelect />
              </Paper>

              <Paper className={classes.paper} elevation={0}>
                <Typography className={classes.label3}>Tipo Linea</Typography>
                <MultipleSelect className={classes.multipleSelect} />
              </Paper>
            </Paper>
            <Paper className={classes.paperBottone}>
              <Divider className={classes.divider} />
              <Button
                variant="contained"
                color="primary"
                className={classes.bottone}
              >
                Salva
              </Button>
            </Paper>
          </Paper>
        </main>
      </Container>
    </div>
  );
}

export default EditingOutboundProxy;
