import express, { Request, Response } from "express";
import { User } from "../models/user";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();

// Custom function to check password strength
const isStrongPassword = (value: string) => {
    // Define your password strength criteria
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
    return passwordRegex.test(value);
};

// Validation middleware for register endpoint
router.post("/register", [
    check("firstName", "First Name is Required!").isString(),
    check("lastName", "Last Name is Required!").isString(),
    check("email", "Valid Email is Required!").isEmail(),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .custom(value => {
            if (!isStrongPassword(value)) {
                throw new Error("Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be 8-12 characters long");
            }
            return true;
        })
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if the user exists with the given email id
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        // Create a new user
        user = new User(req.body);
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: "1d"
        });

        // Set cookie in HTTP response
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        });

        return res.status(200).send({message:"User Registered !"});
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Something went wrong" });
    }
});

export { router };