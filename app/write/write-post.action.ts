"use server";

import { getUser } from "@/query/user.query";
import { WritePostFormValues } from "./WritePostForm";
import { prisma } from "@/lib/prisma";

export const createPost = async (values: WritePostFormValues) => {
  console.log("I'm on the server !");
  const user = await getUser();

  const post = await prisma.post.create({
    data: {
      content: values.content,
      mediaList: [values?.media?.toString() ?? ""],
      userId: user.id,
    },
  })

  return post.id;
};
