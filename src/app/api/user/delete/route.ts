import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { type NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json({ message: "権限がありません" }, { status: 401 });
  }

  const token = request.cookies.get("token");

  if (!token) {
    return NextResponse.json({ message: "ログインが必要です" }, { status: 200 });
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
    await prisma.user.delete({
      where: {
        id: decoded.id,
      },
    });

    const response = NextResponse.json(
      { message: "アカウントの削除に成功しました" },
      { status: 200 },
    );
    response.cookies.delete("token");

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
