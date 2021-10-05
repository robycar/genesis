// const URL = `http://localhost:9081/`;
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

//--------------------CHIAMATE GENERALI---------------------

//------GET-----
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

  let result = await fetch(`/api/${indirizzo}`, requestOptions)

  result = await result.json();
  return result;

};

//------GET BY ID-----
export async function getByIdGenerale(indirizzo, id) {
  var myHeaders = new Headers();

  myHeaders.append("Authorization", bearer);
  myHeaders.append("Access-Control-Allow-Origin", acccessControl);
  myHeaders.append("Access-Control-Allow-Credentials", "true");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let result = await fetch(`/api/${indirizzo}/${id}`, requestOptions)

  result = await result.json();
  return result;

};

//------PUT------
export async function putGenerale(indirizzo, object){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", bearer);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", acccessControl);
  myHeaders.append("Access-Control-Allow-Credentials", "true");

  var raw = JSON.stringify(object);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let result = await fetch(`/api/${indirizzo}`, requestOptions)

  result = await result.json();
  return result;
};

//------POST-----
export async function postGenerale(indirizzo, object) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", bearer);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", acccessControl);
  myHeaders.append("Access-Control-Allow-Credentials", "true");

  var raw = JSON.stringify(object);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };


  let result = await fetch(`/api/${indirizzo}`, requestOptions)

  result = await result.json();
  return result;

};

//----------DELETE---------
export async function deleteGenerale(indirizzo, id) {
  var myHeaders = new Headers();

  myHeaders.append("Authorization", bearer);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", acccessControl);
  myHeaders.append("Access-Control-Allow-Credentials", "true");

  var raw = JSON.stringify({
    id: id,
  });

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let result = await fetch(`/api/${indirizzo}`, requestOptions)

  result = await result.json();
  return result;

};
