const { app } = require("@azure/functions");

app.http("anniversary", {
    methods: ["GET"],
    authLevel: "anonymous",
    handler: async (request, context) => {
        context.log("Executando a função anniversary...");

        [span_0](start_span)[span_1](start_span)const namoroInicio = new Date("2026-03-07");[span_0](end_span)[span_1](end_span)
        const hoje = new Date();

        let meses =
            (hoje.getFullYear() - namoroInicio.getFullYear()) * 12 +
            (hoje.getMonth() - namoroInicio.getMonth());

        const aniversario = hoje.getDate() === namoroInicio.getDate();

        // Correção v4: Usando jsonBody direto, sem JSON.stringify e sem headers manuais
        return {
            status: 200,
            jsonBody: {
                [span_2](start_span)anniversary: aniversario,[span_2](end_span)
                [span_3](start_span)months: meses,[span_3](end_span)
                message: aniversario
                    ? [span_4](start_span)`Hoje completamos ${meses} meses de namoro ❤️`[span_4](end_span)
                    [span_5](start_span): "Hoje não é aniversário mensal."[span_5](end_span)
            }
        };
    }
});
