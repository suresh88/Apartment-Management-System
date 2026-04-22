import axios from "axios";

export const API = axios.create({
  baseURL: "https://retinal-lark-phony.ngrok-free.dev/api",
  withCredentials: true,
  headers: {
    "Cache-Control": "no-cache",
  },
});

/* http://localhost:5000/api */
/* https://retinal-lark-phony.ngrok-free.dev/api */