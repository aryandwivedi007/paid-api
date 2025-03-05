export const paymentDocs = {
    "/payment": {
        post: {
            summary: "Add balance to user wallet",
            description: "Allows a user to add money to their wallet (dummy payment).",
            tags: ["Payments"],
            security: [{ BearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                amount: { type: "number", example: 100 },
                            },
                            required: ["amount"],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Balance added successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "Balance added successfully" },
                                    newBalance: { type: "number", example: 500 },
                                },
                            },
                        },
                    },
                },
                400: { description: "Validation error: Amount must be greater than zero" },
                401: { description: "Unauthorized access" },
                500: { description: "Internal server error" },
            },
        },
    },
};
