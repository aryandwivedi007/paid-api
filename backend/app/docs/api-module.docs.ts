export const apiModuleDocs = {
    "/api-modules": {
        post: {
            summary: "Create a new API module",
            description: "Allows an admin to create a new API module.",
            tags: ["API Modules"],
            security: [{ BearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                name: { type: "string", example: "Weather API" },
                                description: { type: "string", example: "Fetch weather data" },
                                pricePerRequest: { type: "number", example: 0.5 },
                                isFree: { type: "boolean", example: false },
                            },
                            required: ["name", "pricePerRequest", "isFree"],
                        },
                    },
                },
            },
            responses: {
                201: { description: "API module created successfully" },
                400: { description: "Validation error" },
                401: { description: "Unauthorized access" },
                500: { description: "Internal server error" },
            },
        },
        get: {
            summary: "Get all API modules",
            description: "Retrieve a list of all available API modules.",
            tags: ["API Modules"],
            security: [{ BearerAuth: [] }],
            responses: {
                200: {
                    description: "List of API modules",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string", format: "uuid", example: "550e8400-e29b-41d4-a716-446655440000" },
                                        name: { type: "string", example: "Weather API" },
                                        description: { type: "string", example: "Fetch weather data" },
                                        pricePerRequest: { type: "number", example: 0.5 },
                                        isFree: { type: "boolean", example: false },
                                    },
                                },
                            },
                        },
                    },
                },
                401: { description: "Unauthorized access" },
                500: { description: "Internal server error" },
            },
        },
    },
    "/api-modules/{id}": { // ✅ Corrected the path
        get: {
            summary: "Get API module by ID",
            description: "Retrieve details of a specific API module.",
            tags: ["API Modules"],
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string", format: "uuid" },
                    example: "550e8400-e29b-41d4-a716-446655440000",
                },
            ],
            responses: {
                200: {
                    description: "API module details",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    id: { type: "string", format: "uuid", example: "550e8400-e29b-41d4-a716-446655440000" },
                                    name: { type: "string", example: "Weather API" },
                                    description: { type: "string", example: "Fetch weather data" },
                                    pricePerRequest: { type: "number", example: 0.5 },
                                    isFree: { type: "boolean", example: false },
                                },
                            },
                        },
                    },
                },
                404: { description: "API module not found" },
                500: { description: "Internal server error" },
            },
        },
        patch: {
            summary: "Update API module",
            description: "Allows an admin to update an API module's details.",
            tags: ["API Modules"],
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string", format: "uuid" },
                    example: "550e8400-e29b-41d4-a716-446655440000",
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                name: { type: "string", example: "Updated Weather API" },
                                description: { type: "string", example: "Updated weather data fetcher" },
                                pricePerRequest: { type: "number", example: 0.3 },
                                isFree: { type: "boolean", example: true },
                            },
                        },
                    },
                },
            },
            responses: {
                200: { description: "API module updated successfully" },
                400: { description: "Validation error" },
                401: { description: "Unauthorized access" },
                404: { description: "API module not found" },
                500: { description: "Internal server error" },
            },
        },
        delete: {
            summary: "Delete API module",
            description: "Allows an admin to delete an API module.",
            tags: ["API Modules"],
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string", format: "uuid" },
                    example: "550e8400-e29b-41d4-a716-446655440000",
                },
            ],
            responses: {
                200: { description: "API module deleted successfully" },
                401: { description: "Unauthorized access" },
                404: { description: "API module not found" },
                500: { description: "Internal server error" },
            },
        },
    },
};
