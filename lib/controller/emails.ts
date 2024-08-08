import { Emailer } from '@/lib/emails/nodemailer';

const emailer = new Emailer();

export async function sendNotifications(
	orderId: number,
	name: string,
	phone: string,
	email: string
): Promise<{ success: boolean; message?: string }> {
	const customerNotificationResult = await emailer.sendCustomerNotification(
		name,
		email
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
		phone
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
