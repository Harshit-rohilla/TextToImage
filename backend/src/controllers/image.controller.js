import asyncHandler from "../utilities/asyncHandler.js";
import ApiResponse from "../utilities/apiResponse.js";
import ApiError from "../utilities/apiError.js";
import { User } from "../models/User.model.js";
import axios from "axios";
import FormData from "form-data";

export const generateImage = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    throw new ApiError(400, "Missing Details");
  }
  const user = await User.findById(req.payload.id);
  if (!user) {
    throw new ApiError(400, "Invalid User");
  }
  if (user.creditsRemaining <= 0) {
    throw new ApiError(400, "No Credits Remaining");
  }
  const credit = user.creditsRemaining;

  const formData = new FormData();
  formData.append("prompt", prompt);
  try {
    const response = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: { "x-api-key": process.env.CLIPDROP_API_KEY },
        responseType: "arraybuffer",
      }
    );
    user.creditsRemaining = user.creditsRemaining - 1;
    // //console.log(response);

    await user.save({ validateBeforeSave: false });
    const base64Image = Buffer.from(response.data, "binary").toString("base64");
    const finalImage = `data:image/png;base64,${base64Image}`;
    // //console.log(finalImage);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { image: finalImage, creditsRemaining: credit - 1 },
          "image generated successfully"
        )
      );
  } catch (error) {
    //console.log(error);
    throw new ApiError(500, "Unable To Generate Image");
  }
});
