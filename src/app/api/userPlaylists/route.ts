import prisma from "@/lib/prisma";
import { exists } from "fs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, _res: NextResponse) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json({ message: "権限がありません" }, { status: 500 });
  }

  const token = req.cookies.get("token");

  if (!token) {
    return NextResponse.json(
      { message: "ログインが必要です" },
      { status: 401 }
    );
  }
  try {
    const decoded = jwt.verify(token.value, secretKey) as { id: string };
    const userPlaylists = await prisma.playlist.findMany({
      where: {
        user_id: decoded.id,
      },
    });

    // プレイリストが未作成の場合はexistsがfalse
    const exists = userPlaylists.length > 0;

    return NextResponse.json({ userPlaylists, exists }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
};
