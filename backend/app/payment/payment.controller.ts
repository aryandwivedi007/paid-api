import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { createResponse } from "../common/helper/response.helper";
import * as paymentService from "./payment.service";
import { User } from "../user/user.schema";

/**
 * Handles wallet top-up.
 */
export const addBalanceHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user as User;
    const { amount } = req.body;
    const result = await paymentService.addBalance(user._id, amount);
    res.send(createResponse(result, "Balance added successfully"));
  }
);
