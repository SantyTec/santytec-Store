import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/client';
import NextAuth, { NextAuthConfig } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import type { Provider } from 'next-auth/providers';
import Google from 'next-auth/providers/google';
import { Role } from '@prisma/client';

const providers: Provider[] = [
	Google({
		profile(profile) {
			const email = profile.email.toLowerCase();
			return {
				id: profile.sub,
				name: `${profile.given_name} ${profile.family_name}`,
				email,
				image: profile.picture,
				role: 'USER' as Role,
			};
		},
	}),
];

const authConfig = {
	adapter: PrismaAdapter(prisma) as Adapter,
	providers,
	callbacks: {
		session({ session, user }) {
			if (session.user) {
				session.user.id = user.id;
				session.user.role = user.role as Role;
			}
			return session;
		},
	},
	pages: {
		signIn: '/login',
	},
} satisfies NextAuthConfig;

export const providerMap = providers
	.map((provider) => {
		if (typeof provider === 'function') {
			const providerData = provider();
			return { id: providerData.id, name: providerData.name };
		} else {
			return { id: provider.id, name: provider.name };
		}
	})
	.filter((provider) => provider.id !== 'credentials');

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
