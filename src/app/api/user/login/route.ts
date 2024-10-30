import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req:NextRequest,res:NextResponse) => {
  try {

    const secretKey = process.env.JWT_SECRET_KEY;

    if(!secretKey){
      return NextResponse.json({message: "権限がありません"},{status:401});
    }

    const {mail,password} = await req.json();

    const User = await prisma.user.findUnique({
      where:{email: mail },
    });

    if(!User){
      NextResponse.json({message: "このメールアドレスは無効です"},{status:401});
    }

    const isPasswordCorrect = await bcrypt.compare(password, User!.password);

    if(!isPasswordCorrect){
      NextResponse.json({message: "パスワードが一致しません"},{status:401});
    }
    
    const  jwtPayload = { id:User!.id };
    const token = jwt.sign(jwtPayload, secretKey,{ expiresIn: "1d" });
    // HttpOnlyクッキーにJWTを保存
    cookies().set({
      name: "token",
      value: token,
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json({message: "ログインに成功しました。"},{status:200});
  }catch (err: any) {
    console.error(err);
    return NextResponse.json({message: "サーバーエラーが発生しました。"},{status:500});
  } 
};
