import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(
    {
        service : "gmail",
        auth : {
            user : "luminaryreaders@gmail.com",
            pass : "ntmt afbi delo vvgs"
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