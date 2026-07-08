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

// 09h Brasil
if (hora === 12) {
    title = "☀️ Bom dia, meu amor";
    body = "Que seu dia seja tão lindo quanto seu sorriso ❤️";
}

// 14h Brasil
if (hora === 17) {
    title = "🥭 Mangostin";
    body = "Passando para lembrar que eu te amo ❤️";
}

// 19h Brasil
if (hora === 22) {
    title = "🌙 Boa noite";
    body = "Espero que seu dia tenha sido maravilhoso ❤️";
}

// 00h Brasil
if (hora === 3) {
    title = "💫 Antes de dormir...";
    body = "Mais um dia ao seu lado valeu a pena ❤️";
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