import { z } from "zod";

const matchMessage = "Passwords do not match";
const requiredMessage = "This field is required!";
const minMessage = "Password must be at least 6 characters";

export const RegisterFormSchema = z
  .object({
    firstName: z.string().trim().min(2, { message: requiredMessage }),
    lastName: z.string().trim().min(2, { message: requiredMessage }),
    email: z.string().trim().email({ message: requiredMessage }),
    password: z.string().trim().min(6, { message: minMessage }),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: matchMessage,
    path: ["confirmPassword"],
  });

export const SignInFormSchema = z.object({
  email: z.string().trim().email({ message: requiredMessage }),
  password: z.string().trim().min(6, { message: minMessage }),
});
