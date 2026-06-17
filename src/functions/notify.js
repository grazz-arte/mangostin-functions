// Arquivo notify.js
const { app } = require('@azure/functions');

app.http('notify', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

        return {
            status: 200,
            jsonBody: {
                title: "Mangostin ❤️",
                message: "Mais um dia amando você."
            }
        };

    }
});
