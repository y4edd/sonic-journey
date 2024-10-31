import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json({ message: "権限がありません" }, { status: 401 });
    }

    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "このメールアドレスは無効です" }, { status: 401 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "パスワードが一致しません" }, { status: 401 });
    }

    const jwtPayload = { id: user.id };
    const token = jwt.sign(jwtPayload, secretKey, { expiresIn: "1d" });

    const response = NextResponse.json({ message: "ログインに成功しました。" }, { status: 200 });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "サーバーエラーが発生しました。" }, { status: 500 });
  }
};
