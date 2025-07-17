import Wrapper from "../assets/wrappers/LandingPage"
import main from "../assets/images/main.svg"
import { Logo } from "../components/logo"
import { Link } from "react-router-dom"

export const Landing = ()=>{
    return (
      <Wrapper>
        <nav>
          <Logo></Logo>
        </nav>
        <div className="container page">
          <div className="info">
            <h1>
              Job <span>tracking</span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              aspernatur aliquam obcaecati reiciendis eum. Esse voluptates at
              sed aspernatur nisi consequuntur consequatur ea. Aliquam, dolore.
              Aperiam amet optio corporis id?
            </p>
            <Link to="/register" className="btn register-link">
              Register
            </Link>
            <Link to="/login" className="btn ">
              Login/Demo user
            </Link>
          </div>
          <img src={main} alt="job hunt" className="img main-img" />
        </div>
      </Wrapper>
    );
}

