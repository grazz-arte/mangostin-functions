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

app.timer("mangostinScheduler", {
    schedule: "0 0 11 * * *",

    handler: async () => {

        const hoje = new Date();

        let title = "🥭 Mangostin";
        let body = "Hoje é mais um dia especial para nós ❤️";

        // Dia 7
        if (hoje.getDate() === 7) {
            title = "❤️ Feliz Mêsversário!";
            body = "Mais um mês construindo nossa história.";
        }

        // Dia dos Namorados
        if (hoje.getDate() === 12 && hoje.getMonth() === 5) {
            title = "🌹 Feliz Dia dos Namorados";
            body = "Você é o amor da minha vida ❤️";
        }

        await admin.messaging().send({
            token: process.env.FCM_DEVICE_TOKEN,

            notification: {
                title,
                body
            },

            webpush: {
                notification: {
                    icon: "https://grazz-arte.github.io/mangostin/icon-192.png"
                }
            }
        });
    }
});