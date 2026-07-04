const { app } = require("@azure/functions");

app.http("notify", {
    methods: ["GET"],
    authLevel: "anonymous",

    handler: async (request, context) => {

        context.log("Notify executada com sucesso.");

        return {
            status: 200,
            jsonBody: {
                status: "ok",
                service: "Mangostin Functions",
                function: "notify",
                message: "Mangostin funcionando ❤️"
            }
        };

    }
});

module.exports = app;