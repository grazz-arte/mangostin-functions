// src/functions/sendtest.js
const { app } = require('@azure/functions');
const admin = require('firebase-admin');

// Inicializa o Firebase apenas uma vez usando a variável de ambiente da Azure
if (admin.apps.length === 0) {
    const serviceAccountRaw = process.env.FIREBASE_SERVICE_ACCOUNT;
    
    if (!serviceAccountRaw) {
        throw new Error("A variável de ambiente FIREBASE_SERVICE_ACCOUNT não está configurada.");
    }
    
    const serviceAccount = JSON.parse(serviceAccountRaw);
    
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

app.http('sendtest', {
    methods: ['POST', 'GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('Processando requisição de teste de notificação...');

        // ⚠️ PEGAR O TOKEN DO PASSO ANTERIOR:
        // Substitua essa string pelo Token real que você gerou na tela do seu celular!
        const tokenCelular = "COLE_AQUI_O_TOKEN_QUE_VOCE_GEROU_NO_CELULAR";

        const messagePayload = {
            notification: {
                title: '🥭 Mangostin App',
                body: 'Se você recebeu isso, nosso fluxo ponta a ponta funcionou!'
            },
            // Configurações específicas para garantir que desperte no celular/PWA
            webpush: {
                notification: {
                    icon: 'https://raw.githubusercontent.com/SEU_USUARIO/mangostin/main/icon-192.png', // Ajuste com a URL do seu ícone se quiser
                    badge: 'https://raw.githubusercontent.com/SEU_USUARIO/mangostin/main/icon-192.png'
                }
            },
            token: tokenCelular
        };

        try {
            // Dispara via Firebase Cloud Messaging (FCM)
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
