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
    schedule: "0 0 * * * *",

    handler: async () => {

    const hoje = new Date();

    const hora = hoje.getUTCHours();
console.log("UTC:", hoje.toISOString());
console.log("Hora UTC:", hora);
    
    let title = "🌙 Mangostin";
    let body = "passando para lembrar que eu te amo ❤️";

const mensagens = [
    "Hoje é mais um dia especial para nós ❤️",
    "Você é meu pensamento favorito ❤️",
    "Só passando para lembrar que eu te amo ❤️",
    "Espero que esteja sorrindo agora ❤️",
    "Você torna meus dias melhores ❤️",
    "Pensando em você 🥰",
    "Mais um momento para lembrar o quanto você é especial ⭐"
];

body = mensagens[Math.floor(Math.random() * mensagens.length)];


// HORÁRIOS PROGRAMADOS 
// 09h Brasil
if (hora === 12) {
    title = "☀️ BLESSED DAY ";
    body = "Que seu dia seja tão lindo quanto seu sorriso ⭐";
}

// 14h Brasil
if (hora === 17) {
    title = "🥭 Mangostin";
    body = "minha deusa, minha princesa, amor da minha vida ⭐";
}

// 19h Brasil
if (hora === 23) {
    title = "🌙 BLESSED NIGHT";
    body =  "HOJE TEM, HOJE TEM, HOJE TEM 😜 🌑🌒🌓🌔🌕🌖🌗🌘🌑";

}

// 00h Brasil
if (hora === 3) {
    title = "💫 PRAISE BE";
    body = "Mais um dia ao seu lado valeu a pena ⭐";
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

    const snapshot = await admin
            .firestore()
            .collection("devices")
            .get();

console.log("Título:", title);
console.log("Mensagem:", body);
console.log("Dispositivos:", snapshot.docs.length);

        for (const doc of snapshot.docs) {

            const token = doc.data().token;

            try {

                await admin.messaging().send({
                    token,

                    notification: {
                        title,
                        body
                    },

                    webpush: {
    notification: {
        icon: "https://grazz-arte.github.io/mangostin/icon-192.png",
        badge: "https://grazz-arte.github.io/mangostin/icon-192.png"
    }
}
                });

                console.log(`Enviado para: ${token}`);

            } catch (err) {

                console.error(`Erro ao enviar para ${token}`, err);

            }
        }
    }
});

module.exports = app;