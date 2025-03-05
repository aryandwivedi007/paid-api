import { Router } from "express";
import { catchError } from "../common/middleware/catch-error.middleware";
import { roleAuth } from "../common/middleware/role-auth.middleware";
import * as apiModuleController from "./api-module.controller";
import * as apiModuleValidator from "./api-module.validation";

const router = Router();

router
  .post(
    "/",
    roleAuth(["ADMIN"]),
    apiModuleValidator.createApiModule,
    catchError,
    apiModuleController.createApiModule
  )
  .patch(
    "/:id",
    roleAuth(["ADMIN"]),
    apiModuleValidator.updateApiModule,
    catchError,
    apiModuleController.updateApiModule
  )
  .delete(
    "/:id",
    roleAuth(["ADMIN"]),
    catchError,
    apiModuleController.deleteApiModule
  )
  .get(
    "/:id",
    roleAuth(["ADMIN", "USER"]),
    catchError,
    apiModuleController.getApiModuleById
  )
  .get(
    "/",
    roleAuth(["ADMIN", "USER"]),
    catchError,
    apiModuleController.getAllApiModules
  );

export default router;
