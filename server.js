const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies (needed for post requests)
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// Send index.html by default
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to send passkey entry email notification
app.post('/api/send-email', async (req, res) => {
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
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
