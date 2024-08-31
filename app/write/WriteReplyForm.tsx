"use client";

import { ContentTextArea } from "@/components/features/post/ContentTextArea";
import PostLayout from "@/components/features/post/PostLayout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Schema = z.object({
  content: z.string().min(1).max(500),
  media: z.instanceof(File).refine((file) => file.type.startsWith('image/'), 'Must be an image file').optional(),
  mediaList: z.array(z.instanceof(File).refine((file) => file.type.startsWith('image/'), 'Must be an image file')).default([]),
});

export type WritePostFormValues = z.infer<typeof Schema>;

type WritePostFormProps = {
  user: User;
  onSubmit: (value: WritePostFormValues) => Promise<string>;
};

export default function WriteReplyForm({ user, onSubmit }: WritePostFormProps) {

  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      content: "",
      mediaList: [],
    },
  })
  const router = useRouter();

  return (
    <PostLayout user={user}>
      <Form
        form={form}
        onSubmit={async (values) => {
            const postId = await onSubmit(values);
            if (postId) {
              window.location.href = `${window.location.origin}/posts/${postId}`;
              router.push(`/posts/${postId}`);
              router.refresh();
            }
          }}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <ContentTextArea {...field} className="font-light" />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full justify-end">
          <Button size={"sm"}>Reply</Button>
        </div>
      </Form>
    </PostLayout>
  );
}
