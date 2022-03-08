const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'bolu.bluesprint@gmail.com',
        pass: '18/52ha017',
    }
    
})

module.exports = transporter