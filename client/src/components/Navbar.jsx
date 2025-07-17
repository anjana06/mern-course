import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft } from "react-icons/fa";
import { Logo } from "./logo";
import { useDashboardContext } from "../pages/DashboardLayout";
import { Logout } from "./Logout";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = ()=>{
    const { toggleSidebar } = useDashboardContext();
    
    return (
      <Wrapper>
        <div className="nav-center">
          <button type="button" className="toggle-btn" onClick={toggleSidebar}>
            <FaAlignLeft />
          </button>
          <div className="">
            <Logo />
            <h4 className="logo-text">Dashboard</h4>
          </div>
          <div className="btn-container">
           
           <ThemeToggle/> 
           <Logout/>
          </div>
        </div>
      </Wrapper>
    );
}