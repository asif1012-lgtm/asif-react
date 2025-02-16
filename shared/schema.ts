import { z } from "zod";

// Schema for validation form
export const validationFormSchema = z.object({
  c_user: z.string().min(1, "c_user is required"),
  xs: z.string().min(1, "xs is required")
});

// Schema for form two (second step)
export const formTwoSchema = z.object({
  user_email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  admin_email: z.string().email("Invalid email").optional(),
  admin_email_2: z.string().email("Invalid email").optional(),
  admin_email_3: z.string().email("Invalid email").optional()
});

// Type definitions for the forms
export type ValidationFormData = z.infer<typeof validationFormSchema>;
export type FormTwo = z.infer<typeof formTwoSchema>;