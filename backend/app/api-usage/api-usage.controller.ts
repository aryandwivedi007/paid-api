import { type Request, type Response } from "express";
import asyncHandler from "express-async-handler";
import { createResponse } from "../common/helper/response.helper";
import * as apiUsageService from "../api-usage/api-usage.service";
import { User } from "../user/user.schema";

/**
 * Handles API request by a user.
 */
export const requestApiHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.apiModuleId;
    console.log(id, "id");
    const user = req.user as User;
    const result = await apiUsageService.requestApi(id, user);
    res.send(createResponse(result, "API request processed successfully"));
  }
);

/**
 * Get API analytics (Admin only).
 */
export const getApiAnalyticsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const analytics = await apiUsageService.getApiAnalytics();
    res.send(createResponse(analytics, "API analytics retrieved successfully"));
  }
);
