import {FaUserCircle,FaCaretDown} from "react-icons/fa"
import Wrapper from "../assets/wrappers/LogoutContainer"
import {useState} from "react"
import { useDashboardContext } from "../pages/DashboardLayout"


export const Logout = ()=>{
    const [showLogout,setShowLogout] = useState()
    const { user, logout } = useDashboardContext();

    return (
      <Wrapper>
        <button
          type="button"
          className="btn logout-btn"
          onClick={() => setShowLogout(!showLogout)}
        >
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" className="img" />
          ) : (
            <FaUserCircle />
          )}

          {user?.name}
          <FaCaretDown />
        </button>
        <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
          <button type="button" className="dropdown-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </Wrapper>
    );
}