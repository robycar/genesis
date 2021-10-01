// const URL = `http://localhost:9081/`;
import { version } from "os";
import acccessControl from "url";


let bearer = `Bearer ${localStorage.getItem("token")}`;

//Login
export async function login(username, password) {
  console.warn(username, password);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Access-Control-Allow-Origin", acccessControl);
  myHeaders.append("Access-Control-Allow-Credentials", "true");

  var urlencoded = new URLSearchParams();
  urlencoded.append("username", username);
  urlencoded.append("password", password);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };
  let result = await fetch(`api/auth/login`, requestOptions);

  result = await result.json();
  return result;
}

//----------CHIAMATE GENERALI-------------

export async function getGenerale(indirizzo) {
  var myHeaders = new Headers();

  myHeaders.append("Authorization", bearer);
  myHeaders.append("Access-Control-Allow-Origin", acccessControl);
  myHeaders.append("Access-Control-Allow-Credentials", "true");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let result = await fetch(`/api/` + indirizzo, requestOptions)

  result = await result.json();
  return result;

};

//----------------------AMMINISTRAZIONE-----------------------------------
//-------------Gestione Utenti---------------
export async function aggiornaUtente(id, version, username, cognome, nome, email, levelId, gruppoId, password) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", bearer);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", acccessControl);
  myHeaders.append("Access-Control-Allow-Credentials", "true");

  var raw = JSON.stringify({
    user: {
      id: id,
      version: version,
      username: username,
      cognome: cognome,
      nome: nome,
      email: email,
      level: {
        id: levelId, //aggiornare qui per passare ID corretto    arr1[newData.level.id].id
      },
      gruppo: {
        id: gruppoId, //aggiornare qui per passare ID corretto    arr1[newData.level.id].id
      },
    },
    password: password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let result = await fetch(`/api/user`, requestOptions)

  result = await result.json();
  return result;

}

//-------------Gestione Ruoli----------------
export async function aggiornaRuolo(id, version, nome, descrizione) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", bearer);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", acccessControl);
  myHeaders.append("Access-Control-Allow-Credentials", "true");

  var raw = JSON.stringify({
    id: id,
    version: version,
    nome: nome,
    descrizione: descrizione,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let result = await fetch(`/api/level`, requestOptions)

  result = await result.json();
  return result;

}
