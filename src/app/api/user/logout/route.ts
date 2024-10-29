import { NextRequest, NextResponse } from "next/server";

export const POST = async ( req: NextRequest, res:NextResponse ) => {
  try{
    const response = NextResponse.json({message:"ログアウトに成功しました"},{status:200});

    response.cookies.delete("token");
    return response;
  }catch(err){
    console.error("サーバーエラーが発生しました");
    return NextResponse.json({err:"サーバーエラーが発生しました"},{status:500});
  }
}
