const { app } = require("@azure/functions");
const admin = require("firebase-admin");

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

            const snapshot = await admin
                .firestore()
                .collection("devices")
                .get();

            const resultados = [];

            for (const doc of snapshot.docs) {

                const token = doc.data().token;

                try {

                    const response = await admin.messaging().send({

                        token,

                        notification: {
                            title: "🥭 Mangostin",
                            body: "Teste enviado pelo Firestore ❤️"
                        },

                        webpush: {
                            notification: {
                                icon: "https://grazz-arte.github.io/mangostin/icon-192.png",
                                badge: "https://grazz-arte.github.io/mangostin/icon-192.png"
                            }
                        }

                    });

                    context.log(`OK: ${token}`);
                    resultados.push({
                        token,
                        success: true,
                        response
                    });

                } catch (err) {

                    context.error(`ERRO: ${token}`, err);

                    resultados.push({
                        token,
                        success: false,
                        error: err.message
                    });

                    const code = err.errorInfo?.code;

                    if (
                        code === "messaging/registration-token-not-registered" ||
                        code === "messaging/invalid-registration-token"
                    ) {

                        await admin
                            .firestore()
                            .collection("devices")
                            .doc(doc.id)
                            .delete();

                        context.log(`Token removido: ${doc.id}`);
                    }
                }
            }

            return {
                status: 200,
                jsonBody: resultados
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