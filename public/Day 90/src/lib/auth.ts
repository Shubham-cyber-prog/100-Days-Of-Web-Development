import type { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (
          credentials?.email === "test@example.com" &&
          credentials?.password === "password"
        ) {
          return {
            id: "1",
            email: "test@example.com",
            name: "Test User",
            role: "SALES", // ✅ MUST be here
          };
        }

        return null;
      },
    }),
  ],

  callbacks: {
    // 👇 copy role into JWT
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },

    // 👇 copy role from JWT into session
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as any;
      }
      return session;
    },
  },
};
