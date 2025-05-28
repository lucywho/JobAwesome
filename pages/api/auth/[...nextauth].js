import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from 'lib/prisma';

let data;

if (process.env.NODE_ENV === 'development') {
  data = {
    server: process.env.EMAIL_SERVER,
    from: process.env.EMAIL_FROM,
  };
} else {
  data = {
    server: `smtp://${process.env.EMAIL_SERVER_USER}:${process.env.EMAIL_SERVER_PASSWORD}@${process.env.EMAIL_SERVER_HOST}:${process.env.EMAIL_SERVER_PORT}`,
    from: process.env.EMAIL_FROM,
  };
}

export default NextAuth({
  providers: [EmailProvider(data)],

  database: process.env.DATABASE_URL,
  secret: process.env.SECRET,

  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  debug: true,
  adapter: PrismaAdapter(prisma),

  callbacks: {
    session: async ({ session, user }) => {
      session.user.id = user.id;
      return Promise.resolve(session);
    },
  },
});
