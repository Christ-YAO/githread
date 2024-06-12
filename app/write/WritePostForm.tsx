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
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { z } from "zod";

const Schema = z.object({
  content: z.string().min(1).max(500),
});

export type WritePostFormValues = z.infer<typeof Schema>;

type WritePostFormProps = {
  user: User;
  onSubmit: (value: WritePostFormValues) => Promise<string>;
};

export default function WritePostForm({ user, onSubmit }: WritePostFormProps) {
  const form = useZodForm({
    schema: Schema,
  });
  const router = useRouter();
  return (
    <PostLayout user={user}>
      <Form
        form={form}
        onSubmit={async (values) => {
          const result = await onSubmit(values);
          // router.push("/");
        }}
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <ContentTextArea {...field} />
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
