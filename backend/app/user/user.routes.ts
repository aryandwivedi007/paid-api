
import { Router } from "express";
import passport from "passport";
import { catchError } from "../common/middleware/catch-error.middleware";
import { roleAuth } from "../common/middleware/role-auth.middleware";
import * as userController from "./user.controller";
import * as userValidator from "./user.validation";
import { loginRateLimiter } from "../common/middleware/rate-limiter.middleware";
const router = Router();

router
        .post("/register", userValidator.createUser, catchError, userController.createUser)
        .post("/login", userValidator.login,loginRateLimiter, catchError, userController.login)
        .post("/refreshToken",userValidator.refreshToken,catchError,userController.refreshToken)
        .get("/me", roleAuth(['USER','ADMIN']), userController.getUserInfo)
        .post("/logout", roleAuth(['USER','ADMIN']), userController.logout)
        .delete("/:id", roleAuth(['ADMIN']), userController.deleteUser)
        ///.patch("/:id", roleAuth(['ADMIN', 'USER']), userValidator.editUser, catchError, userController.editUser)
       

export default router;