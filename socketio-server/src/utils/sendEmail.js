const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp-relay.sendinblue.com',
			port: 587,
			auth: {
				user: 'luutoan07@gmail.com',
				pass: 'xsmtpsib-47d0178047aca18be8ce19ff95eb6ebd312a61cbe4bb23b64387cb05ac17fa2f-CsK0wFzBR3LqJ4G5'
			}
		});

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};
