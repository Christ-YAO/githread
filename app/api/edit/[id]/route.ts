import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import { getUser } from "@/query/user.query";
import path from "path";

export async function POST(
  request: Request,
  { params }: { params: Record<string, string> }
) {
  const formData = await request.formData();
  const content = formData.get("content") as string;
  const media = formData.get("media") as File | null;

  const user = await getUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const publicDir = path.join(process.cwd(), "public");

  // Récupérer le post existant pour obtenir l'ancienne image
  const existingPost = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
    select: {
      userId: true,
      mediaList: true, // On récupère l'ancienne image
    },
  });

  if (!existingPost) {
    return new Response("Post not found", { status: 404 });
  }

  if (existingPost.userId !== user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  let mediaFileName: string | null = null;

  if (media !== null && media.size > 0) {
    // Supprimer l'ancienne image si elle existe
    if (existingPost.mediaList && existingPost.mediaList.length > 0) {
      const oldImagePath = path.join(publicDir, existingPost.mediaList[0]);
      try {
        await fs.unlink(oldImagePath);
      } catch (error) {
        console.error(
          "Erreur lors de la suppression de l'ancienne image :",
          error
        );
      }
    }

    // Enregistrer la nouvelle image
    const arrayBuffer = await media.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    mediaFileName = `${Date.now()}_${media.name}`;

    await fs.mkdir(publicDir, { recursive: true });
    await fs.writeFile(
      path.join(publicDir, mediaFileName),
      new Uint8Array(buffer)
    );
  }

  // Mettre à jour le post
  const updatedPost = await prisma.post.update({
    where: {
      id: params.id,
    },
    data: {
      content: content,
      mediaList: mediaFileName ? [mediaFileName] : existingPost.mediaList, // Garder l'ancienne image si aucune nouvelle
      userId: user.id,
    },
  });

  return NextResponse.json({ id: updatedPost.id });
}
