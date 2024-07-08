import * as nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import { adminNotification, customerNotification } from './templates';

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

	public async sendCustomerNotification(name: string, email: string) {
		try {
			await this.sendEmail(customerNotification(name, email));

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
		phone: string
	) {
		try {
			await this.sendEmail(adminNotification(orderId, name, email, phone));

			return { success: true, error: null };
		} catch (error) {
			console.error('Error al enviar mail de compra al administrador.', error);

			return { success: false, error };
		}
	}
}
