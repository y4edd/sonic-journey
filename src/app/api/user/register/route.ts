import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ユーザー新規登録API
export const POST = async (req: Request) => {
  try {
    // 受け取る
    const { name, email, password } = await req.json();
    // デバッグ用（DELETE）
    console.log("受け取ったデータ:", { name, email });

    // hash化
    const hashedPassword = await bcrypt.hash(password, 12);

    // DBに新しいデータを登録
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
      },
    });

    console.log("ユーザー登録成功:", newUser);
    return new Response(JSON.stringify({ message: "ユーザー登録成功" }), { status: 201 });

  } catch (error) {
    // エラー吐いてほしい
    console.error("サーバーエラー:", error);
    return new Response(JSON.stringify({ message: "ユーザー登録に失敗しました", error: (error as Error).message }), { status: 500 });
  }

}
