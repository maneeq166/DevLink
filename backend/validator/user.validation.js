import z from "zod";

export const signUpSchema = z
  .object({
    username: z.string().min(3, {
      message: "Username needs to be at least 3 characters",
    }),
    password: z.string().min(4, {
      message: "Password needs to be at least 4 characters",
    }),
    email: z.email({
      message: "Invalid email format",
    }),
  })
  .strict();

export const signInSchema = z
  .object({
    email: z.email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters" }),
  })
  .strict();
