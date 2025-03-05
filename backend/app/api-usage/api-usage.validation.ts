import { param } from "express-validator";

/**
 * Validation for API requests.
 */
export const requestApiValidator = [
    param("apiModuleId")
        .notEmpty().withMessage("API module ID is required")
        .isUUID().withMessage("Invalid API module ID format"),
];
