"use server";

import { WritePostFormValues } from "./WritePostForm";

export const createPost = async (values: WritePostFormValues) => {
  console.log("I'm on the server !");
  return "";
};
