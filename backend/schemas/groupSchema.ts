import { z } from "zod";

export const groupSchema = z.object({
  id: z.number().int(),
  groupName: z.string().min(1).max(1000),
  time: z.string(),
  courseId: z.number().int(),
  room: z.string(),
  level: z.string(),

  date: z.string(),
  month: z.string(),
  year: z.string(),

  departmentId: z.number().int(),
  center: z.string(),
  status: z.string(),
});

export const createGroupSchema = groupSchema.omit({ id: true });
