// write controller for banner
import { Banner } from "../models/banner.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHndler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadFile } from "../utils/cloudinary.service.js";

const getBanner = asyncHandler(async (req, res, next) => {
  const { title } = req.body;
  console.log(title);
  if (!title) {
    return next(new ApiError("All fields are required", 400));
  }

  try {
    const banner = await Banner.findOne({ title });
    if (banner) {
      return next(new ApiError("Banner already exists", 400));
    }
    console.log("banner", banner);
    console.log(req.files);
    let bannerlocalpath = req.files.image[0].path;

    console.log(bannerlocalpath);
    if (!bannerlocalpath) {
      return next(new ApiError("Image is required", 400));
    }
    console.log(bannerlocalpath);
    const bannerurl = await uploadFile(bannerlocalpath);
    if (!bannerurl) {
      return next(new ApiError("Image upload failed", 400));
    }
    console.log(bannerurl.url);
    const newBanner = await Banner.create({
      title,
      image: bannerurl.url,
    });
    console.log(newBanner);
    if (!newBanner) {
      return next(new ApiError("Banner creation failed", 400));
    }

    return res
      .status(201)
      .json(new ApiResponse(true, "Banner created", newBanner));
  } catch (error) {
    return next(error); // Pass the error to the error handling middleware
  }
});

export { getBanner };
