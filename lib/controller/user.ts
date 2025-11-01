import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import {
	findUserById as findUserSimple,
	createUser,
	findUserByEmailOrPhone,
	activateUserAndAssociateOrders,
	updateUserPassword,
} from '@/lib/model/user';
import * as tokenModel from '@/lib/model/verificationToken';
import { Emailer } from '@/lib/emails/nodemailer';
import { createVerificationToken } from '@/lib/model/verificationToken';
import {
	getUserByEmail,
	verifyCurrentPassword,
	updateUser,
	findUserById,
} from '@/lib/data/user';
import {
	createEmailChangeToken,
	findTokenByHashedToken,
	deleteToken,
} from '@/lib/data/token';
import { string } from 'zod';
import {
	deleteInvitationToken,
	verifyInvitationToken,
} from '@/lib/controller/token';

export const handleGetUser = async (userId: string) => {
	const { success, data, message } = await findUserSimple(userId);

	if (!success) return { success, message };

	return { success, data, message };
};

export async function handleRegister(
	email: string,
	password: string,
	name: string,
	phone?: string
) {
	const emailer = new Emailer();

	const emailLower = email.toLowerCase();

	const existingUser = await findUserByEmailOrPhone(emailLower, phone);

	if (existingUser) {
		if (existingUser.email === emailLower) {
			return {
				message: 'Este email ya está registrado. ¿Querés iniciar sesión?',
				success: false,
			};
		}
		if (existingUser.phone === phone) {
			return {
				message: 'Este teléfono ya está registrado.',
				success: false,
			};
		}
	}

	const hashed = await bcrypt.hash(password, 10);

	const { data: user, success: userSucces } = await createUser({
		name,
		email,
		phone,
		password: hashed,
	});
	if (!userSucces)
		return { success: false, message: 'Lo sentimos ha ocurrido un error' };

	const { data: token, success: tokenSuccess } = await createVerificationToken(
		email
	);

	if (!tokenSuccess || !token)
		return { success: false, message: 'Lo sentimos ha ocurrido un error' };

	const { success: emailSuccess } = await emailer.sendVerificationEmail(
		name,
		email,
		token
	);

	if (!emailSuccess)
		return { success: false, message: 'No se pudo enviar el mail' };

	return {
		success: true,
		message: 'Usuario creado. Por favor verifica tu correo.',
	};
}

export async function handleInvitationRegister(
	email: string,
	password: string,
	name: string
) {
	try {
		const hashed = await bcrypt.hash(password, 10);

		const { data: user, success: userSuccess } = await createUser({
			name,
			email,
			password: hashed,
		});
		if (!userSuccess)
			return { success: false, message: 'Lo sentimos ha ocurrido un error' };

		await activateUserAndAssociateOrders(user?.id!, email);

		return {
			success: true,
			message:
				'¡Tu cuenta ha sido verificada exitosamente! Ya puedes iniciar sesión.',
		};
	} catch (error) {
		console.error('[INVITATION_REGISTER_CONTROLLER_ERROR]', error);
		return {
			success: false,
			message: 'Lo sentimos. Ha ocurrido un error inesperado',
		};
	}
}

export async function handleVerifyEmail(plainToken: string) {
	const hashedToken = crypto
		.createHash('sha256')
		.update(plainToken)
		.digest('hex');

	const verificationToken = await tokenModel.findFirstByToken(hashedToken);

	if (!verificationToken) {
		return {
			success: false,
			message: 'El enlace de verificación es inválido o ya fue utilizado.',
		};
	}

	const hasExpired = verificationToken.expires < new Date();
	if (hasExpired) {
		await tokenModel.deleteById(verificationToken.id);
		return {
			success: false,
			message:
				'El enlace de verificación ha expirado. Por favor, regístrate de nuevo.',
		};
	}

	const user = await getUserByEmail(verificationToken.email);
	if (!user) {
		return {
			success: false,
			message: 'Usuario no encontrado. Contacta a soporte.',
		};
	}

	await activateUserAndAssociateOrders(user.id, user.email!);

	await tokenModel.deleteById(verificationToken.id);

	return {
		success: true,
		message:
			'¡Tu cuenta ha sido verificada exitosamente! Ya puedes iniciar sesión.',
	};
}

