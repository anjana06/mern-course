
import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
//Routers
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import mongoose from "mongoose";
//Public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
//Middlewares
import { errorHandleMiddleware } from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});



const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(cookieParser());
app.use(express.json());

app.post("/api/v1", (req, res) => {
  const { name } = req.body;
  res.json({ message: `hello ${name}` });
});

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "Test from Server!!" });
});

// Mount routes
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);


app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,"./public",'index.html'))
})

// Error Middleware
app.use(errorHandleMiddleware);

//Not Found page
app.use("*", (req, res) => {
  res.status(404).json({ message: " page Not Found" });
});

const PORT = process.env.PORT || 3000;

try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`Db and Server running on ${PORT}`);
  });
} catch (error) {
  console.log(error);
}
// app.listen(PORT, () => {
//   console.log(`Server running on ${PORT}`);
// });
