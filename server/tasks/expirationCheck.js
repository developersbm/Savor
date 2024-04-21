const cron = require('node-cron');
const { db, messaging } = require('../app');

// Daily check for products expiring the next day
cron.schedule('0 0 * * *', async () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const productsExpiringTomorrow = await db.collection('products')
        .where('Expiration', '==', tomorrow.toISOString().split('T')[0])
        .get();

    if (!productsExpiringTomorrow.empty) {
        productsExpiringTomorrow.forEach(doc => {
            const userToken = doc.data().userToken;
            sendNotification(userToken, doc.data().Title);
        });
    }
});

function sendNotification(token, productName) {
    const message = {
        notification: {
            title: 'Product Expiring Soon!',
            body: `${productName} is expiring tomorrow!`
        },
        token: token,
    };

    messaging.send(message)
        .then((response) => {
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
}
