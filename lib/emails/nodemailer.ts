import * as nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import {
	adminNotification,
	contactEmail,
	customerNotification,
	forgotPasswordEmail,
	verificationEmail,
} from './templates';

export class Emailer {
	private readonly transporter: nodemailer.Transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: process.env.GMAIL_USER,
				pass: process.env.GMAIL_PASS,
			},
		});
	}

	public sendEmail(mailOptions: MailOptions) {
		return this.transporter.sendMail(mailOptions);
	}

	public async sendVerificationEmail(
		name: string,
		email: string,
		token: string
	) {
		try {
			await this.sendEmail(verificationEmail(name, email, token));

			return { success: true, error: null };
		} catch (error) {
			console.error('[VERIFICATION_EMAIL_MAILER_ERROR]', error);
			return { success: false, error };
		}
	}

	public async sendCustomerNotification(
		name: string,
		email: string,
		orderSummary: string
	) {
		try {
			await this.sendEmail(customerNotification(name, email, orderSummary));

			return { success: true, error: null };
		} catch (error) {
			console.error('Error al enviar mail de compra al cliente.', error);

			return { success: false, error };
		}
	}

	public async sendAdminNotification(
		orderId: number,
		name: string,
		email: string,
		phone: string,
		orderSummary: string
	) {
		try {
			await this.sendEmail(
				adminNotification(orderId, name, email, phone, orderSummary)
			);

			return { success: true, error: null };
		} catch (error) {
			console.error('Error al enviar mail de compra al administrador.', error);

			return { success: false, error };
		}
	}

	public async sendContactEmail(
		name: string,
		email: string,
		phone: string,
		message: string
	) {
		try {
			await this.sendEmail(contactEmail(name, email, phone, message));

			return { success: true };
		} catch (error) {
			console.error('Error al enviar mail de contacto.', error);

			throw new Error('Error al enviar mail de contacto.');
		}
	}

	public async sendForgotPasswordEmail(
		name: string,
		email: string,
		token: string
	) {
		try {
			await this.sendEmail(forgotPasswordEmail(name, email, token));

			return { success: true, error: null };
		} catch (error) {
			console.error('[FORGOT_PASSWORD_EMAIL_MAILER_ERROR]', error);
			return { success: false, error };
		}
	}
}
