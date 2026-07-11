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
    schedule: "0 * * * * *",

    handler: async () => {

    const hoje = new Date();

const brasil = new Date(
    hoje.toLocaleString("en-US", {
        timeZone: "America/Sao_Paulo"
    })
);

const hora = brasil.getHours();
const minuto = brasil.getMinutes();

console.log("Brasil:", brasil);
console.log("Hora Brasil:", hora);
console.log("Minuto Brasil:", minuto);

    let title = "🌙 Mangostin";
  
    let body = "passando para lembrar que eu te amo π⭐";

const mensagens = [
    "Hoje é mais um dia especial para mim, pois tenho você comigo π⭐",
    "Você é meu pensamento favorito, minha cor favorita , meu som, meu céu, minha vida π⭐",
    "Só passando para lembrar que eu te amo, mais que ontem, cada dia mais π⭐",
    "Espero que esteja sorrindo agora, preciso da energia do seu sorriso para sorrir também π⭐",
    "Você torna meus dias melhores, você é mó legal, minha parceira π⭐",
    "Sou completamente apaixonada por você minha Deusa do amor π⭐",
    "Mais um momento para lembrar o quanto você é especial π ⭐",
"Nunca foi balela o meu sentimento por você π ⭐" 
];

body = mensagens[Math.floor(Math.random() * mensagens.length)];

body += ` ✨${Date.now().toString().slice(-4)}`;

let enviar = false;

// ALEATÓRIAS
if ([3, 13, 23, 33].includes(minuto)) {
    enviar = true;
}

// 09:00
if (hora === 9 && minuto === 0) {
    enviar = true;

    title = "☀️ BLESSED DAY";
    body = "Que seu dia seja tão lindo quanto seu sorriso ⭐";
}

// 14:00
if (hora === 14 && minuto === 0) {
    enviar = true;

    title = "🥭 Mangostin";
    body = "minha deusa, minha princesa, amor da minha vida ⭐";
}

// 19:00
if (hora === 19 && minuto === 0) {
    enviar = true;

    title = "🌙 BLESSED NIGHT";
    body = "HOJE TEM, HOJE TEM, HOJE TEM 😜 🌑🌒🌓🌔🌕🌖🌗🌘🌑";
}

// 00:00
if (hora === 0 && minuto === 0) {
    enviar = true;

    title = "💫 PRAISE BE";
    body = "Mais um dia ao seu lado valeu a pena ⭐";
}

// Não envia nada fora dos horários definidos
if (!enviar) {
    console.log("Nenhuma notificação programada para este minuto.");
    return;
}
    // Dia 7
    if (brasil.getDate() === 7) {
        title = "❤️ Feliz Mêsversário!";
        body = "Mais um mês construindo nossa história.";
    }

    // Dia dos Namorados
    if (brasil.getDate() === 12 && hoje.getMonth() === 5) {
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

                const response = await admin.messaging().send({
    token,

    webpush: {
        headers: {
            Urgency: "high"
        },

        notification: {
            title,
            body,
            icon: "https://grazz-arte.github.io/mangostin/icon-192.png",
            badge: "https://grazz-arte.github.io/mangostin/icon-192.png",
            tag: Date.now().toString(),
            requireInteraction: true
        }
    }
});

console.log("Firebase Message ID:", response);
                console.log(`Enviado para: ${token}`);

            } catch (err) {

                console.error(`Erro ao enviar para ${token}`, err);

            }
        }
    }
});

module.exports = app;