import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

type SpecialImages = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export const GET = async () => {
  try {
    const specialImages: SpecialImages[] = await prisma.pick.findMany();
    if (!specialImages) {
      return NextResponse.json(
        { message: "特集ページの情報が見つかりませんでした" },
        { status: 404 }
      );
    }
    return NextResponse.json(specialImages, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
};
