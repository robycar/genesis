const URL = `http://localhost:9081/`;

//Login
export async function login(username, password) {
  console.warn(username, password);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("username", username);
  urlencoded.append("password", password);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };
  let result = await fetch(`${URL}api/auth/login`, requestOptions);

  result = await result.json();
  console.log(result);
  localStorage.setItem("token", JSON.stringify(result.access_token));
  // history.push("/dashboard/testcase");
  window.location = "/dashboard/testcase";
}
