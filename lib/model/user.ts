import { prisma } from '@/lib/client';

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
