import { FORM_REGISTER } from "@/constants/auth.constant";
import z from "zod";
const ZOD_ERRORS = FORM_REGISTER.ZOD_ERRORS;
export const registerSchema = z
  .object({
    fullName: z.string().trim().min(1, {
      message: ZOD_ERRORS.FULL_NAME,
    }),
    username: z.string().trim().min(1, {
      message: ZOD_ERRORS.USERNAME,
    }),
    email: z
      .string()
      .trim()
      .min(1, {
        message: ZOD_ERRORS.EMAIL.REQUIRED,
      })
      .pipe(
        z.email({
          message: ZOD_ERRORS.EMAIL.INVALID,
        }),
      ),
    password: z.string().min(6, {
      message: ZOD_ERRORS.PASSWORD.REQUIRED(),
    }),
    confirmPassword: z.string().trim().min(1, {
      message: ZOD_ERRORS.CONFIRM_PASSWORD.REQUIRED,
    }),
  })
  .superRefine(({ password, confirmPassword }, context) => {
    const errors: string[] = [];
    if (!/[A-Z]/.test(password)) {
      errors.push(ZOD_ERRORS.PASSWORD.NOT_UPPERCASE);
    }
    if (!/[a-z]/.test(password)) {
      errors.push(ZOD_ERRORS.PASSWORD.NOT_LOWERCASE);
    }
    if (!/[0-9]/.test(password)) {
      errors.push(ZOD_ERRORS.PASSWORD.NOT_NUMBER);
    }
    if (errors.length) {
      context.addIssue({
        code: "custom",
        path: ["password"],
        message: `${ZOD_ERRORS.PASSWORD.REQUIRED(false)} ${errors.join(", ")}`,
      });
    }
    if (password !== confirmPassword) {
      context.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: ZOD_ERRORS.CONFIRM_PASSWORD.NOT_MATCH,
      });
    }
  });
