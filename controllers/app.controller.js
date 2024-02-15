import AsyncHandler from "express-async-handler";
import status from "http-status";
const { OK } = status;

export const getHome = AsyncHandler(async (req, res, next) => {
  try {
    res.status(OK).json({
      status: "success",
      statusCode: OK,
      message: "Backend Home Page",
    });
  } catch (error) {
    next(error);
  }
});
