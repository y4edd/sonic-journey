import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// NextAuth.js の設定オプションを定義
const options: NextAuthOptions = {
  // PrismaAdapter を使って Prisma と接続
  adapter: PrismaAdapter(prisma), 

  debug: true,

  // 認証に失敗した場合のリダイレクト先を指定
  pages: {
    // ログインが必要な場合は登録ページに遷移
    signIn: "/user/register",
  },

  // セッションの設定 (JWT 方式で管理)
  session: {
    // JSON Web Token を使ったセッション管理
    strategy: "jwt",
    // 24時間
    maxAge: 1 * 24 * 60 * 60,
  },

  // クレデンシャル認証のプロバイダを設定
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: { label: "email", type: "Email", placeholder: "example" },
        password: { label: "password", type: "password" }
      },
      // 認証処理を行う関数
      async authorize(credentials) {
        // ログインAPIにPOSTリクエストを送信
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          }),
          headers: { "Content-Type": "application/json" }
        });

        // レスポンスからユーザー情報を取得
        const user = await res.json();

        // 認証が成功した場合、ユーザー情報を返す
        if (res.ok && user) {
          return { id: user.id, name: user.name, email: user.email, role: "admin" };
        }

        // 認証が失敗した場合、エラーを投げる
        if (!res.ok) {
          throw new Error("認証に失敗しました。メールアドレスかパスワードが間違っています");
        }

        return user;
      }
    })
  ],

  // コールバック関数の設定 (JWT とセッションの管理)
  callbacks: {
    // JWT トークンの作成時に追加情報を付与
    async jwt({ token, user, account, profile }) {
      if (user) {
         // トークンにユーザー情報を追加
        token.user = user;
        const u = user as any; 
        // ユーザーの役割を追加 (デフォルトは"user")
        token.role = u.role || "user";
      }
      if (account) {
        // アカウントのアクセストークンを保存
        token.accessToken = account.access_token;
      }
      // トークンを返す
      return token;
    },

    // セッションの取得時にユーザー情報を追加
    async session({ session, token }) {
      return {
        // セッション情報を維持
        ...session,
        user: {
          ...session.user,
          // トークンからユーザーの役割を追加
          role: token.role
        },
        // アクセストークンを追加
        accessToken: token.accessToken
      };
    }
  }
};

export default options;
