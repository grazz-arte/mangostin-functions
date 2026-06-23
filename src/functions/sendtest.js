// src/functions/sendtest.js
const { app } = require('@azure/functions');
const admin = require('firebase-admin');

// Inicializa o Firebase apenas uma vez usando os valores diretos para evitar erros de JSON.parse
if (admin.apps.length === 0) {
    const projectId = "mangostin-notifications";
    const clientEmail = "firebase-adminsdk-fcm@mangostin-notifications.iam.gserviceaccount.com";
    const privateKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY || "ML628GmPmm-b-zNFMvbjTDeWPF5wnKphX8HEgVE4elA"; 

    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: projectId,
            clientEmail: clientEmail,
            privateKey: privateKey
        })
    });
}

app.http('sendtest', {
    methods: ['POST', 'GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('Processando requisição de teste de notificação...');

        const tokenCelular = "dNoVk9ECdCxTV2l2_boKFA:APA91bEI2z2dVQ-_52rTtpYNH7c-Vn89n5WI--IleGUssfQ6G9a1Tr4FtcmolPCcSVNatqYlUWVzscXqloPhsgeKR8VX9pK0bx6lq9Y35eHm7_45dAsEUk";

        const messagePayload = {
            notification: {
                title: '🥭 Mangostin App',
                body: 'Se você recebeu isso, nosso fluxo ponta a ponta funcionou!'
            },
            webpush: {
                notification: {
                    icon: 'https://raw.githubusercontent.com/grazz-arte/mangostin/main/icon-192.png',
                    badge: 'https://raw.githubusercontent.com/grazz-arte/mangostin/main/icon-192.png'
                }
            },
            token: tokenCelular
        };

        try {
            const response = await admin.messaging().send(messagePayload);
            context.log('Notificação disparada com sucesso:', response);

            return {
                status: 200,
                jsonBody: {
                    status: "success",
                    message: "Notificação enviada com sucesso!",
                    firebaseResponse: response
                }
            };
        } catch (error) {
            context.log('Erro ao enviar via Firebase:', error);

            return {
                status: 500,
                jsonBody: {
                    status: "error",
                    message: "Falha ao disparar push",
                    details: error.message
                }
            };
        }
    }
});

// Exportação correta para o Azure Flex Consumption indexar a rota
module.exports = app;
