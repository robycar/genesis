import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Alert from "@material-ui/lab/Alert";
import { Typography, Fade } from "@material-ui/core";
import { MenuItem, Paper } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Form from "react-bootstrap/Form";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },
//   toolbar: {
//     paddingRight: 24, // keep right padding when drawer closed
//   },
//   toolbarIcon: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "flex-end",
//     padding: "0 8px",
//     ...theme.mixins.toolbar,
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//   },
//   appBarShift: {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   menuButton: {
//     marginRight: 36,
//   },
//   menuButtonHidden: {
//     display: "none",
//   },
//   title: {
//     flexGrow: 1,
//   },
//   drawerPaper: {
//     position: "relative",
//     whiteSpace: "nowrap",
//     width: drawerWidth,
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   drawerPaperClose: {
//     overflowX: "hidden",
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     width: theme.spacing(7),
//     [theme.breakpoints.up("sm")]: {
//       width: theme.spacing(9),
//     },
//   },
//   appBarSpacer: theme.mixins.toolbar,
//   content: {
//     flexGrow: 1,
//     height: "100vh",
//     overflow: "auto",
//   },
//   container: {
//     paddingTop: theme.spacing(4),
//     paddingBottom: theme.spacing(4),
//   },
//   paper: {
//     padding: theme.spacing(2),
//     display: "flex",
//     overflow: "auto",
//     flexDirection: "column",
//     //backgroundColor: "yellow",
//     alignItems: "center",
//     marginLeft: "1%",
//   },
//   fixedHeight: {
//     height: 240,
//   },
//   buttonContainer: {
//     marginBottom: "20px",
//     marginLeft: "1%",
//   },
//   generalContainer: {
//     display: "flex",
//     marginTop: "5%",
//   },
//   paperContainer1: {
//     display: "flex",
//     flexDirection: "column",
//     padding: "20px",
//     marginRight: "8%",
//   },
//   paperContainer2: {
//     flexDirection: "column",
//     padding: "20px",
//     marginBottom: "10%",
//   },
//   divSelect: {
//     padding: "5%",
//     // height: "115.6px",
//   },
//   bottone: {
//     marginLeft: "65%",
//     marginTop: "2%",
//   },
//   divider: {
//     width: "90%",
//     marginLeft: "5%",
//     lineHeight: "1px",
//     marginTop: "2%",
//   },
//   titolo: {
//     fontWeight: 500,
//     fontStyle: "normal",
//     fontSize: "24px",
//     color: "#66788A",
//     lineHeight: "20px",
//     padding: "2%",
//     // marginTop: "2%",
//   },
//   InputSelect: {
//     width: "364.8px",
//   },
//   modaleAddLinea: {
//     marginLeft: "75%",
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     // width: "20vw",
//     width: "340px",
//     display: "flex",
//   },
//   formControlIp: {
//     margin: theme.spacing(1),
//     width: "70px",
//   },
//   divIp: {
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "flex-end",
//   },
//   separatoreIp: {
//     marginBottom: "2%",
//     fontWeight: "600px",
//     lineHeigth: "2%",
//     //fontSize: "2px",
//   },
//   select: {
//     widht: "380x",
//     height: "40px",
//     padding: "2%",
//     alignItems: "center",
//   },

//   paper2: {
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     border: "2px solid #000",
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(4, 6, 3),
//   },
//   modal: {
//     display: "flex",
//     marginBottom: "5%",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   paperBottom: {
//     display: "flex",
//     flexDirection: "column",
//     backgrounColor: "#FFFFFF",
//     justifyContent: "center",
//     marginTop: "5%",
//     marginBottom: "2px",
//     padding: "5%",
//   },

//   intestazione: {
//     color: "#47B881",
//     marginTop: "5%",
//   },
//   icon: {
//     transform: "scale(1.8)",
//     color: "#47B881",
//     marginTop: "8px",
//   },
//   bottoni: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   divider2: {
//     marginTop: "6%",
//     marginBottom: "5%",
//   },
// }));

const Prova = ({nome}) => {
  
  // const classes = useStyles();
  return(
    <div>
    {/* <Paper className={classes.paperContainer1} elevation={0}>
              <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Numero">
                  <Form.Label>Linea</Form.Label>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <Select
                      id="selectLinea"
                      value={lineaChiamato}
                      onChange={(e) => nome}
                    >
                      {appearLinea.map((linea) => {
                        return (
                          <MenuItem key={linea.id} value={linea.id}>
                            {linea.numero}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <Alert
                      severity="error"
                      id="alertLinea"
                      style={{ display: "none" }}
                    >
                      Selezionare la Linea
                    </Alert>
                  </FormControl>
                </Form.Group>

                <Form.Group >
                  <Form.Label>OBP</Form.Label>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <Select
                      id="selectOBP"
                      value={OBPChiamato}
                      onChange={(e) => setOBPChiamato(e.target.value)}
                    >
                      {appearOBP.map((OBP) => {
                        return (
                          <MenuItem key={OBP.id} value={OBP.id}>
                            {OBP.descrizione}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <Alert
                      severity="error"
                      id="alertOBP"
                      style={{ display: "none" }}
                    >
                      Selezionare l'OBP
                    </Alert>
                  </FormControl>
                </Form.Group>
              </Paper>
            </Paper>

            <Paper className={classes.paperContainer2} elevation={0}>
              <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Numero">
                  <Form.Label>File</Form.Label>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <Select
                      value={fileChiamato}
                      onChange={(e) => setFileChiamato(e.target.value)}
                    >
                      {appearFile.map((file) => {
                        return (
                          <MenuItem key={file.id} value={file.id}>
                            {file.path}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <Alert
                      severity="error"
                      id="alertFile"
                      style={{ display: "none" }}
                    >
                      Selezionare un File!
                    </Alert>
                  </FormControl>
                </Form.Group>

                <Form.Group controlId="form.Numero">
                  <Form.Label>Quanti chiamanti vuoi inserire?</Form.Label>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <Select
                      value={numChiamanti}
                      onChange={(e) => setNumChiamanti(e.target.value)}
                    >
                      {appearChiamanti.map((chiamanti) => {
                        return (
                          <MenuItem key={chiamanti.valore} value={chiamanti.valore}>
                            {chiamanti.valore}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <Alert
                      severity="error"
                      id="alertFile"
                      style={{ display: "none" }}
                    >
                      Selezionare un File!
                    </Alert>
                  </FormControl>
                </Form.Group>
              </Paper>
            </Paper> */}
            <button onClick={nome}>sksksks</button>
            </div>
  )
   }

export default Prova;
