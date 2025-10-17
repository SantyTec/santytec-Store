import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/client';
import NextAuth, { NextAuthConfig } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import type { Provider } from 'next-auth/providers';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { Role } from '@prisma/client';
import z from 'zod';

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
		allowDangerousEmailAccountLinking: true,
	}),
	Credentials({
		id: 'credentials',
		name: 'Credenciales',
		credentials: {
			email: { label: 'Email', type: 'email' },
			password: { label: 'Contraseña', type: 'password' },
		},
		async authorize(credentials) {
			const parsedCredentials = z
				.object({
					email: z.string().email(),
					password: z.string().min(6),
				})
				.safeParse(credentials);

			if (!parsedCredentials.success) {
				return null;
			}

			const { email, password } = parsedCredentials.data;

			const user = await prisma.user.findUnique({
				where: { email: email.toLowerCase() },
			});

			if (!user || !user.password) {
				return null;
			}

			const passwordMatch = await bcrypt.compare(password, user.password);

			if (!passwordMatch) {
				return null;
			}

			return {
				id: user.id,
				email: user.email,
				name: user.name,
				image: user.image,
				role: user.role,
			};
		},
	}),
];

const authConfig = {
	adapter: PrismaAdapter(prisma) as Adapter,
	providers,
	callbacks: {
		async signIn({ user, account, profile }) {
			if (account?.provider === 'google') {
				const email = user.email?.toLowerCase();

				if (!email) return false;

				const existingUser = await prisma.user.findUnique({
					where: { email },
					include: { accounts: true },
				});

				if (existingUser) {
					const accountExists = existingUser.accounts.some(
						(acc) => acc.provider === account.provider
					);

					if (!accountExists) {
						await prisma.account.create({
							data: {
								userId: existingUser.id,
								type: account.type,
								provider: account.provider,
								providerAccountId: account.providerAccountId,
								refresh_token: account.refresh_token,
								access_token: account.access_token,
								expires_at: account.expires_at,
								token_type: account.token_type,
								scope: account.scope,
								id_token: account.id_token,
								session_state: account.session_state as string,
							},
						});
					}

					if (!existingUser.emailVerified) {
						await prisma.user.update({
							where: { id: existingUser.id },
							data: { emailVerified: new Date() },
						});
					}
				}
			}

			return true;
		},
		async jwt({ token, user, trigger, session }) {
			if (user) {
				token.id = user.id;
				token.role = user.role;
			}

			if (trigger === 'update' && session) {
				token = { ...token, ...session };
			}

			return token;
		},
		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.id as string;
				session.user.role = token.role as any;
			}
			return session;
		},
	},
	events: {
		async linkAccount({ user }) {
			await prisma.user.update({
				where: { id: user.id },
				data: { emailVerified: new Date() },
			});
		},
	},
	pages: {
		signIn: '/login',
	},
} satisfies NextAuthConfig;

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
