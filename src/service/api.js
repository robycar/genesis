// const URL = `http://localhost:9081/`;
import acccessControl from "url";

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

export async function ruolo(id) {
  const bearer = `Bearer ${localStorage.getItem("token")}`;
  
  var myHeaders = new Headers();
  myHeaders.append("Authorization", bearer);
  myHeaders.append("Access-Control-Allow-Origin", acccessControl);
  myHeaders.append("Access-Control-Allow-Credentials", "true");


  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  let result = await fetch(`api/user/`+id, requestOptions);

  result = await result.json();
  return result;
}
