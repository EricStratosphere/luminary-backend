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

const mailOptions = {
    from : "luminary"
}