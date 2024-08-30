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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Schema = z.object({
  content: z.string().min(1).max(500),
  media: z.instanceof(File).optional(),
  mediaList: z.array(z.instanceof(File).refine((file) => file.type.startsWith('image/'), 'Must be an image file')).default([]),
});

export type WritePostFormValues = z.infer<typeof Schema>;

type WritePostFormProps = {
  user: User;
  // onSubmit: (value: WritePostFormValues) => Promise<string>;
};

export default function WritePostForm({ user }: WritePostFormProps) {

  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      content: "",
      media: new File([], ""),
      mediaList: [],
    },
  })
  const router = useRouter();

  const onSubmit = async (values: WritePostFormValues) => {
    console.log("Submit client side", values);

    const formData = new FormData();
    formData.append("content", values.content);
    if (values.media) {
      formData.append("media", values.media);
    }

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Submit server side", result);

      router.push(`/posts/${result.id}`);
      // router.refresh();
      // window.location.reload();
    } else {
      console.error("Failed to submit post");
    }
  };

  return (
    <PostLayout user={user}>
      <Form
        form={form}
        onSubmit={form.handleSubmit(onSubmit)
        }
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

        <FormField
          control={form.control}
          name="media"
          render={({ field }) => (
            <FormItem>
              <Input type="file" onChange={(e) => {
                const file = (e.target as HTMLInputElement)?.files?.[0];
                form.setValue('media', file)
              }}
                className="cursor-pointer mb-2 font-light" />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full justify-end">
          <Button size={"sm"}>Post</Button>
        </div>
      </Form>
    </PostLayout>
  );
}
