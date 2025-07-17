import { FormRow } from "../components/FormRow";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { Form } from "react-router-dom";
import {customFetch} from "../utils/customFetch";
import { toast } from "react-toastify";
import { SubmitBtn } from "../components/SubmitBtn";

export const action = async ({request}) => {
  
  const formData = await request.formData();  
    const file = formData.get("avatar");
    // console.log(file, "anaja", file.size);
    
    if (file && file.size > 5000000) {
      toast.error("image size too large");
    }
        try {
          await customFetch.patch("/users/update-user", formData);
          toast.success("Profile Updated Sucessfully!");
        } catch (error) {
          toast.error(error?.response?.data?.msg);
        }
}

export const Profile = () => {
    const {user} = useOutletContext()
    const {name,lastname,email,location} = user
    return (
    <Wrapper>
   <Form method="post" className="form" encType="multipart/form-data">
<h4 className="form-title">Profile</h4>
<div className="form-center">
    {/* File Input */}
    <div className="form-row">
        <label htmlFor="avatar" className="form-label">
            Select an image file (max 0.5 MB)
        </label>
        <input type="file" id="avatar" name="avatar" className="form-input" accept="image/*"/>
    </div>
   <FormRow type="text" name="name" defaultValue={name}/>
   <FormRow type="text" name="lastname" labelText="last name" defaultValue={lastname}/>
   <FormRow type="email" name="email" defaultValue={email} />
   <FormRow type="text" name="location" defaultValue={location}/>
  <SubmitBtn formBtn />
  </div>
   </Form>
    </Wrapper>
  );
};
