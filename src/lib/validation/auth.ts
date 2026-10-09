import { z } from "zod";

const email = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "ইমেইল লিখুন")
  .max(254, "ইমেইল অনেক বড় হয়ে গেছে")
  .pipe(z.email("সঠিক ইমেইল ঠিকানা লিখুন"));

const name = z
  .string()
  .trim()
  .min(2, "নাম কমপক্ষে ২ অক্ষরের হতে হবে")
  .max(50, "নাম সর্বোচ্চ ৫০ অক্ষরের হতে পারবে")
  .refine((value) => !/[<>\u0000-\u001f]/.test(value), "নামে অনুমোদিত নয় এমন চিহ্ন আছে");

const newPassword = z
  .string()
  .min(8, "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে")
  .max(128, "পাসওয়ার্ড সর্বোচ্চ ১২৮ অক্ষরের হতে পারবে")
  .refine((value) => /[A-Za-z]/.test(value) && /\d/.test(value), {
    message: "পাসওয়ার্ডে অন্তত একটি ইংরেজি অক্ষর ও একটি সংখ্যা থাকতে হবে",
  });

export const signInSchema = z.object({
  email,
  password: z.string().min(1, "পাসওয়ার্ড লিখুন").max(128, "পাসওয়ার্ড সঠিক নয়"),
});

export const signUpSchema = z.object({ name, email, password: newPassword });

export const signUpFormSchema = signUpSchema
  .extend({ confirmPassword: z.string().min(1, "পাসওয়ার্ড আবার লিখুন") })
  .refine((value) => value.password === value.confirmPassword, {
    message: "পাসওয়ার্ড দুটি মিলছে না",
    path: ["confirmPassword"],
  });

export const updateNameSchema = z.object({ name });

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignUpFormInput = z.infer<typeof signUpFormSchema>;
export type UpdateNameInput = z.infer<typeof updateNameSchema>;

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

/** Returns the first validation message for every failing field. */
export function getFieldErrors<T extends Record<string, unknown>>(
  error: z.ZodError,
): FieldErrors<T> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return errors as FieldErrors<T>;
}
