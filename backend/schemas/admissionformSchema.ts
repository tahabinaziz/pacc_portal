import { z } from "zod";

export const admissionFormSchema = z.object({
  id: z.number().int(),

  prnNo: z.string(),
  name: z.string(),
  fhName: z.string(),

  dob: z.string(), // ideally Date in backend
  address: z.string(),
  town: z.string(),

  mStatus: z.string(),
  cnic: z.string(),
  occupation: z.string(),
  nationality: z.string(),

  cellNo: z.string(),
  email: z.string(),
  gender: z.string(),

  date: z.string(),

  courseId: z.number().int(),
  groupId: z.number().int(),
  departmentId: z.number().int(),

  amount: z.number().or(z.string()),
  feeReceipt: z.string(),
  bank: z.string(),

  user: z.string(),
  status: z.string(),

  education: z.string(),
  otherIdentification: z.string(),

  emergencyNumber: z.string(),
  passport: z.string(),

  dod: z.string(),

  remarks: z.string(),
  pacc: z.string(),
  phone: z.string(),
  center: z.string(),

  discount: z.number().or(z.string()),

  pTime: z.string(),
  pTime2: z.string(),

  adFee: z.number().or(z.string()),
  bookDiscount: z.number().or(z.string()),
});

export const createAdmissionFormSchema = admissionFormSchema.omit({ id: true });
