import { prisma } from '@/lib/client';
import { autoAssociateOrdersOnRegistration } from '@/lib/model/order';

export const findUserById = async (id: string) => {
	try {
		const user = await prisma.user.findUnique({
			where: { id: String(id) },
			select: { id: true, name: true, email: true, phone: true },
		});

		return { success: true, data: user, message: 'Usuario encontrado' };
	} catch (error) {
		console.error('[FIND_USER_BY_ID_MODEL_ERROR]', error);

		return {
			success: false,
			data: null,
			message: 'Error al buscar el usuario',
		};
	}
};

export async function createUser(data: {
	name?: string;
	email: string;
	phone?: string;
	password?: string;
}) {
	try {
		const user = await prisma.user.create({ data });

		return { data: user, message: 'Usuario creado', success: true };
	} catch (error) {
		console.error('[CREATE_USER_MODEL_ERROR]:', error);

		return { data: null, message: 'Error al crear el usuario', success: false };
	}
}

export async function findUserByEmailOrPhone(
	email: string,
	phone?: string | null
) {
	return prisma.user.findFirst({
		where: {
			OR: [{ email }, ...(phone ? [{ phone }] : [])],
		},
	});
}

export const updateUserEmail = async (id: string, email: string) => {
	try {
		const updated = await prisma.user.update({
			where: { id },
			data: { email },
			select: { id: true, email: true, name: true, phone: true },
		});

		return { success: true, data: updated, message: 'Email actualizado' };
	} catch (error) {
		console.error('[UPDATE_USER_EMAIL_MODEL_ERROR]', error);
		return {
			success: false,
			data: null,
			message: 'Error al actualizar el email',
		};
	}
};

export const updateUserPhone = async (id: string, phone: string) => {
	try {
		const updated = await prisma.user.update({
			where: { id },
			data: { phone },
			select: { id: true, email: true, name: true, phone: true },
		});

		return { success: true, data: updated, message: 'Teléfono actualizado' };
	} catch (error) {
		console.error('[UPDATE_USER_PHONE_MODEL_ERROR]', error);
		return {
			success: false,
			data: null,
			message: 'Error al actualizar el teléfono',
		};
	}
};

export const updateUserPassword = async (
	id: string,
	hashedPassword: string
) => {
	try {
		await prisma.user.update({
			where: { id },
			data: { password: hashedPassword },
		});

		return { success: true, message: 'Contraseña actualizada' };
	} catch (error) {
		console.error('[UPDATE_USER_PASSWORD_MODEL_ERROR]', error);
		return { success: false, message: 'Error al actualizar la contraseña' };
	}
};

export const deleteUserById = async (id: string) => {
	try {
		await prisma.user.delete({ where: { id } });
		return { success: true, message: 'Usuario eliminado' };
	} catch (error) {
		console.error('[DELETE_USER_MODEL_ERROR]', error);
		return { success: false, message: 'Error al eliminar el usuario' };
	}
};

export async function activateUserAndAssociateOrders(
	userId: string,
	email: string
) {
	const activatedUser = await prisma.user.update({
		where: { id: userId },
		data: { emailVerified: new Date() },
	});

	await autoAssociateOrdersOnRegistration(userId, email);

	return activatedUser;
}
