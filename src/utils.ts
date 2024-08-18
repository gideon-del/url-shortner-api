import { Response } from "express";
async function serverErrorLogger(res: Response) {
  return res.status(500).json({
    message: "Internal Server error",
  });
}

export { serverErrorLogger };
