import bcrypt from "bcrypt";
// Node.js環境下だから"next/server"下のNextRequestは使えない。.res等も使えなくなる
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

// ユーザー新規登録API
const handler = async (req: NextApiRequest, res:NextApiResponse) => {
  if(req.method === "POST") {
    try {
      // 受け取る
      const { name, email, password } = await req.body();
      // デバッグ用（DELETE）
      console.log("受け取ったデータ:", { name, email });

      // 登録済のメールアドレスを除外する
      const exitingUser = await prisma.user.findUnique({
        where: { email },
      });

      if(exitingUser) {
        res.status(409).json({ message: "このメールアドレスはすでに登録されています"});
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

      return res.status(201).json({ message: "ユーザーの登録に成功しました", user: newUser });
    } catch (err) {
      // 開発者向けログ
      console.error("サーバーエラーが発生しました", err);
      // ユーザー向けエラー表示
      return res.status(500).json({err: "サーバーエラーが発生しました" });
    }
  } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`${req.method}メソッドは使用できません`);
    };
}
export default handler;
