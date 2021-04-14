import axios from "axios";

function createInstance() {
  return axios.create({
    baseURL: "http://nisuwainc.cafe24app.com",
  });
}

export const instance = createInstance();