export async function handleUpdatePassword(
	userId: string,
	{
		currentPassword,
		newPassword,
	}: { currentPassword: string; newPassword: string }
) {
	const emailer = new Emailer();

	try {
		const user = await findUserById(userId);

		if (!user) return { success: false, message: 'Usuario no encontrado' };

		if (!user.password) {
			return {
				success: false,
				message:
					'No puedes cambiar la contraseña. Debes gestionar tu cuenta con Google',
			};
		}

		const isPasswordValid = await bcrypt.compare(
			currentPassword,
			user.password
		);

		if (!isPasswordValid)
			return { success: false, message: 'Su contraseña es incorrecta' };

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

		const { success: updateSuccess } = await updateUserPassword(
			userId,
			hashedPassword
		);

		if (!updateSuccess)
			return { success: false, message: 'Error al actualizar la contraseña' };

		await emailer.sendEmail({
			to: user.email!,
			subject: 'Cambio de contraseña exitoso',
			html: `
        <h2>Cambio de contraseña</h2>
        <p>Tu contraseña ha sido cambiada exitosamente.</p>
        <p>Si no realizaste este cambio, contacta a soporte inmediatamente.</p>
        <p>Fecha: ${new Date().toLocaleString()}</p>
      `,
		});

		return { success: true, message: 'Solicitud exitosa! Revisa tu email' };
	} catch (error) {
		console.error('Error en handleUpdatePassword:', error);
		return {
			success: false,
			message: 'Error al actualizar la contraseña. Inténtalo de nuevo.',
		};
	}
}

export async function handleUpdatePhone(
	userId: string,
	form: { phone: string; currentPassword?: string }
) {
	// 1. Buscar usuario
	const user = await findUserById(userId);

	if (!user) {
		return { success: false, message: 'Usuario no encontrado' };
	}

	// 2. Si tiene contraseña, verificar currentPassword
	if (user.password) {
		if (!form.currentPassword) {
			return {
				success: false,
				message: 'Debes proporcionar tu contraseña actual',
			};
		}
		const passwordValid = await verifyCurrentPassword(
			user.password,
			form.currentPassword
		);
		if (!passwordValid) {
			return {
				success: false,
				message: 'Contraseña incorrecta',
			};
		}
	}

	// 3. Actualizar teléfono
	const updatedUser = await updateUser(userId, { phone: form.phone });
	if (!updatedUser) {
		return {
			success: false,
			message: 'Error al actualizar el teléfono',
		};
	}

	// 4. Enviar notificación de seguridad
	try {
		const emailer = new Emailer();
		await emailer.sendEmail({
			to: user.email!,
			from: process.env.GMAIL_USER!,
			subject: 'Actualización de teléfono',
			text: `Tu número de teléfono ha sido actualizado. Si no realizaste este cambio, contacta con soporte inmediatamente.`,
		});
	} catch (error) {
		console.error('Error enviando email de notificación:', error);
	}

	// 5. Retornar éxito
	return {
		success: true,
		message: 'Teléfono actualizado correctamente',
		data: updatedUser,
	};
}

/**
 * Inicia el proceso de cambio de email (Fase 1)
 */
