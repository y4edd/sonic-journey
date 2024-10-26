import NextAuth from "next-auth";
import options from "../../options";

// GETリクエスト用のnamed export
export const GET = NextAuth(options);

// POSTリクエスト用のnamed export
export const POST = NextAuth(options);
