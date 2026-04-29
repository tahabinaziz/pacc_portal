import { z } from "zod";

export const courseSchema = z.object({
  id: z.number().int(),
  course: z.string().min(1).max(1000),
  departmentId: z.number().int(),
  month: z.string(),
  year: z.string(),
  status: z.string(),
});

export const createCourseSchema = courseSchema.omit({ id: true });

export const courseDetailSchema = z.object({
  id: z.number().int(),
  courseId: z.number().int(),

  admission: z.number(),
  tuitionFee: z.number(),
  textBook: z.number(),
  workBook: z.number(),

  feeDiscount: z.number(),
  promo: z.number(),
  bookDiscount: z.number(),

  total: z.number(),
});

export const createCourseDetailSchema = courseDetailSchema.omit({ id: true });
