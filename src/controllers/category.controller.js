import { Category } from "../models/category.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHndler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadFile } from "../utils/cloudinary.service.js";

const getCategory = asyncHandler(async (req, res, next) => {
  // Implement getCategory functionality here
  const categories = await Category.find();
  if (!categories) {
    throw new ApiError("Categories not found", 404);
  }
  const categoryData = categories.map((category) => ({
    title: category.title,
    image: category.image,
  }));
  return res.status(200).json({
    success: true,
    message: "Category data retrieved successfully",
    data: categoryData,
  });
});

const setCategory = asyncHandler(async (req, res, next) => {
  try {
    const { title } = req.body;
    console.log(title);
    console.log(req.files);
    console.log(req.files.image[0]);
    console.log(req.files.image[0].path);
    const imageFile = req.files.image[0].path;

    // Check if title and image are provided
    if (!title || !imageFile) {
      throw new ApiError("Title and Image are required", 400);
    }

    // Check if the category already exists
    const existingCategory = await Category.findOne({ title });
    if (existingCategory) {
      throw new ApiError("Category already exists", 400);
    }
    console.log(existingCategory);
    // Upload image to cloudinary
    const categoryUrl = await uploadFile(imageFile);
    console.log(categoryUrl);
    if (!categoryUrl) {
      throw new ApiError("Image upload failed", 500);
    }

    // Create new category
    const newCategory = await Category.create({
      title,
      image: categoryUrl.url, // Ensure that categoryUrl is a string
    });
    console.log(newCategory);

    if (!newCategory) {
      throw new ApiError("Category creation failed", 500);
    }

    return res
      .status(201)
      .json(new ApiResponse(201, "Category created", newCategory));
  } catch (error) {
    console.error("Error in setCategory:", error);
    return next(error);
  }
});

export { getCategory, setCategory };
