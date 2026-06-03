import { createRequire } from 'module';
import { GMAIL_ACCOUNT, GMAIL_APP_PASSWORD } from '../config/env.js';
//console.log(GMAIL_ACCOUNT, GMAIL_APP_PASSWORD);
const require = createRequire(import.meta.url);
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(
    {
        service : "gmail",
        auth : {
            user : GMAIL_ACCOUNT,
            pass : GMAIL_APP_PASSWORD
        }
    }
);


const getMailOptions = (target, subjectContent, textContent) => {

    return {
        from : "luminaryreaders@gmail.com",
        to : target,
        subject : subjectContent,
        html : textContent
    }
}

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
}

export {transporter, getMailOptions, generateOTP};