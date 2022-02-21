import axios from "axios";
import { IUser } from "./types";

const api = axios.create({
  baseURL: "http://localhost:3001/",
});

export default api;

export function getUser(): Promise<IUser> {
  return fetch(`http://localhost:8080/auth/user`, {
    credentials: "include",
  }).then(handleResponse);
}

function handleResponse(response: Response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(response.statusText);
  }
}

export function signIn(email: string, password: string): Promise<IUser> {
  return fetch(`http://localhost:8080/auth/login`, {
    credentials: "include",
    method: "POST",
    headers: {
      ContentType: "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
}
