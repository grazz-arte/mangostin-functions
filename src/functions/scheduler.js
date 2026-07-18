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
console.log("=== VERSAO 17-07-2026 TESTE ===");

    const agoraBrasil = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "numeric",
    minute: "numeric",
    hour12: false
}).formatToParts(new Date());

const hora = Number(
    agoraBrasil.find(x => x.type === "hour").value
);

const minuto = Number(
    agoraBrasil.find(x => x.type === "minute").value
);

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
"Nunca foi balela o meu sentimento por você π ⭐",
"Te amo, meu amor, e a cada dia que passa, meu carinho por você só cresce mais e mais. ⭐",
"Você é a razão do meu sorriso, e não há palavras suficientes para expressar o quanto te amo.⭐",
"Meu amor por você é como o céu, infinito e sempre ali iluminando meus dias e noites.⭐",
"Te amar é a melhor parte da minha vida, e sou eternamente grata por ter você ao meu lado.⭐",
"Você é o meu lar, e a cada abraço seu, sinto que tudo fica mais completo e perfeito.⭐",
"Te amo não apenas pelo que você é, mas pelo que eu sou quando estou com você.⭐",
"A cada dia que passa, descubro novas razões para te amar ainda mais. Você é minha Deusa.⭐",
"Seu amor me inspira a ser uma pessoa melhor e a acreditar que tudo é possível.⭐",
"Te amo com todo o meu coração, e não há nada que eu não faria para te ver feliz.⭐",
"Você é o sonho que se tornou realidade, e a cada momento ao seu lado meu amor se fortalece.⭐",
"Te amar é como respirar; é algo natural e essencial para a minha felicidade.⭐",
"Meu amor, você é a luz da minha vida, e sou grata por cada dia ao seu lado.⭐",
"Te amo com uma intensidade que palavras não conseguem descrever; você é meu amor verdadeiro.⭐",
"Você é a melhor parte de mim, e cada instante que passamos juntas é um presente que valorizo.⭐",
"Te amar é uma série maravilhosa, e estou louca para viver cada capítulo ao seu lado.⭐",
"Você é o meu sol em dias nublados e a razão pela qual meu coração canta de alegria.⭐",
"Te amo mais do que as palavras podem expressar, e sempre encontrarei maneiras de te demonstrar isso.⭐",
"Seu amor é um bálsamo para minha alma e sou eternamente grata por tê-la na minha vida.⭐",
"Você é a melodia que embala meu coração e te amar é a minha maior felicidade.⭐",
"Amo cada pequeno detalhe seu, desde seu sorriso até a forma como você me faz sentir amada.⭐"
];

body = mensagens[Math.floor(Math.random() * mensagens.length)];


let enviar = false;

// ALEATÓRIAS
if ([3, 13, 23, 33, 43, 53].includes(minuto)) {
    enviar = true;
}
console.log("HORA:", hora);
console.log("MINUTO:", minuto);
// 09:00
if (hora === 13 && minuto === 20) {
    enviar = true;

    title = "☀️ BLESSED DAY";
    body = "Que seu dia seja tão lindo quanto seu sorriso ⭐";
console.log("DISPARO: BLESSED DAY");
}

// 14:00
if (hora === 14 && minuto === 0) {
    enviar = true;

    title = "🥭 Mangostin";
    body = "minha deusa, minha princesa, amor da minha vida ⭐";
console.log("DISPARO: Mangostin");
}

// 23:00
if (hora === 23 && minuto === 0) {
    enviar = true;

    title = "🌙 BLESSED NIGHT";
    body = "HOJE TEM, HOJE TEM, HOJE TEM 😜 🌑🌒🌓🌔🌕🌖🌗🌘🌑";
console.log("DISPARO: BLESSED NIGHT");
}

// 00:00
if (hora === 0 && minuto === 0) {
    enviar = true;

    title = "💫 PRAISE BE";
    body = "Mais um dia ao seu lado valeu a pena ⭐";
console.log("DISPARO: 💫 PRAISE BE");
}

if (hora === 22 && minuto === 10) {
    enviar = true;

    title = "Cada dia mais";
    body = "Meu amor é a maior verdade que possuo, amo você mais a cada dia que passa 🥰";
}

if (hora === 3 && minuto === 40) {
    enviar = true;
    title = "TESTE HORÁRIO 3h40";
    body = "Validação de horário fixo";
}
// Não envia nada fora dos horários definidos
if (!enviar) {
    console.log("Nenhuma notificação programada para este minuto.");
    return;
}
    // Dia 7
    const hojeBrasil = new Date(
    new Date().toLocaleString("en-US", {
        timeZone: "America/Sao_Paulo"
    })
);

if (hojeBrasil.getDate() === 7) {
        title = "❤️ Feliz Mêsversário!";
        body = "Mais um mês construindo nossa história.";
    }

    // Dia dos Namorados
   if (
    hojeBrasil.getDate() === 12 &&
    hojeBrasil.getMonth() === 5
) {
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

    const code = err.errorInfo?.code;

    console.log("Código Firebase:", code);

}
        }
    }
});

module.exports = app;