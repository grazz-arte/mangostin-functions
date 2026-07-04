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

app.http("sendtest", {
    methods: ["GET"],
    authLevel: "anonymous",

    handler: async (request, context) => {

        try {

            const response = await admin.messaging().send({

                token: process.env.FCM_DEVICE_TOKEN,

                notification: {
                    title: "🥭 Mangostin",
                    body: "Se você recebeu esta mensagem, Azure + Firebase estão funcionando! ❤️"
                },

                webpush: {
                    notification: {
                        icon: "https://raw.githubusercontent.com/grazz-arte/mangostin/main/icon-192.png",
                        badge: "https://raw.githubusercontent.com/grazz-arte/mangostin/main/icon-192.png"
                    }
                }

            });

            context.log(response);

            return {
                status: 200,
                jsonBody: {
                    success: true,
                    response
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