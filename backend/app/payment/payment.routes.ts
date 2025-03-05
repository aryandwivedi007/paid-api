import { Router } from "express";
import { catchError } from "../common/middleware/catch-error.middleware";
import { roleAuth } from "../common/middleware/role-auth.middleware";
import * as paymentController from "./payment.controller";

const router = Router();

router.post(
  "/",
  roleAuth(["USER"]),
  catchError,
  paymentController.addBalanceHandler
);

export default router;
