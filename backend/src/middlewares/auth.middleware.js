import jwt from "jsonwebtoken";
import asyncHandler from "../utilities/asyncHandler.js";
import ApiError from "../utilities/apiError.js";

export const verifyJwt = asyncHandler((req, res, next) => {
  const accessToken = req.cookies?.accessToken;
  if (!accessToken) {
    throw new ApiError(401, "no token provided");
  }
  try {
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.payload = payload;
    return next();
  } catch (error) {
    //console.log(error);
    throw new ApiError(401, "invalid token");
  }
});
