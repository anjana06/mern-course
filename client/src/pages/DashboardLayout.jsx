import { Outlet, redirect, useActionData, useLoaderData,useNavigate} from "react-router-dom"
import { Navbar } from "../components/Navbar"
import Wrapper from "../assets/wrappers/Dashboard";
import { SmallSidebar } from "../components/SmallSidebar";
import { BigSidebar } from "../components/BigSidebar";
import { createContext, useContext, useState } from "react";
import {checkDefaultTheme} from "../App"
import { customFetch } from "../utils/customFetch";
import { toast } from "react-toastify";


export const loader = async () =>{
  try {
    const { data } = await customFetch.get("/users/current-user");    
    return data
  } catch (error) {
    return redirect("/");
  }


}
const DashboardContext = createContext()


export const DashboardLayout = () => {
  const {user} = useLoaderData();
  const navigate = useNavigate()
  // console.log(data);
  
  // temp data
  // const user = {
  //   name: "anjana",
  // };
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    // below line is a vanila JS
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
    // console.log("toggle dark theme");
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    // console.log("open");
  };
  const logout = async () => {
    navigate("/")
    await customFetch.get("/auth/logout");
    toast.success("Logout Sucessfully!!!")
  };
  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logout,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar></Navbar>
            <div className="dashboard-page">
              <Outlet context={{user}} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = ()=> useContext(DashboardContext)