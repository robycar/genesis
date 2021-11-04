import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { Button } from "@material-ui/core";
import "../styles/App.css";
import { NavLink } from "react-router-dom";
import acccessControl from "../service/url.js";
import { tableIcons } from "../components/Icons";

const ViewGruppo = () => {
  const [data, setData] = useState([]);

  const bearer = `Bearer ${localStorage.getItem("token")}`;

  const columns = [
    {
      title: "Username",
      field: "username",
      defaultSort:"desc"
    },
    {
      title: "Nome",
      field: "nome",
    },
    {
      title: "Cognome",
      field: "cognome",
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Ruolo",
      field: "level.nome",
    },
  ];


  useEffect(() => {
    getGruppo();
  }, []);

  //prende l'id dall'url e lo usa per fare la get
  let url = new URL(window.location.href);
  let search_params = url.searchParams;

  const getGruppo = () => {

    var myHeaders = new Headers();

    myHeaders.append("Authorization", bearer);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var raw = JSON.stringify({
      "user": {
        "gruppo": {
          "id": search_params.get('id')
        }
      }
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`/api/user/search`, requestOptions)
      .then((response) => response.json())
      .then((result) => setData(result.users))
      .catch((error) => console.log("error", error));
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      width: 500,
      backgroundColor: theme.palette.background.paper,
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

  const classes = useStyles();
  return (
    <div>
      <MaterialTable
      icons={tableIcons}
        style={{ boxShadow: "none" }}
        title="Partecipanti"
        data={data}
        columns={columns}
        options={{
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          pageSizeOptions: [5, 10, 20, { value: data?.length, label: "All" }],

        }}
        actions={[
          {
            icon: () => (
              <div className={classes.buttonRight}>
                <Button
                  className="button-green"
                  component={NavLink}
                  activeClassName="button-green-active"
                  exact
                  to={"/amministrazione/gruppo"}
                >
                  indietro
                </Button>
              </div>
            ),
            tooltip: "Indietro",
            isFreeAction: true,
          },
        ]}
        localization={{
          header: {
            actions: "Actions",
          },
        }}
      />
    </div>
  );
};

export default ViewGruppo;
