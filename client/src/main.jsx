import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

//Demo purpose of Axios and fetch 
// import { customFetch } from './utils/customFetch.jsx'

// const response = await customFetch.get("/test");

// console.log(response, response.data);


// fetch("/api/v1/test")
//   .then((res) => res.json())
//   .then((data) => console.log(data))




createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <ToastContainer position="top-center" />
  </StrictMode>
);
