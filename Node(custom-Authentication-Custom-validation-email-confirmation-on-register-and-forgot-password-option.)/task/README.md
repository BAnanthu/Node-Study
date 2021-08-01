https://medium.com/swlh/how-to-build-a-node-js-authentication-api-with-email-verification-image-upload-and-password-reset-95e35fd46be1

https://safwan-du16.medium.com/email-verification-with-node-js-and-nodemailer-3a6363b31060

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR(30),
  email VARCHAR(30),
  password VARCHAR(30),
  is_verified BOOL,
  token VARCHAR(50),
);


https://nodemailer.com/about/

https://bbbootstrap.com/snippets/confirm-account-email-template-17848137#