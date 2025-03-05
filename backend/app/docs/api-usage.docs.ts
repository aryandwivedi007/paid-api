export const apiUsageDocs = {
    "/api-usage/{apiModuleId}": { // ✅ Ensure this matches the route
        post: {
            summary: "Consume an API module",
            description: "Allows a user to request an API module, deducts balance if required, and fetches external data.",
            tags: ["API Requests"],
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: "apiModuleId", // ✅ Correct parameter name
                    in: "path",
                    required: true,
                    schema: { type: "string", format: "uuid" },
                    description: "The ID of the API module to request.",
                    example: "550e8400-e29b-41d4-a716-446655440000"
                }
            ],
            responses: {
                200: {
                    description: "API request successful",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "API request successful" },
                                    cost: { type: "number", example: 0.5 },
                                    data: {
                                        type: "object",
                                        description: "Response from the external API",
                                        example: {
                                            weather: "Clear",
                                            temperature: "25°C",
                                            location: "London"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                400: { description: "Invalid API request or validation error" },
                403: { description: "Insufficient balance, please recharge" },
                404: { description: "API module not found" },
                500: { description: "Internal server error" }
            }
        }
    },
    "/api-usage/analytics": { // ✅ New analytics endpoint
        get: {
            summary: "Get API usage analytics",
            description: "Provides analytics on API requests, total revenue, and most-used APIs.",
            tags: ["API Analytics"],
            security: [{ BearerAuth: [] }],
            responses: {
                200: {
                    description: "API analytics retrieved successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    totalRevenue: { type: "number", example: 150.75 },
                                    mostUsedApis: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                name: { type: "string", example: "Weather API" },
                                                requestCount: { type: "number", example: 120 },
                                            },
                                        },
                                    },
                                    userStats: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                name: { type: "string", example: "John Doe" },
                                                email: { type: "string", example: "john@example.com" },
                                                apiRequests: { type: "number", example: 50 },
                                                totalSpent: { type: "number", example: 10.5 },
                                            },
                                        },
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
    }
};
