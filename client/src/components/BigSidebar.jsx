import Wrapper from "../assets/wrappers/BigSidebar";
import { Navlinks } from "./Navlinks";
import { Logo } from "./logo";
import { useDashboardContext } from "../pages/DashboardLayout";

export const BigSidebar = ()=>{
    const {showSidebar} =useDashboardContext()
    return (
      <Wrapper>
        <div
          className={
            showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
          }
        >
          <div className="content">
            <header>
              <Logo />
            </header>
            <Navlinks isBigSidebar/>
          </div>
        </div>
      </Wrapper>
    );
}