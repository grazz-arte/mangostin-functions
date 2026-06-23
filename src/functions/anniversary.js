// src/functions/anniversary.js
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

app.http('anniversary', {
    methods: ['POST', 'GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('Processando verificação de aniversário/notificação diária...');

        // Token do seu celular atualizado (o mesmo usado no sendtest)
        const tokenCelular = "dNoVk9ECdCxTV2l2_boKFA:APA91bEI2z2dVQ-_52rTtpYNH7c-Vn89n5WI--IleGUssfQ6G9a1Tr4FtcmolPCcSVNatqYlUWVzscXqloPhsgeKR8VX9pK0bx6lq9Y35eHm7_45dAsEUk";

        // Configuração da mensagem de aniversário
        const messagePayload = {
            notification: {
                title: '🎉 Parabéns! 🥭',
                body: 'Hoje o Mangostin App comemora mais uma data especial com você!'
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
            context.log('Notificação de aniversário disparada com sucesso:', response);

            return {
                status: 200,
                jsonBody: {
                    status: "success",
                    message: "Notificação de aniversário enviada!",
                    firebaseResponse: response
                }
            };
        } catch (error) {
            context.log('Erro ao enviar notificação de aniversário:', error);

            return {
                status: 500,
                jsonBody: {
                    status: "error",
                    message: "Falha ao disparar push de aniversário",
                    details: error.message
                }
            };
        }
    }
});

// Exportação obrigatória para o Azure Flex Consumption mapear a rota /api/anniversary
module.exports = app;
