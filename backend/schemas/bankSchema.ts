import { z } from "zod";

export const bankSchema = z.object({
  id: z.number().int({
    message: "ID must be an integer",
  }),

  bank: z
    .string()
    .min(1, "Bank name is required")
    .max(1000, "Bank name too long"),

  account: z
    .string()
    .min(1, "Account is required")
    .max(100, "Account too long"),

  branch: z.string().min(1, "Branch is required").max(100, "Branch too long"),
});
