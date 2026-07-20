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

app.http("registertoken", {
    methods: ["POST"],
    authLevel: "anonymous",

    handler: async (request, context) => {

        try {

            const body = await request.json();

            if (!body.token) {
                return {
                    status: 400,
                    jsonBody: {
                        success: false,
                        error: "Token não informado."
                    }
                };
            }

 await admin.firestore()
.collection("devices")
.doc(body.token)
.set({
    token: body.token,
    userAgent: body.userAgent,
    createdAt: new Date().toISOString()
});
context.log("Token salvo:");
context.log(body.token);

            return {
                status: 200,
                jsonBody: {
                    success: true,
                    message: "Token recebido com sucesso."
                }
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