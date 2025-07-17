import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg"


export const Error = ()=>{
    const error = useRouteError();
        if (error.status === 404) {
          return (
            <Wrapper>
              <div>
                <img src={img} alt="not found" />
                <h1>ohh! page not found</h1>
                <p>we can't seem to find the page you are looking for</p>
                <Link to="/dashboard"> Back to Home</Link>
              </div>
            </Wrapper>
          );
        } 
    
    return(
        <>
   <h3>Something went wrong!!</h3>
        </>
    )
}