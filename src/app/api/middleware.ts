import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    // 未ログイン時のリダイレクト先を指定
    signIn: "/user/login",  
  },
});

export const config = {
  // 認証が必要な全ルートを指定
  matcher: ["/((?!api|login|signUp|user/register).*)"],  
};
