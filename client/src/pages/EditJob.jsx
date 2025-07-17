import { FormRow } from "../components/FormRow";
import { FormRowSelect } from "../components/FormRowSelect";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constant";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import {customFetch} from "../utils/customFetch";
import { SubmitBtn } from "../components/SubmitBtn";


export const loader = async ({params}) => {
    // console.log(params);
    try {
     const {data} = await customFetch.get(`/jobs/${params.id}`)       
     return data   
    } catch (error) {
        toast.error(error?.response?.data?.msg)
        return redirect("/dashboard/alljob");
    }
}

export const action = async ({request,params}) => {
    const formData = await request.formData()   
    const data = Object.fromEntries(formData)    

    try {
        await customFetch.patch(`/jobs/${params.id}`,data);
        toast.success("Job updated Sucessfully!!!")
        return redirect("/dashboard/alljob");
    } catch (error) {
        toast.error(error?.response?.data?.msg)
        return error
}
}
export const EditJob = () => {
    const {data} = useLoaderData()    
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit Job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={data.position} />
          <FormRow type="text" name="company" defaultValue={data.company} />
          <FormRow
            type="text"
            labelText="Job Location"
            name="jobLocation"
            defaultValue={data.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            labeltext="job Status"
            defaultValue={data.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labeltext="job Type"
            defaultValue={data.jobType}
            list={Object.values(JOB_TYPE)}
          />
         <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
