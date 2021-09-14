import acccessControl from "../service/url";

//Ruolo
export async function GetRuolo(id) {
    
  const bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;
  console.log(bearer);
  var myHeaders = new Headers();
  myHeaders.append("Authorization", bearer);
  myHeaders.append("Access-Control-Allow-Origin", acccessControl);
  myHeaders.append("Access-Control-Allow-Credentials", "true");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let result = await fetch(`api/user`, requestOptions);
  console.log(result)
  result = await result.json();
  return result;
}
