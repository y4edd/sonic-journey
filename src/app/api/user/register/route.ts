import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ユーザー新規登録API
export const POST = async (req: NextRequest, res:NextResponse) => {
    try {
      // 入力データを受け取る
      const { name, email, password } = await req.json();

      // 登録済のメールアドレスを除外する
      const exitingUser = await prisma.user.findUnique({
        where: { email },
      });

      if(exitingUser) {
        return NextResponse.json({ message: "このメールアドレスはすでに登録されています"},{status:409});
      }

      // hash化(2の12乗)
      const hashedPassword = await bcrypt.hash(password, 12);

      // ユーザーの登録処理
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          createdAt: new Date(),
        },
      });

      return NextResponse.json({ message: "ユーザーの登録に成功しました", user: newUser },{status:201});
    } catch (err) {
      // 開発者向けログ
      console.error("サーバーエラーが発生しました", err);
      // ユーザー向けエラー表示
      return NextResponse.json({err: "サーバーエラーが発生しました" },{status:500});
    }
}
