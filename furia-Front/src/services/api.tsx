import axios from "axios";

function server(token?: string) {
  try {
    let param;
    if (token) {
      param = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    } else {
      param = { "Content-Type": "application/json" };
    }

    const api = axios.create({
      baseURL: "http://172.19.80.1:8080",
      headers: param,
    });

    return api;
  } catch (e: any) {
    console.log(e.message);
    throw Error(e.message);
  }
}

export { server };
