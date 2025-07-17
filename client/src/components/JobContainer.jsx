import { Job } from "./Job"   
import Wrapper from "../assets/wrappers/JobsContainer" 
import { useAllJobsContext } from "../pages/AllJob";
import { PageBtnContainer } from "./PageBtnContainer";
    
    
    export const JobContainer = ()=>{        
      const {data}  = useAllJobsContext();
      console.log(data,"jobcontainer");
      
      const { jobs, totalJobs, numOfPages } = data;
    //   console.log(jobs,"dfjklsd");
      
    
      
      if (jobs.length === 0) {
        return (
          <Wrapper>
            <h2>No jobs to display...</h2>
          </Wrapper>
        );
      }
    return (
      <Wrapper>
        <h5>
          {totalJobs} job{jobs.length > 1 && "s"} found{" "}
        </h5>
        <div className="jobs">
          {jobs.map((job) => {
            return <Job key={job} {...job} />;
          })}
        </div>
        {numOfPages > 1 && <PageBtnContainer />}
      </Wrapper>
    );
    }



