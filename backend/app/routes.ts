import express from "express";
import userRoutes from "./user/user.routes";
import apiModuleRoutes from "./api-module/api-module.routes";
import apiUsageRoutes from "./api-usage/api-usage.routes";
import paymentRoutes from "./payment/payment.routes";
// routes
const router = express.Router();

router.use("/users", userRoutes);
router.use("/api-modules", apiModuleRoutes);
router.use("/api-usage", apiUsageRoutes);
router.use("/payment", paymentRoutes);

export default router;