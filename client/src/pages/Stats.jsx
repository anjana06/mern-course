import {ChartContainer } from "../components/ChartContainer";
import {StatsContainer } from "../components/StatsContainer";
import {customFetch} from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
    try {
      const response = await customFetch.get("/jobs/stats")
      return response.data
    } catch (error) {
        return error
    }
}
export const Stats = () => {
    const { defaultStats, monthlyApplication } = useLoaderData();
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplication?.length > 1 && (
        <ChartContainer data={monthlyApplication} />
      )}
    </>
  );
};
