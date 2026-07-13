import { transporter } from "../lib/mail.js";

export const sendContactEmail = async (req, res) => {
	try {
		const {
			name,
			email,
			subject,
			message,
		} = req.body;

		if (!name || !email || !subject || !message) {
			return res.status(400).json({
				success: false,
				message: "Please fill all fields.",
			});
		}

		await transporter.sendMail({
			from: process.env.EMAIL_USER,

			to: process.env.EMAIL_USER,

			replyTo: email,

			subject: `Lovlit Contact - ${subject}`,

			html: `
				<h2>New Contact Message</h2>

				<p><strong>Name:</strong> ${name}</p>

				<p><strong>Email:</strong> ${email}</p>

				<p><strong>Subject:</strong> ${subject}</p>

				<p><strong>Message:</strong></p>

				<p>${message}</p>
			`,
		});

		res.status(200).json({
			success: true,
			message: "Message sent successfully.",
		});
	} catch (error) {

		console.log(error);

		res.status(500).json({
			success: false,
			message: "Failed to send email.",
		});
	}
};
