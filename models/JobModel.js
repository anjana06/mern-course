import mongoose from "mongoose";
import { JOB_STATUS, JOB_TYPE } from "../utils/constant.js";

const JobSchema = mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default:JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: "my city",
    },
    createdBy:{
      type:mongoose.Types.ObjectId,
      ref:'User'
    }
  },
  { timestamps: true }
);

const JobModel =  mongoose.model("job",JobSchema)

export default JobModel