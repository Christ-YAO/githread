"use server";

import { getUser } from "@/query/user.query";
import { prisma } from "@/lib/prisma";
import { WritePostFormValues } from "../../../write/WritePostForm";
import { revalidatePath } from "next/cache";

export const createReply = async (
  postId: string,
  values: WritePostFormValues
) => {
  console.log("I'm on the server !");
  const user = await getUser();

  const post = await prisma.post.create({
    data: {
      content: values.content,
      userId: user.id,
      parentId: postId,
    },
  });

//   await new Promise((resolve) => setTimeout(resolve, 1000));

  revalidatePath(`/posts/${postId}`);

  return postId;
};
