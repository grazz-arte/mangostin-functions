console.log("ANNIVERSARY FILE EXECUTED");
const { app } = require("@azure/functions");

app.http("anniversary", {
    methods: ["GET"],
    authLevel: "anonymous",

    handler: async (request, context) => {

        const namoroInicio = new Date("2026-03-07");
        const hoje = new Date();

        let meses =
            (hoje.getFullYear() - namoroInicio.getFullYear()) * 12 +
            (hoje.getMonth() - namoroInicio.getMonth());

        const aniversario =
            hoje.getDate() === namoroInicio.getDate();

        return {
            jsonBody: {
                anniversary: aniversario,
                months: meses,
                message: aniversario
                    ? `Hoje completamos ${meses} meses de namoro ❤️`
                    : "Hoje não é aniversário mensal."
            }
        };
    }
});