const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
import multer from "multer";
import { default as dotenv } from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUNDINARY_NAME,
  api_key: process.env.CLOUNDINARY_KEY,
  api_secret: process.env.CLOUNDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ["jpg", "png"],
  params: {
    folder: "nienluan_image-post",
  },
});

const uploadClound = multer({ storage: storage });

module.exports = uploadClound;
