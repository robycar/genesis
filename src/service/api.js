import axios from "axios";
export function login(param) {
  return axios.post("http://localhost:9081/api/auth/login", param).then(
    (response) => {
      if (response.status === 200) return true;
      if (response.status === 204) return false;
      else throw new Error(response.statusText);
    },
    (error) => {
      throw error;
    }
  );
}
