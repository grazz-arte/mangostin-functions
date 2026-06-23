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
// Exportação correta para o Azure Flex Consumption indexar a rota
module.exports = app;