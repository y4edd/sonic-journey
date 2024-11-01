import { type NextRequest, NextResponse } from "next/server";

export const POST = async (_req: NextRequest, _res: NextResponse) => {
  try {
    const response = NextResponse.json({ message: "ログアウトに成功しました" }, { status: 200 });

    response.cookies.delete("token");
    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
