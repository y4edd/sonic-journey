import prisma from "@/lib/prisma";
import type { SpecialOverView } from "@/types/deezer";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const specialOverViews: SpecialOverView[] = await prisma.pick.findMany();
    if (!specialOverViews) {
      return NextResponse.json(
        { message: "特集ページの情報が見つかりませんでした" },
        { status: 404 },
      );
    }
    return NextResponse.json(specialOverViews, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
