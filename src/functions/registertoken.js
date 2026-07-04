const { app } = require("@azure/functions");

app.http("registertoken", {
    methods: ["POST"],
    authLevel: "anonymous",

    handler: async (request, context) => {

        try {

            const body = await request.json();

            if (!body.token) {
                return {
                    status: 400,
                    jsonBody: {
                        success: false,
                        error: "Token não informado."
                    }
                };
            }

            context.log("Novo token recebido:");
            context.log(body.token);

            return {
                status: 200,
                jsonBody: {
                    success: true,
                    message: "Token recebido com sucesso."
                }
            };

        } catch (err) {

            context.error(err);

            return {
                status: 500,
                jsonBody: {
                    success: false,
                    error: err.message
                }
            };

        }

    }

});

module.exports = app;