// import { nanoid } from "nanoid";
import Job from "../models/JobModel.js";
import {StatusCodes} from "http-status-codes"
import mongoose from "mongoose";
import day from "dayjs";
import match from "nodemon/lib/monitor/match.js";

//Local Data
// let jobs = [
//   {
//     id: nanoid(),
//     company: "Apple",
//     position: "Frontend",
//   },
//   {
//     id: nanoid(),
//     company: "Google",
//     position: "Backend",
//   },
// ];

export const GetAllJobs = async (req,res) => { 
// console.log(req.user);
// console.log(req.query);

const {search,jobStatus,jobType,sort} = req.query

const queryObject = {
  createdBy: req.user.userId,
};
if(search){
  queryObject.$or = [
    {position : {$regex:search,$options:'i'}},
    {company:{$regex:search, $options:"i"}},
  ]
}

if(jobStatus && jobStatus !== 'all'){
  queryObject.jobStatus = jobStatus
}

if (jobType && jobType !== "all") {
  queryObject.jobType = jobType;
}

const sortOptions = {
  newest: "-createdAt",
  oldest: "createdAt",
  "a-z": "position",
  "z-a": "-position",
};

const sortKey = sortOptions[sort] || sortOptions.newest
//Setup pagination

const page = Number(req.query.page) || 1
const limit = Number(req.query.limit) || 10
const skip = (page-1) * limit

    const jobs = await Job.find(queryObject).sort(sortKey).skip(skip).limit(limit);
    const totalJobs = await Job.countDocuments(queryObject)
   const numOfPages = Math.ceil(totalJobs/limit)
    res
      .status(StatusCodes.OK)
      .json({ message: "data fetch sucessfullly", totalJobs,numOfPages,currentPage:page, jobs });
}

export const CreateJob = async (req, res) => {
     
    // const { company, position } = req.body;
    req.body.createdBy = req.user.userId

    // if (!company || !position) {
    //   return res
    //     .status(StatusCodes.BAD_REQUEST)
    //     .json({ message: "please provide a company and position" });
    // }
    // const id = nanoid();
    // const job = { id, company, position };
    // jobs.push(job);

    const job = await Job.create(req.body);

    if (job) {
      res
        .status(StatusCodes.CREATED)
        .json({ message: "Job created sucessfully!!", data: job });
    }
  

};

export const GetSingleJob = async (req, res) => {
  // const { id } = req.params;
  // const job = jobs.find((job)=>job.id==id)
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ message: "Fetch sucessfully", data: job });
} 

export const EditJob = async (req, res) => {
    // const { company, position } = req.body;
    // const { id } = req.params;
  
    // if (!company || !position) {
    //   return res
    //     .status(StatusCodes.BAD_REQUEST)
    //     .json({ message: "please provide a company and position" });
    // }
  
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res
      .status(StatusCodes.OK)
      .json({ message: "Job updated sucessfully!!", data: job });
  }

  export const DeleteJob = async (req, res) => {
    // const { id } = req.params;

    const deleteJob = await Job.findByIdAndDelete(req.params.id);  
    res
      .status(StatusCodes.OK)
      .json({ message: "Job deletes sucessfully!!", data: deleteJob });
  };
 
export const showStats = async (req,res) => {

  let stats = await Job.aggregate([
    {$match:{createdBy:new mongoose.Types.ObjectId(req.user.userId)}},
    {$group:{_id:"$jobStatus",count:{$sum:1}}}
  ])
  // console.log(stats);

  stats = stats.reduce((acc,curr)=>{
    const {_id:title,count} = curr
    acc[title]=count
    return acc
  },{})
  
  // console.log(stats);
  
  const defaultStats = {
    pending:stats.pending || 0,
    interview:stats.interview || 0,
    declined:stats.declined || 0
  }

  let monthlyApplication = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: {year:{$year:'$createdAt'},month:{$month:'$createdAt'}},count:{$sum:1} } },
    {$sort:{'_id.year':-1,'_id.month':-1}},
    {$limit: 6}
  ]);



  monthlyApplication = monthlyApplication.map((item)=>{
    const {
      _id: { year, month },
      count,
    } = item;

    const date = day().month(month-1).year(year).format('MMM YY')
    return {date,count}
  }).reverse()

  console.log(monthlyApplication);
  

  // let monthlyApplication = [
  //   {
  //     date: "May 24",
  //     count: 12,
  //   },
  //   {
  //     date: "June 24",
  //     count: 25,
  //   },
  //   {
  //     date: "July 24",
  //     count: 10,
  //   },
  // ];
  res.status(StatusCodes.OK).json({defaultStats,monthlyApplication})
  
}
