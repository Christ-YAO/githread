import { prisma } from "@/lib/prisma";
import { getUser } from "@/query/user.query";

export async function DELETE(request: Request, { params }: { params: Record<string, string> }) {
  const user = await getUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const post = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
    select: {
      userId: true,
    },
  });

  if (!post) {
    return new Response("Post not found", { status: 404 });
  }

  const userId = post.userId;

  if (userId !== user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  await prisma.post.delete({
    where: {
      id: params.id,
    },
  });
}