import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ユーザー新規登録API
export const POST = async (req: Request, res: NextResponse) => {
  try {
    if (req.method !== 'POST')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const { name, email, password } = await req.json()

    const existingUser = await prisma.user.findUnique({ where: { email } })

    if (existingUser)
      return NextResponse.json({ message: 'Email taken' }, { status: 422 })

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        createdAt: new Date(),
      },
    })

    return NextResponse.json({ message: "ユーザー登録に成功しました！" }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
