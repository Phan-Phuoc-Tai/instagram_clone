import { FORM_LOGIN } from "../constants/auth.constant";
import z from "zod";
const ZOD_ERRORS = FORM_LOGIN.ZOD_ERRORS;
export const loginSchema = z.object({
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
    message: ZOD_ERRORS.PASSWORD,
  }),
});
