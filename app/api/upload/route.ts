import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import { getUser } from "@/query/user.query";

export async function POST(request: Request) {
  const formData = await request.formData();
  const content = formData.get("content") as string;
  const media = formData.get("media") as File | null;

  const user = await getUser(); // Assurez-vous que cette fonction est définie pour récupérer l'utilisateur

  let mediaFileName: string | null = null;

  if (media !== null && media.size > 0) {
    const arrayBuffer = await media.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    mediaFileName = `${Date.now()}_${media.name}`;
    await fs.writeFile(`public/${mediaFileName}`, buffer);
  }

  const post = await prisma.post.create({
    data: {
      content: content,
      mediaList: mediaFileName ? [mediaFileName] : [],
      userId: user.id,
    },
  });

  return NextResponse.json({ id: post.id });
}
