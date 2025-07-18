import { FormRow } from "../components/FormRow.jsx";
import { FormRowSelect } from "../components/FormRowSelect.jsx";
import Wrapper from "../assets/wrappers/DashboardFormPage.js";
import { useOutletContext } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constant.js";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import {customFetch} from "../utils/customFetch.jsx";
import { SubmitBtn } from "../components/SubmitBtn.jsx";



export const action = async ({request})=>{
const formData = await request.formData()
const data = Object.fromEntries(formData)
// console.log(data);

try {
  await customFetch.post("/jobs",data)
  toast.success("Job Created Sucessfully!")
  return redirect("/dashboard/alljob");
} catch (error) {
  toast.error(error?.response?.data?.msg)
  return error
}


}
export const AddJob = () => {
  const {user} = useOutletContext()

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add Job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={user.location}
          />
          <FormRowSelect
            name="jobStatus"
            labeltext="Job Status"
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labeltext="Job Type"
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
          />
        <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
