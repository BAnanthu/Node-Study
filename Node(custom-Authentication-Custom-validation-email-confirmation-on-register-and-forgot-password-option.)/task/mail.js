"use strict";
const nodemailer = require("nodemailer");
var ejs = require("ejs");
var path = require('path');
var MailSetup;


// async..await is not allowed in global scope, must use a wrapper
const sentAMail =async (email,username,token,id) => { 
  // const { username, email } = request
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
 
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'ananthu3454@gmail.com', // generated ethereal user
        pass: 'Ananthu@123', // generated ethereal password
      },
    });
    
    ejs.renderFile(__dirname + '/template/mail.ejs', { name: username, token:token, id:id }, function (err, data) {
         MailSetup = {
          from: '"ananthu3454@gmail.com" <ananthu3454@gmail.com>', // sender address
          to: `${email},  ${email}`, // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: data, // html body
        };
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail(MailSetup);
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  sentAMail().catch(console.error);


module.exports = sentAMail;