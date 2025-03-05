import { body } from "express-validator";

/**
 * Validation for adding balance to a user's wallet.
 */
export const addBalanceValidator = [
    body("amount")
        .notEmpty().withMessage("Amount is required")
        .isFloat({ min: 1 }).withMessage("Amount must be greater than zero"),
];
