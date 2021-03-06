import axios from "axios";

const insiders = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000/api"
});

export function getStocksTrending(params = {}) {
  let url = "/trending";
  return insiders
    .get(url, { params })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      throw err;
    });
}
