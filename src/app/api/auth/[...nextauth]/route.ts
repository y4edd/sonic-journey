import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// クレデンシャル認証
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = { id: "1", name: "Test User", email: "credentials.email" };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});

// セッション管理
export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, 
  },
  providers: [
  ],
};
