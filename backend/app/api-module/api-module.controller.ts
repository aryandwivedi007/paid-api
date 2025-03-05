import { type Request, type Response } from "express";
import asyncHandler from "express-async-handler";
import { createResponse } from "../common/helper/response.helper";
import createHttpError from "http-errors";
import * as apiModuleService from "./api-module.service";

/**
 * Creates a new API module (Admin only).
 */
export const createApiModule = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await apiModuleService.createApiModule(req.body);
    res.send(createResponse(result, "API module created successfully"));
  }
);

/**
 * Updates an existing API module (Admin only).
 */
export const updateApiModule = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await apiModuleService.updateApiModule(
      req.params.id,
      req.body
    );
    res.send(createResponse(result, "API module updated successfully"));
  }
);

/**
 * Deletes an API module by ID (Admin only).
 */
export const deleteApiModule = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await apiModuleService.deleteApiModule(req.params.id);
    res.send(createResponse(result, "API module deleted successfully"));
  }
);

/**
 * Gets a single API module by ID.
 */
export const getApiModuleById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await apiModuleService.getApiModuleById(req.params.id);
    if (!result) {
      throw createHttpError(404, "API module not found");
    }
    res.send(createResponse(result));
  }
);

/**
 * Gets all API modules.
 */
export const getAllApiModules = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await apiModuleService.getAllApiModules();
    res.send(createResponse(result));
  }
);
