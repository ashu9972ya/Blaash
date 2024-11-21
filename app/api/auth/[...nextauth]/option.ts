import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth';
// Define the NextAuth configuration
export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID || "",
      clientSecret: process.env.CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking : true,

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile https://www.googleapis.com/auth/youtube.readonly",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token as string;
      }
      if (account?.refresh_token) {
        token.refreshToken = account.refresh_token; // Store the refresh token
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};




