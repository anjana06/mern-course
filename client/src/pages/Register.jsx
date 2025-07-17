import {Form,redirect, Link } from "react-router-dom"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import { Logo } from "../components/logo"
import { FormRow } from "../components/FormRow"
import { customFetch } from "../utils/customFetch"
import { toast } from "react-toastify"
import { SubmitBtn } from "../components/SubmitBtn"

export const action = async ({request})=>{
  // console.log(data);
  // return null 
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
//  console.log(formData);
 
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration Sucessfully")
    return redirect("/login");
  } catch (error) {
    // console.log(error);
    
    // toast.error(error) // Chaining 
    toast.error(error?.response?.data?.msg); // optional chainning 
    return error;
  }
} 

export const Register = ()=>{


    return (
      <Wrapper>
        <Form method="POST" className="form">
          <Logo />
          <h4>Register</h4>
          <FormRow type="text" name="name" />
          <FormRow
            type="text"
            name="lastname"
            labelText="Last Name"
          />
          <FormRow type="text" name="location"  />
          <FormRow type="email" name="email"  />
          <FormRow type="password" name="password" />
          <SubmitBtn/>
          <p>
            Already a member?
            <Link to="/login" className="member-btn">
              Login
            </Link>
          </p>
        </Form>
      </Wrapper>
    );
}