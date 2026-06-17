const { app } = require("@azure/functions");

app.http("notify", {
    methods: ["GET"],
    authLevel: "anonymous",

    handler: async (request, context) => {

        return {
            jsonBody: {
                status: "ok",
                message: "Mangostin funcionando ❤️"
            }
        };

    }
});