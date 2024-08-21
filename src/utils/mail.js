const nodemailer = require("nodemailer")
const twilio = require("twilio")
require("dotenv").config()

const accoundSid = process.env.TWILIO_ACCOUND_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = new twilio(accoundSid,authToken)


const sendMail = async (email,subject,message) =>{
    const transporter = await nodemailer.createTransport({
        service:process.env.NODEMAIL_SERVICE,
        auth:{
            user:process.env.NODEMAIL_USER,
            pass:process.env.NODEMAIL_PASS
        }
    })

    const info = await transporter.sendMail({
        from:`"Austech" <${process.env.NODEMAIL_USER}>`,
        to:email,
        subject:subject,
        html:message
    })
    console.log(info)
}

const sendSMS = async (message,clientNo) => {
    let msgOptions = {
        from:process.env.TWILIO_PHONE_NO,
        to:clientNo,
        body:message
    } 
    try {
        const msg = await client.messages.create(msgOptions)
        console.log(msg)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    sendMail,
    sendSMS
}