import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import ButtonClickedBlue from "./ButtonClickedBlue";
import PieChartOutlinedIcon from "@material-ui/icons/PieChartOutlined";
import FilterListIcon from "@material-ui/icons/FilterList";
import "../styles/App.css";
import { Fade, Paper, Typography } from "@material-ui/core";
import SelectBar from "./SelectBar";
import Backdrop from "@material-ui/core/Backdrop";
import BackupIcon from "@material-ui/icons/Backup";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import acccessControl from "../service/url.js";

import loading from "../../src/assets/load.gif";

const TestRunningTable = () => {
  let bearer = `Bearer ${localStorage.getItem("token")}`;


  const [data, setData] = useState([]);


  //-----------GET USER----------------------
  const getAllTestCase = () => {
    var myHeaders = new Headers();

    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/testcase`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllTestCase();
  }, []);

  //---------TABLE COLUMNS------------------
  const columns = [
    {
      title: "ID",
      field: "id",
      defaultSort:"desc"
    },
    {
      title: "Nome",
      field: "nome",
    },
    {
      title: "Descrizione",
      field: "descrizione",
    },
    {
      title: "Versione",
      field: "version",
    },
    {
      title: "Durata",
      field: "expectedDuration",
    }
  ];

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

  const handleChange = () => {
    setData(!data);
  };
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MaterialTable
        style={{ boxShadow: "none" }}
        title="Total Test Case Running"
        data={data}
        columns={columns}
        options={{
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          filtering: true,
          searchFieldAlignment: "left",
          pageSizeOptions: [5, 10, 20, { value: data.length, label: "All" }],
        }}
        actions={[
          // {
          //   icon: () => (
          //     <div className={classes.buttonRight}>
          //       <Button
          //         className="button-green"
          //         component={NavLink}
          //         activeClassName="button-green-active"
          //         exact
          //         to="/amministrazione/addutente"
          //       >
          //         CREA UTENTE
          //       </Button>
          //     </div>
          //   ),
          //   tooltip: "Load Test Suite",
          //   //onClick: () => funzioneFor(),
          //   isFreeAction: true,
          // },
          {
            icon: () => <PieChartOutlinedIcon />,
            tooltip: "Report",
            onClick: (event, rowData) =>
              alert("Ho cliccato " + rowData.id),
            position: "row",
          },
          {
            icon: "play_circle_outlined",
            tooltip: "Launch",
            onClick: (event, rowData) =>
              alert("Ho cliccato " + rowData.id),
            position: "row",
          },
          {
            icon: "delete",
            tooltip: "Delete all selected row",
            onClick: () => alert("Ho cancellato le righe"),
          },
          {
            icon: () => <FilterListIcon />,
            tooltip: "Hide/Show Filter option",
            isFreeAction: true,
            onClick: () => handleChange(),
          },
          {
            icon: () => (
              <ButtonClickedBlue nome="Load Test Case"></ButtonClickedBlue>
            ),
            tooltip: "Load Test Suite",
            onClick: () => handleOpen(),
            isFreeAction: true,
          },
        ]}
        localization={{
          header: {
            actions: "Azioni",
          },
          body: {
            emptyDataSourceMessage: (
              <div style={{display: 'flex',  
                          justifyContent:'center', 
                          alignItems:'center', 
                          height: '10vh', 
                          width: '10vh',
                          margin:'0 auto'}} >
                <img src={loading} alt="loading" />
              </div>
            ),
          },
        }}
      />
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
            <div>
              <ListItem button>
                <ListItemIcon>
                  <BackupIcon className={classes.icon} />
                </ListItemIcon>
                <Typography className={classes.intestazione} variant="h5">
                  Load Test Case
                </Typography>
              </ListItem>
            </div>

            <div className={classes.paperBottom}>
              <Typography variant="h6">Seleziona Test Case</Typography>
              <div className={classes.divSelectBar}>
                <div className={classes.divTextarea}>
                  <Typography className={classes.contenuto} variant="h11">
                    Nome del Test
                  </Typography>
                </div>
                <SelectBar nome="Seleziona" classeName={classes.selectBar} />
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
};

export default TestRunningTable;
