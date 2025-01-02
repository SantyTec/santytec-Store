import { Emailer } from '@/lib/emails/nodemailer';

const emailer = new Emailer();

export async function sendNotifications(
	orderId: number,
	name: string,
	phone: string,
	email: string,
	orderSummary: string
): Promise<{ success: boolean; message?: string }> {
	const customerNotificationResult = await emailer.sendCustomerNotification(
		name,
		email,
		orderSummary
	);
	if (!customerNotificationResult.success) {
		return {
			success: false,
			message:
				'Su orden fue creada. Pero no se pudo enviar el mail al cliente. Por favor contacte con nosotros',
		};
	}

	const adminNotificationResult = await emailer.sendAdminNotification(
		orderId,
		name,
		email,
		phone,
		orderSummary
	);
	if (!adminNotificationResult.success) {
		return {
			success: false,
			message:
				'Su orden fue creada. Pero no se pudo enviar el mail al administrador. Por favor contacte con nosotros',
		};
	}

	return { success: true, message: 'Notificaciones enviadas correctamente.' };
}

export async function sendContactEmail(
	name: string,
	email: string,
	phone: string,
	message: string
) {
	try {
		const { success } = await emailer.sendContactEmail(
			name,
			email,
			phone,
			message
		);

		return { success, message: 'Correo enviado correctamente.' };
	} catch (error: any) {
		return {
			success: false,
			message: error.message || 'Error al enviar el correo',
		};
	}
}
