import prisma from "@/lib/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, _res: NextResponse) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json({ message: "権限がありません" }, { status: 500 });
  }

  const token = req.cookies.get("token");

  if (!token) {
    return NextResponse.json({ message: "ログインが必要です" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token.value, secretKey) as { email: string };

    const user = await prisma.user.findUnique({
      where: {
        email: decoded.email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "ユーザーが見つかりませんでした" }, { status: 401 });
    }
    const _deleteUser = await prisma.user.delete({
      where: {
        email: decoded.email,
      },
    });

    const response = NextResponse.json(
      { message: "アカウントの削除に成功しました" },
      { status: 200 },
    );
    response.cookies.delete("token");

    return response;
  } catch (_err) {
    console.error("サーバーエラーが発生しました");
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
