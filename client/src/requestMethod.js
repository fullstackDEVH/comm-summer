import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
let TOKEN ;
try {
  const localstorage = localStorage.getItem("persist:root");
  TOKEN = JSON.parse(JSON.parse(localstorage).user).currentUser.accessToken;
} catch (error) {
  console.log(error.message);
}

export const publicRequest = axios.create({
    baseURL : BASE_URL,
});

export const userRequest = axios.create({
    baseURL : BASE_URL,
    headers : {token : TOKEN}
})
