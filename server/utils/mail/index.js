
const mailer = require('nodemailer');
const { welcome } = require("./welcome_template");
const { resetPass } = require("./resetpass_template");
const config = require('../../config/dev');

const getEmailData = (to, name, token, template, actionData) => {
    let data = null;

    switch (template) {
        case "welcome":
            data = {
                from: "UC VOC <jaewonhimnae@gmail.com>",
                to,
                subject: `Welcome to UC VOC website, ${name}`,
                html: welcome()
            }
            break;
        case "reset_password":
            data = {
                from: "UC VOC <jaewonhimnae@gmail.com>",
                to,
                subject: `안녕 하세요. ${name}씨, 비밀 번호를 변경해주세요.`,
                html: resetPass(actionData)
            }
            break;
        default:
            data;
    }
    return data;
}

const sendEmail = (to, name, token, type, actionData = null) => {

    const smtpTransport = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: "jaewonhimnae@gmail.com",
            pass: config.emailPassWord 
        }
    });

    const mail = getEmailData(to, name, token, type, actionData)

    smtpTransport.sendMail(mail, function (error, response) {
        if (error) {
            console.log(error)
        } else {
            console.log('Email Sent Successfully !!!');
        }
        smtpTransport.close();
    })
}

module.exports = { sendEmail }