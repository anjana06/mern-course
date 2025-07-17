import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import { useLoaderData, redirect } from "react-router-dom";
import {customFetch} from "../utils/customFetch";
import Wrapper from "../assets/wrappers/StatsContainer";
import { toast } from "react-toastify";
import { StatsItem } from "../components/StatsItem";

export const loader = async () => {
    try {
        const response = await customFetch.get("/users/admin/app-stats")
        return response.data
    } catch (error) {
        toast.error("you are not authorized to view this page")
        return redirect("/dashboard")
    }
}

export const Admin = () => {
    const {users,jobs} = useLoaderData()
  return (
    <Wrapper>
      <StatsItem
        title="Current Users"
        count={users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatsItem
        title="Total Jobs"
        count={jobs}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};
