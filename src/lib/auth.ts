import { Role } from '@prisma/client';
import { compare } from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from './db';

declare module 'next-auth' {
  interface Session {
    user: { id: string; role: Role; email: string };
  }
}

declare module 'next-auth/jwt' {
  interface JWT { role?: Role }
}

export const authOptions: NextAuthOptions = {  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const user = await db.user.findUnique({ where: { email: credentials.email } });
        if (!user?.passwordHash) return null;
        const ok = await compare(credentials.password, user.passwordHash);
        if (!ok) return null;
        return { id: user.id, email: user.email, role: user.role };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as { role: Role }).role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? '';
        session.user.role = token.role ?? Role.CUSTOMER;
        session.user.email = token.email ?? '';
      }
      return session;
    }
  },
  pages: {
    signIn: '/account/login'
  }
};
