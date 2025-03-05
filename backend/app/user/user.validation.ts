
import { body, checkExact } from 'express-validator';
import * as userService from './user.service';


export const login = checkExact([
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be valid'),
    body('password').notEmpty().withMessage('Password is required').isString().withMessage('Password must be a string'),
]);

export const createUser = checkExact([
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string'),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email must be valid')
        .custom(async (value) => {
            const user = await userService.getUserByEmail(value);
            if (user) throw new Error("Email already exists.");
            return true;
        }),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isString().withMessage('Password must be a string'),

    body('confirmPassword')
        .notEmpty().withMessage('Confirm Password is required')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        }),

    // body('role')
    //     .notEmpty().withMessage('Role is required')
    //     .isIn(["USER", "ADMIN", "INSTRUCTOR"]).withMessage('Role must be one of USER, ADMIN, or INSTRUCTOR'),
]);


export const updateUser = checkExact([
    body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be valid'),
    body('active').isBoolean().withMessage('active must be a boolean'),
    body('password').notEmpty().withMessage('Password is required').isString().withMessage('Password must be a string'),
]);

export const editUser = [
    body('name').isString().withMessage('Name must be a string'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('active').isBoolean().withMessage('active must be a boolean'),
    body('password').isString().withMessage('Password must be a string'),
];

export const refreshToken = [
    body("refreshToken").notEmpty().isString().withMessage("refreshToken must be a string"),
  ];
  