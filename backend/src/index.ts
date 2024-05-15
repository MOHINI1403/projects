/*import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from "mongoose";
import { router as userRoutes } from "./routes/users";
import {router as authRoutes} from "./routes/auth";
mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)
const app=express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// this tells that our server is going to accept requests form this url and that url must include the credentials i.e HTTP cookie which is sent by the browser to the server
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
}));
// end point routes 

app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)
/*app.get("/api/test",async(res:Response)=>{
    res.json({message: "Hey There this is a testing server"});
    console.log("Executed !! ");
});
app.listen(7700,()=>{
    console.log("server is running on hsost 7700")
})
*/
/*app.get("/api/test", async (req, res: Response) => {
    try {
        // Send a JSON response
        res.json({ message: "Hey There this is a testing server" });
        console.log("Executed !! ");
    } catch (error) {
        // Handle errors
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});*/

/*
import cors from "cors";
import "dotenv/config";
import express, { Response,Router} from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
mongoose.connect(process.env.MONGO_CONNECTION_STRING as string);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// this tells that our server is going to accept requests form this url and that url must include the credentials i.e HTTP cookie which is sent by the browser to the server
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
// end point routes

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
/*app.get("/api/test",async(res:Response)=>{
    res.json({message: "Hey There this is a testing server"});
    console.log("Executed !! ");
});
app.listen(7700,()=>{
    console.log("server is running on hsost 7700")
})
*/
/*
app.get("/api/test", async (req, res: Response) => {
  try {
    // Send a JSON response
    res.json({ message: "Hey There this is a testing server" });
    console.log("Executed !! ");
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
*/
import cors from "cors";
import "dotenv/config";
import express, { Response } from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
mongoose.connect(process.env.MONGO_CONNECTION_STRING as string);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// this tells that our server is going to accept requests form this url and that url must include the credentials i.e HTTP cookie which is sent by the browser to the server
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
// end point routes

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
/*app.get("/api/test",async(res:Response)=>{
    res.json({message: "Hey There this is a testing server"});
    console.log("Executed !! ");
});
app.listen(7700,()=>{
    console.log("server is running on hsost 7700")
})
*/
app.get("/api/test", async (req, res: Response) => {
  try {
    // Send a JSON response
    res.json({ message: "Hey There this is a testing server" });
    console.log("Executed !! ");
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
