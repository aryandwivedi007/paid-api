import { Router } from "express";
const router = Router();
import * as apiUsageController from "./api-usage.controller";
import * as apiUsageValidation from "./api-usage.validation";
import { roleAuth } from "../common/middleware/role-auth.middleware";
router.post(
  "/:apiModuleId",
  roleAuth(["USER"]),
  apiUsageValidation.requestApiValidator,
  apiUsageController.requestApiHandler
);

router.get(
  "/analytics",
  roleAuth(["ADMIN"]), // ✅ Only admins can access this
  apiUsageController.getApiAnalyticsHandler
);
export default router;
