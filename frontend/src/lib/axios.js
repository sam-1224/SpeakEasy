import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";
// This file is used to create an axios instance that can be used throughout the application
// to make API calls. It sets the base URL for the API requests to the backend server.

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // This allows cookies to be sent with requests for authentication
});
