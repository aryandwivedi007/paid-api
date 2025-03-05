export const userDocs = {
    "/users/register": {
        post: {
            summary: "Register a new user",
            description: "Creates a new user account with the provided details.",
            tags: ["Users"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                name: { type: "string" },
                                email: { type: "string" },
                                password: { type: "string" },
                                confirmPassword: { type: "string" },
                                role: { 
                                    type: "string",
                                    enum: ["USER", "ADMIN"],
                                    default: "USER",
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                201: { description: "User successfully registered" },
                400: { description: "Validation error" },
                500: { description: "Internal server error" },
            },
        },
    },

    "/users/login": {
        post: {
            summary: "User login",
            description: "Allows users to log in with their email and password.",
            tags: ["Users"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: { type: "string" },
                                password: { type: "string" },
                            },
                        },
                    },
                },
            },
            responses: {
                200: { description: "User successfully logged in" },
                400: { description: "Invalid credentials" },
                500: { description: "Internal server error" },
            },
        },
    },

    "/users/refreshToken": {
        post: {
            summary: "Refresh authentication token",
            description: "Generates a new access token using a refresh token.",
            tags: ["Users"],
            security: [{ BearerAuth: [] }], // 🔥 Requires authentication
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                refreshToken: { type: "string" },
                            },
                        },
                    },
                },
            },
            responses: {
                200: { description: "New access token generated" },
                400: { description: "Invalid refresh token" },
                500: { description: "Internal server error" },
            },
        },
    },

    "/users/me": {
        get: {
            summary: "Get user info",
            description: "Retrieves information about the currently authenticated user.",
            tags: ["Users"],
            security: [{ BearerAuth: [] }], // 🔥 Requires authentication
            responses: {
                200: { description: "User info retrieved successfully" },
                401: { description: "Unauthorized" },
                500: { description: "Internal server error" },
            },
        },
    },

    "/users/logout": {
        post: {
            summary: "User logout",
            description: "Logs out the authenticated user and invalidates their session.",
            tags: ["Users"],
            security: [{ BearerAuth: [] }], // 🔥 Requires authentication
            responses: {
                200: { description: "User successfully logged out" },
                400: { description: "Bad request" },
                500: { description: "Internal server error" },
            },
        },
    },

    "/users/{id}": {
        patch: {
            summary: "Update user information",
            description: "Updates the details of a user. Only the ADMIN can update any user, while USERS and INSTRUCTORS can update their own details.",
            tags: ["Users"],
            security: [{ BearerAuth: [] }], // 🔥 Requires authentication
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                    description: "User ID to be updated",
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                name: { type: "string", nullable: true },
                                email: { type: "string", nullable: true },
                                password: { type: "string", nullable: true },
                                role: { 
                                    type: "string",
                                    enum: ["USER", "ADMIN", "INSTRUCTOR"],
                                    description: "Only ADMIN can update roles",
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: { description: "User successfully updated" },
                401: { description: "Unauthorized" },
                403: { description: "Forbidden: Only ADMIN can update roles" },
                404: { description: "User not found" },
                500: { description: "Internal server error" },
            },
        },
    },
};