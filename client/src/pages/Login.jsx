import { Link, Form, redirect, useNavigate} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo } from "../components/logo";
import { FormRow } from "../components/FormRow";
import { customFetch } from "../utils/customFetch";
import { toast } from "react-toastify";
import { SubmitBtn } from "../components/SubmitBtn";

export const action = async ({ request }) => {
 const formData = await request.formData()
 const data = Object.fromEntries(formData);

 try {
  await customFetch.post("/auth/login",data)
  toast.success("Login Sucessfully!!")
  return redirect("/dashboard")
 } catch (error) {
   toast.error(error?.response?.data?.msg)
   return error
 }
};

export const Login = () => {
  const navigate =useNavigate()
  const loginDemoUser = async ()=>{
    const data = {
      email:"test@test.com",
      password:"secret123"
    }
    try {
      await customFetch.post('auth/login',data)
      toast.success("take a test drive")
      navigate('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.msg)
    }
  }
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email"  />
        <FormRow type="password" name="password"  />
       <SubmitBtn/>
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          Explore the app
        </button>
        <p>
          not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
