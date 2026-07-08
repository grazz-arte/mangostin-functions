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
    schedule: "0 */2 * * * *",

    handler: async () => {

    const hoje = new Date();

    const hora = hoje.getUTCHours();

    let title = "🥭 Mangostin";
    let body = "Hoje é mais um dia especial para nós ❤️";

    // 08h Brasil
    if (hora === 11) {
        title = "☀️ Bom dia meu amor";
        body = "Espero que seu dia seja lindo ❤️";
    }

    // 12h Brasil
    if (hora === 15) {
        title = "🍽️ Hora do almoço";
        body = "Não esqueça de se alimentar direitinho 😘";
    }

    // 18h Brasil
    if (hora === 21) {
        title = "🌆 Boa noite";
        body = "Como foi seu dia? ❤️";
    }

    // 22h Brasil
    if (hora === 1) {
        title = "🌙 Hora de descansar";
        body = "Durma bem meu amor ❤️";
    }

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
module.exports = app;