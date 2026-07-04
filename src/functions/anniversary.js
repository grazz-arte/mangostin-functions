const { app } = require("@azure/functions");
const admin = require("firebase-admin");

// Inicializa o Firebase apenas uma vez
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
        })
    });
}

app.http("anniversary", {
    methods: ["GET"],
    authLevel: "anonymous",

    handler: async (request, context) => {

        const hoje = new Date();

        let titulo = "🥭 Mangostin";
        let mensagem = "Hoje é mais um dia especial para nós ❤️";

        // Dia 7 de cada mês
        if (hoje.getDate() === 7) {
            titulo = "❤️ Feliz Mêsversário!";
            mensagem = "Mais um mês vivendo essa linda história de amor.";
        }

        // Dia dos Namorados (Brasil)
        if (hoje.getDate() === 12 && hoje.getMonth() === 5) {
            titulo = "🌹 Feliz Dia dos Namorados";
            mensagem = "Você é o amor da minha vida. ❤️";
        }

        try {

            const response = await admin.messaging().send({

                token: process.env.FCM_DEVICE_TOKEN,

                notification: {
                    title: titulo,
                    body: mensagem
                },

                webpush: {
                    notification: {
                        icon: "https://raw.githubusercontent.com/grazz-arte/mangostin/main/icon-192.png",
                        badge: "https://raw.githubusercontent.com/grazz-arte/mangostin/main/icon-192.png"
                    }
                }

            });

            return {
                status: 200,
                jsonBody: {
                    success: true,
                    firebaseResponse: response
                }
            };

        } catch (err) {

            context.log(err);

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