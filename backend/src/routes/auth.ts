/*import express ,{Request,Response}from "express";
import { check, validationResult } from "express-validator";
import { User } from "../models/user";
import bcrypt from "bcryptjs"
import "dotenv/config";
import jwt from "jsonwebtoken"
const router = express.Router();
const checkPasswordStrength = (password:string, username:string) => {
    // Define regular expressions for password criteria
    const lengthRegex = /^.{8,12}$/;
    const constantRegex = /[a-zA-Z]/;
    const vowelRegex = /[aeiouAEIOU]/;
    const numberRegex = /\d/;
    const specialCharRegex = /[^a-zA-Z0-9]/;

    // Check length
    if (!lengthRegex.test(password)) {
        return 'Password must be 8-12 characters long';
    }

    // Check for character requirements
    if (!constantRegex.test(password)) {
        return 'Password must contain at least one letter';
    }
    if (!vowelRegex.test(password)) {
        return 'Password must contain at least one vowel';
    }
    if (!numberRegex.test(password)) {
        return 'Password must contain at least one number';
    }
    if (!specialCharRegex.test(password)) {
        return 'Password must contain at least one special character';
    }

    // Check for restrictions
    if (password.includes(username)) {
        return 'Password cannot contain the username';
    }

    // Password meets all criteria
    return 'Password strength is good';
};
// Validation middleware for login endpoint
router.post("/login", [
    check("email", "Email is Required !!").isEmail(),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        // Add custom password strength validation here
        .custom((value, { req }) => {
            // Perform password strength check
            // You can use the checkPasswordStrength function from the previous example
            // Modify the function to suit your specific criteria
            if (!checkPasswordStrength(value, req.body.email)) {
                throw new Error("Password strength is not sufficient");
            }
            return true;
        })
], async(req:Request, res:Response) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // If validation passes, continue with login logic
    const {email,password}=req.body;
    //fetching the user's email and password
    try{
        const user = await User.findOne({ email });
        if(!user){
            res.status(400).json({message:"Invalid Credentials !!"});
        }
        else{
            const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(400).json({message:"Invalid Credentials !!"});
        }

        // creating an access token 
        const token=jwt.sign({userId:user.id},process.env.JWT_SECRET_KEY as string,{
            expiresIn:"1d",
        });

        res.cookie("auth_token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            maxAge:86400000,
        });
        res.status(200).json({userId:user?._id});

        }
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Something Went Wrong !!"})
    }
    
});

// Define the checkPasswordStrength function here
// ...

export {router};*/



//auth.ts

/*import express, { Request, Response,Router } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      res.status(200).json({ userId: user._id });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
});

export default router;
*/

import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      res.status(200).json({ userId: user._id });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
});

export default router;
