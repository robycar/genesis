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

  let result = await fetch(`/api/${indirizzo}`, requestOptions);

  result = await result.json();
  return result;
}

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

  let result = await fetch(`/api/${indirizzo}/${id}`, requestOptions);

  result = await result.json();
  return result;
}

//------PUT------
export async function putGenerale(indirizzo, object) {
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

  let result = await fetch(`/api/${indirizzo}`, requestOptions);

  result = await result.json();
  return result;
}

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

  let result = await fetch(`/api/${indirizzo}`, requestOptions);

  result = await result.json();
  return result;
}

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

  let result = await fetch(`/api/${indirizzo}`, requestOptions);

  result = await result.json();
  return result;
}

//-------------------------TEMPLATE-------------------------------
//---------Aggiungi File--------
export async function postAddFile(indirizzo, id, files) {
  var arrayFile = Object.values(files);
  var myHeaders = new Headers();
  myHeaders.append("Authorization", bearer);
  myHeaders.append("Access-Control-Allow-Origin", acccessControl);
  myHeaders.append("Access-Control-Allow-Credentials", "true");

  var formdata = new FormData();
  for (let i = 0; i < arrayFile.length; i++) {
    formdata.append("file", arrayFile[i], arrayFile[i].name);
  }

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  let result = await fetch(`/api/${indirizzo}/${id}`, requestOptions);

  result = await result.json();
  return result;
}

//---------Modifica Files--------
export async function postModificaFiles(indirizzo, files) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", bearer);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("content", files);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  let result = await fetch(`${indirizzo}`, requestOptions);

  result = await result.json();
  return result;
}

//----------Delete Files---------
export async function deleteFiles(indirizzo, id, path) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", bearer);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", acccessControl);
  myHeaders.append("Access-Control-Allow-Credentials", "true");

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  let result = await fetch(`/api/${indirizzo}/${id}/${path}`, requestOptions);

  result = await result.json();
  return result;
}

//---------CREA TEMPLATE-----------
//---------Crea Template------

export async function creaTemplate(
  nome,
  durata,
  tipoTemplate,
  descrizione,
  chiamato,
  naturaChiamato,
  qntChiamanti,
  arrayValue,
  qntNaturaChiamanti
) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", bearer);
  myHeaders.append("Access-Control-Allow-Origin", acccessControl);
  myHeaders.append("Access-Control-Allow-Credentials", "true");

  var formdata = new FormData();
  formdata.append("nome", nome);
  formdata.append("durata", durata);
  formdata.append("typeTemplate", tipoTemplate);
  formdata.append("descrizione", descrizione);

  if (chiamato !== "" && naturaChiamato != "") {
    formdata.append("chiamato", chiamato);
    formdata.append("naturaChiamato", naturaChiamato);
  }
  if (qntChiamanti[0]?.linea && qntNaturaChiamanti[0]?.naturaLinea) {
    formdata.append("chiamanti", qntChiamanti[0].linea);
    formdata.append("naturaChiamanti", qntNaturaChiamanti[0].naturaLinea);
  }
  if (qntChiamanti[1]?.linea && qntNaturaChiamanti[1]?.naturaLinea) {
    formdata.append("chiamanti", qntChiamanti[1].linea);
    formdata.append("naturaChiamanti", qntNaturaChiamanti[1].naturaLinea);
  }
  if (qntChiamanti[2]?.linea && qntNaturaChiamanti[2]?.naturaLinea) {
    formdata.append("chiamanti", qntChiamanti[2].linea);
    formdata.append("naturaChiamanti", qntNaturaChiamanti[2].naturaLinea);
  }
  if (arrayValue[0]?.name) {
    formdata.append("file", arrayValue[0], arrayValue[0]?.name);
  }
  if (arrayValue[1]?.name) {
    formdata.append("file", arrayValue[1], arrayValue[1]?.name);
  }
  if (arrayValue[2]?.name) {
    formdata.append("file", arrayValue[2], arrayValue[2]?.name);
  }
  if (arrayValue[3]?.name) {
    formdata.append("file", arrayValue[3], arrayValue[3]?.name);
  }

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  let result = await fetch(`/api/template`, requestOptions);

  result = await result.json();
  return result;
}
//--------------PUT SPECIFICO PER LINEA GENERATORE ------------------
export async function putFileCsv(
  indirizzo,
  nameOne,
  valueOne,
  nameTwo,
  valueTwo,
  nameThree,
  valueThree,
  nameFour,
  object,
  fileName
) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", bearer);
  myHeaders.append("Access-Control-Allow-Origin", acccessControl);
  myHeaders.append("Access-Control-Allow-Credentials", "true");

  var formdata = new FormData();
  formdata.append(nameOne, valueOne);
  formdata.append(nameTwo, valueTwo);
  formdata.append(nameThree, valueThree);
  formdata.append(nameFour, object, fileName);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  let result = await fetch(`/api/${indirizzo}`, requestOptions);

  result = await result.json();
  return result;
}
