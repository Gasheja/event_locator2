const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'm.gasheja@alustudent.com', 
    pass: '1234'     
  }
});

module.exports = transporter;