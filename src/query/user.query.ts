import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { postSelectQuery } from "./post.query";
import { cache } from "react";
import { redirect } from "next/navigation";

const userQuery = {
  id: true,
  name: true,
  username: true,
  image: true,
  bio: true,
  createdAt: true,
  link: true,
} satisfies Prisma.UserSelect;

export const getUser = async () => {
  const session = await getAuthSession();

  if (!session?.user.id) {
    throw new Error("User not found");
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: session.user.id,
    },
  });

  return user;
};

// le cache qu'on le fetch une seul fois par défaut ça se fait 2 fois

export const getUserProfile = cache(async (userId: string) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      ...userQuery,
      _count: {
        select: {
          followeds: true,
          likes: true,
        },
      },
      posts: {
        select: postSelectQuery(userId),
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
      },
      followeds: {
        select: {
          follower: {
            select: {
              id: true,
              username: true,
              image: true,
            },
          },
        },
        take: 3,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
});

export const getUserEdit = async () => {
  const session = await getAuthSession();

  if (!session) {
    redirect("/");
  }
  return prisma.user.findUniqueOrThrow({
    where: {
      id: session.user.id,
    },
    select: userQuery,
  });
};

export type UserProfile = NonNullable<
  Prisma.PromiseReturnType<typeof getUserProfile>
>;

export type UserEdit = NonNullable<
  Prisma.PromiseReturnType<typeof getUserEdit>
>;
