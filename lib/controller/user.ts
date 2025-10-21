import { findUserById } from '@/lib/model/user';

export const handleGetUser = async (userId: string) => {
	const { success, data, message } = await findUserById(userId);

	if (!success) return { success, message };

	return { success, data, message };
};
