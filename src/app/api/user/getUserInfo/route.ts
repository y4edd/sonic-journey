import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json({ message: "権限がありません" }, { status: 401 });
  }

  const token = req.cookies.get("token");

  if (!token) {
    return NextResponse.json({ message: "ログインが必要です" }, { status: 401 });
  }
  try {
    const decoded = jwt.verify(token.value, secretKey) as { id: string };
    const userInfo = await prisma.user.findFirst({
      where: {
        id: decoded.id,
      },
    });
    if (!userInfo) {
      return NextResponse.json({ message: "ユーザーが見つかりませんでした" }, { status: 401 });
    }
    return NextResponse.json(userInfo, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
