import cloudinary from "cloudinary";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import multer from "multer";
import verifyToken from "../middleware/auth";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is Required"),
    body("city").notEmpty().withMessage("City is Required"),
    body("country").notEmpty().withMessage("Country is Required"),
    body("description").notEmpty().withMessage("Description is Required"),
    body("type").notEmpty().isArray().withMessage("Type is Required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("pricePerNight is Required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities is Required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      const uploadPromises = imageFiles.map(async (image) => {
        const base_64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + base_64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
      });

      const imageUrls = await Promise.all(uploadPromises);
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      const hotel = new Hotel(newHotel);
      await hotel.save();

      res.status(201).send(hotel);
    } catch (e) {
      console.log("Error Creating Hotel: ", e);

      return res.status(500).json({ message: "Something went wrong !!" });
    }
  }
);
export default router;
