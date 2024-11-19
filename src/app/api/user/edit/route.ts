import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (request: NextRequest) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json({ message: "権限がありません" }, { status: 401 });
  }

  const token = request.cookies.get("token");

  if (!token) {
    return NextResponse.json({ message: "ログインが必要です" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token.value, secretKey) as { id: string };

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "ユーザーが見つかりませんでした" }, { status: 401 });
    }

    const { name, email, password } = await request.json();

    const isEmailExist = await prisma.user.findUnique({
      where:{
        email: email
      },
    });

    if(isEmailExist) {
      return NextResponse.json({ message: "このメールアドレスは既に使われています" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: {
        id: decoded.id,
      },
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "ユーザー情報の編集に成功しました" }, { status: 200 });
  } catch (err) {
    console.error(err);
    console.log("PATCHメソッドのエラーなり");
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
