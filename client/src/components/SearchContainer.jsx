import { FormRow, FormRowSelect, SubmitBtn } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "../../../utils/constant";
import { useAllJobsContext } from "../pages/AllJob";



export const SearchContainer = () => {
  const {searchValues}= useAllJobsContext()
  // console.log(searchValues);
  const {search,jobStatus,jobType,sort} = searchValues
  
  const submit = useSubmit()

  const debounce = (onChange)=>{
    let timeout 
    return (e)=>{
      const form = e.currentTarget.form
      clearTimeout(timeout)
      timeout = setTimeout(()=>{
        onChange(form);
      },2000)
      // console.log(form);
     
      
    }
  }
   

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title"> search Form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form)=>{
              // console.log("hello");
              submit(form)
              
            })}
          />
          <FormRowSelect
            labeltext="job Status"
            name="jobStatus"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labeltext="job Type"
            name="jobType"
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labeltext="sort"
            name="sort"
            defaultValue={sort}
            list={[...Object.values(JOB_SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          <Link to="/dashboard/AllJob" className="btn form-btn delete-btn">
            {" "}
            Reset Search Values
          </Link>

          {/* TEMP!!! */}
          {/* <SubmitBtn formBtn /> */}
        </div>
      </Form>
    </Wrapper>
  );
};
