export interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  course: string;
  status: 'active' | 'inactive' | 'pending';
  phone?: string;
  enrolledDate?: string;
}
