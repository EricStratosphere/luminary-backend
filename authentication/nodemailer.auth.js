import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(
    {
        service : "gmail",
        auth : {
            user : "luminaryknowledgehub@gmail.com",
            pass : "kqdf twyb rxbn satz"
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