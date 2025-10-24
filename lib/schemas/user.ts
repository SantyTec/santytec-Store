import { z } from 'zod';

import { RegisterSchema } from '@/lib/schemas/auth';

export const ProfileSchema = RegisterSchema;
export type ProfileSchemaValues = z.infer<typeof ProfileSchema>;

export type ProfileFormState = {
	message: string;
	success: boolean;
	errors?: {
		name?: string[];
		email?: string[];
		password?: string[];
	};
};
