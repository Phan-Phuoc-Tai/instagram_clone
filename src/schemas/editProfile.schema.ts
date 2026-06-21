import z from "zod";

export const editProfileSchema = z.object({
  fullName: z.string().trim().optional(),
  bio: z.string().trim().optional(),
  website: z.string().trim().optional(),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).optional(),
});
