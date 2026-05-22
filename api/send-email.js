const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { time, timezone } = req.body || {};
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'santhoshrajk1812@gmail.com',
        pass: process.env.EMAIL_PASS || 'rzulyattupahrskx'
      }
    });

    const mailOptions = {
      from: `"Nilagravity Notification" <${process.env.EMAIL_USER || 'santhoshrajk1812@gmail.com'}>`,
      to: 'santhoshrajk1812@gmail.com',
      subject: 'Nilagravity Passkey Entered Alert',
      text: `Hello,\n\nThe passkey was successfully entered on Nilagravity.\n\nTime entered: ${time || new Date().toISOString()}\nTimezone: ${timezone || 'Unknown'}\n\nBest regards,\nNilagravity System`,
      html: `<p>Hello,</p><p>The passkey was successfully entered on Nilagravity.</p><p><strong>Time entered:</strong> ${time || new Date().toISOString()}</p><p><strong>Timezone:</strong> ${timezone || 'Unknown'}</p><br><p>Best regards,<br>Nilagravity System</p>`
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
