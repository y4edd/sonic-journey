import  prisma  from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  debug: true,
  pages: {
    signIn: "/user/register",
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, 
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "email",
          type: "Email",
          placeholder: "example",
        },
        password: {label: "password", type: "password"}
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          }),
          headers: {"Content-Type": "application/json"}
        })
        const user = await res.json()
        if (res.ok && user) {
          return {id: user.id, name: user.email, email: user.email, role: "admin"}
        }
        if(!res.ok) {
          throw new Error("認証に失敗しました。メールアドレスかパスワードが間違っています")
        }
        return user;
      }
    })
  ],

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.user = user
        const u = user as any
        token.role = u.role
      }
      if (account) {
        token.accessToken = account.access_token
      }

      return token
    },
    async session({ session, token}) {
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role
        },
        accessToken: token.accessToken,
      };
    }
  }
}

export default options;
