const nodemailer = require('nodemailer');

// Create transporter using App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App Password (16 characters)
  },
});

// Verify email server connection
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});


// Generic function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend Ledger System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log('✅ Message sent:', info.messageId);

  } catch (error) {
    console.error('❌ Error sending email:', error.message);
  }
};


// Registration email
async function sendRegistrationEmail(userEmail, name) {

  const subject = 'Welcome to Backend Ledger System 🎉';

  const text = `Hello ${name},

Welcome to Backend Ledger System!

Your account has been successfully created.

Best regards,
Backend Ledger Team`;

  const html = `
    <div style="font-family: Arial; padding: 20px;">
      <h2>Welcome, ${name}! 🎉</h2>
      <p>Your account has been successfully created in <strong>Backend Ledger System</strong>.</p>
      <p>You can now securely perform transactions.</p>
      <br>
      <p>Best regards,<br><strong>Backend Ledger Team</strong></p>
    </div>
  `;

  await sendEmail(userEmail, subject, text, html);
}


// Transaction success email
async function sendTransactionEmail(userEmail, name, amount, toAccount){

  const subject = 'Transaction Successful ✅';

  const text = `Hello ${name},

Your transaction of ₹${amount} to account ${toAccount} was successful.

Best regards,
Backend Ledger Team`;

  const html = `
    <div style="font-family: Arial; padding: 20px;">
      <h2>Transaction Successful ✅</h2>
      <p>Hello <strong>${name}</strong>,</p>
      <p>Your transaction of <strong>₹${amount}</strong> to account <strong>${toAccount}</strong> was successful.</p>
      <br>
      <p>Best regards,<br><strong>Backend Ledger Team</strong></p>
    </div>
  `;

  await sendEmail(userEmail, subject, text, html);
}


// Transaction failed email
async function sendTransactionFailedEmail(userEmail, name, amount, toAccount, reason) {

  const subject = 'Transaction Failed ❌';

  const text = `Hello ${name},

Your transaction of ₹${amount} to account ${toAccount} failed.

Reason: ${reason}

Best regards,
Backend Ledger Team`;

  const html = `
    <div style="font-family: Arial; padding: 20px;">
      <h2 style="color: red;">Transaction Failed ❌</h2>
      <p>Hello <strong>${name}</strong>,</p>
      <p>Your transaction of <strong>₹${amount}</strong> to account <strong>${toAccount}</strong> could not be processed.</p>
      <p><strong>Reason:</strong> ${reason}</p>
      <br>
      <p>Please check your balance or contact support.</p>
      <br>
      <p>Best regards,<br><strong>Backend Ledger Team</strong></p>
    </div>
  `;

  await sendEmail(userEmail, subject, text, html);
}


module.exports = {
  sendRegistrationEmail,
  sendTransactionEmail,
  sendTransactionFailedEmail
};