import { z } from "zod";

export const departmentSchema = z.object({
  id: z.number().int(),
  departmentName: z.string().min(1).max(100),
  status: z.number().int().min(0).max(1),
});

export const createDepartmentSchema = departmentSchema.omit({ id: true });