export async function handleRequestEmailChange(
	userId: string,
	form: { newEmail: string; currentPassword?: string }
) {
	// 1. Buscar usuario
	const user = await findUserById(userId);
	if (!user) {
		return { success: false, message: 'Usuario no encontrado' };
	}

	// 2. Si tiene contraseña, verificar currentPassword
	if (user.password) {
		if (!form.currentPassword) {
			return {
				success: false,
				message: 'Debes proporcionar tu contraseña actual',
			};
		}
		const passwordValid = await verifyCurrentPassword(
			user.password,
			form.currentPassword
		);
		if (!passwordValid) {
			return {
				success: false,
				message: 'Contraseña incorrecta',
			};
		}
	}

	// 3. Verificar que el nuevo email no esté en uso
	const existingUser = await getUserByEmail(form.newEmail);
	if (existingUser && existingUser.id !== userId) {
		return {
			success: false,
			message: 'Este email ya está en uso',
		};
	}

	// 4. Crear token de cambio de email
	const token = await createEmailChangeToken(user.email!, form.newEmail);

	// 5. Enviar email de verificación al NUEVO email
	try {
		const emailer = new Emailer();
		const verificationUrl = `${process.env.FRONTEND_STORE_URL}/auth/verify-email-change?token=${token}`;

		await emailer.sendEmail({
			to: form.newEmail,
			from: process.env.GMAIL_USER!,
			subject: 'Confirma tu nuevo email',
			text: `Haz clic en el siguiente enlace para confirmar tu nuevo email: ${verificationUrl}`,
		});
	} catch (error) {
		console.error('Error enviando email de verificación:', error);
		return {
			success: false,
			message: 'Error al enviar el email de verificación',
		};
	}

	return {
		success: true,
		message: 'Revisa tu nuevo email para confirmar el cambio',
	};
}

export async function handleVerifyEmailChange(plainToken: string) {
	const hashedToken = crypto
		.createHash('sha256')
		.update(plainToken)
		.digest('hex');

	const token = await findTokenByHashedToken(hashedToken, 'EMAIL_CHANGE');
	if (!token) {
		return {
			success: false,
			message: 'El enlace es inválido o ya fue utilizado',
		};
	}

	if (token.expires < new Date()) {
		await deleteToken(token.id);
		return {
			success: false,
			message:
				'El enlace ha expirado. Por favor, solicita el cambio nuevamente',
		};
	}

	const user = await findUserByEmailOrPhone(token.email);

	if (!user) {
		await deleteToken(token.id);
		return {
			success: false,
			message: 'Usuario asociado al token no encontrado',
		};
	}

	const updatedUser = await updateUser(user.id, { email: token.newEmail! });
	if (!user) {
		return {
			success: false,
			message: 'Error al actualizar el email',
		};
	}

	// 5. Eliminar token usado
	await deleteToken(token.id);

	// 6. Enviar notificación al email anterior
	try {
		const emailer = new Emailer();
		await emailer.sendEmail({
			to: token.email,
			from: process.env.GMAIL_USER!,
			subject: 'Tu email ha sido cambiado',
			text: `Tu email ha sido actualizado exitosamente a ${token.newEmail}. Si no realizaste este cambio, contacta con soporte inmediatamente.`,
		});
	} catch (error) {
		console.error('Error enviando notificación:', error);
	}

	return {
		success: true,
		message: 'Email actualizado correctamente',
		data: user,
	};
}

export async function handleInvitationEmail(token: string) {
	const verification = await verifyInvitationToken(token);

	if (!verification.valid) {
		return { success: false, message: 'Código Invalido' };
	}

	const { email, phone } = verification.invitation!;

	const existingUser = await getUserByEmail(email);

	if (existingUser) {
		return { success: false, message: 'Este email ya tiene cuenta' };
	}

	await deleteInvitationToken(token);

	return {
		success: true,
		message: 'Invitación verificada',
		data: { email, phone },
	};
}

export async function handleResendVerificationEmail(email: string) {
	const user = await getUserByEmail(email);
	if (!user) return { success: false, message: 'Usuario no encontrado' };

	if (user.emailVerified)
		return { success: false, message: 'El email ya está verificado' };

	const { data: token, success: tokenSuccess } = await createVerificationToken(
		email
	);
	if (!tokenSuccess || !token) {
		return { success: false, message: 'No se pudo crear un nuevo token' };
	}

	const emailer = new Emailer();
	const emailSent = await emailer.sendVerificationEmail(email, email, token);
	if (!emailSent.success) {
		return {
			success: false,
			message: 'No se pudo enviar el email de verificación',
		};
	}

	return {
		success: true,
		message: 'Email de verificación reenviado exitosamente',
	};
}
