import { body, checkExact } from 'express-validator';

/**
 * Validation for creating an API module.
 */
export const createApiModule = checkExact([
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string'),

    body('description')
        .optional()
        .isString().withMessage('Description must be a string'),

    body('pricePerRequest')
        .notEmpty().withMessage('Price per request is required')
        .isFloat({ min: 0 }).withMessage('Price per request must be a positive number'),

    body('isFree')
        .notEmpty().withMessage('isFree flag is required')
        .isBoolean().withMessage('isFree must be a boolean'),
]);

/**
 * Validation for updating an API module.
 */
export const updateApiModule = checkExact([
    body('name')
        .optional()
        .isString().withMessage('Name must be a string'),

    body('description')
        .optional()
        .isString().withMessage('Description must be a string'),

    body('pricePerRequest')
        .optional()
        .isFloat({ min: 0 }).withMessage('Price per request must be a positive number'),

    body('isFree')
        .optional()
        .isBoolean().withMessage('isFree must be a boolean'),
]);
