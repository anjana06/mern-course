import { FaTimes } from "react-icons/fa";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { useDashboardContext } from "../pages/DashboardLayout";
import { Logo } from "./logo";
import { links } from "../utils/links";
import { NavLink } from "react-router-dom";
import { Navlinks } from "./Navlinks";

export const SmallSidebar = ()=>{
    const { showSidebar, toggleSidebar } = useDashboardContext();
  
    return (
      <Wrapper>
        <div
          className={
            showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
          }
        >
          <div className="content">
            <button type="button" className="close-btn" onClick={toggleSidebar}>
              <FaTimes />
            </button>
            <header>
              <Logo />
            </header>
            <Navlinks />
            {/* <div className="nav-links">
              {links.map((link) => {
                const { text, path, icon } = link;
                // console.log(text, toggleSidebar, icon);

                return (
                  <NavLink
                    to={path}
                    key={text}
                    className="nav-link"
                    onClick={toggleSidebar}
                  >
                    <span className="icon">{icon}</span>
                    {text}
                  </NavLink>
                );
              })}
            </div> */}
          </div>
        </div>
      </Wrapper>
    );
}
