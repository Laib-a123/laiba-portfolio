
const db = require("../db/db");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
const sendMessage = (req, res) => {

    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Please fill all required fields."
        });
    }

    const sql = `
        INSERT INTO contact_messages
        (name,email,subject,message)
        VALUES(?,?,?,?)
    `;

    db.query(sql, [name, email, subject, message], async (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        try {

            await transporter.sendMail({

                from: process.env.EMAIL_USER,

                to: process.env.EMAIL_USER,

                subject: `New Portfolio Message: ${subject}`,

                html: `
                    <h2>New Contact Form Submission</h2>

                    <p><strong>Name:</strong> ${name}</p>

                    <p><strong>Email:</strong> ${email}</p>

                    <p><strong>Subject:</strong> ${subject}</p>

                    <p><strong>Message:</strong></p>

                    <p>${message}</p>
                `
            });

            return res.status(201).json({
                success: true,
                message: "Message saved and email sent successfully."
            });

        } catch (emailError) {

            console.log(emailError);

            return res.status(500).json({
                success: false,
                message: "Message saved but email could not be sent."
            });

        }

    });

};
module.exports = {
    sendMessage
};