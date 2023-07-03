const config = {
    mongoDb: {
        host: process.env.MONGO_URL
    },
    mailTrap: {
        user: process.env.MAILTRAP_USER,
        password: process.env.MAILTRAP_PASSWORD,
        email: process.env.MAILTRAP_EMAIL,
    },
    port: process.env.BACKEND_PORT,
    jwtSecret: process.env.JWT_SECRET,
    twilio: {
        twilio_account_SID: process.env.TWILIO_ACCOUNT_SID,
        twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
        twilio_phone_number: process.env.TWILIO_PHONE_NUMBER
    }
};

module.exports = config