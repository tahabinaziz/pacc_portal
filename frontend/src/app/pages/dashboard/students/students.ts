import { Component, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  createAngularTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  SortingState,
} from '@tanstack/angular-table';
import { Student } from '../../../models/students';
import { AuthService } from '../../../services/auth';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-students',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink], // ← NO FlexRenderDirective here
  templateUrl: './students.html',
})
export class StudentsComponent implements OnInit {
  constructor(private authService: AuthService) {}
  showDeleteModal = false;
  selectedStudentId: string | null = null;
  selectedStudent: any = {};
  isEditModal = false;
  status = ['active', 'pending', 'inactive'];
  genders = ['Male', 'Female', 'Other'];

  departments = [
    'Computer Science',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Business Administration',
  ];

  courses = [
    'Bachelor of Science',
    'Master of Science',
    'Bachelor of Arts',
    'Master of Arts',
    'PhD',
    'Diploma',
  ];

  banks = ['HBL', 'UBL', 'Meezan Bank', 'Allied Bank', 'Bank Alfalah', 'MCB Bank', 'National Bank'];

  ngOnInit() {
    this.loadStudents();
  }
  data = signal<Student[]>([]);
  openDeleteModal(id: string) {
    this.selectedStudentId = id;
    this.showDeleteModal = true;
  }
  closeModal() {
    this.showDeleteModal = false;
    this.selectedStudentId = null;
  }
  openEdit(student: any) {
    this.selectedStudent = {
      ...student,
      //gender: student.gender?.toLowerCase(),
      //  status: student.status?.toLowerCase(),
      //  bank: student.bank?.toLowerCase(),
    };

    this.isEditModal = true;
  }
  closeEditModal() {
    this.isEditModal = false;
    this.selectedStudent = null;
  }
  loadStudents() {
    this.authService.getStudents().subscribe({
      next: (res: any) => {
        console.log('STUDENTS API:', res);

        // adjust depending on backend structure
        this.data.set(res || []);
      },

      error: (err) => {
        console.error('Error loading students:', err);
      },
    });
  }

  updateStudent() {
    this.authService.updateStudent(this.selectedStudent.id, this.selectedStudent).subscribe({
      next: () => {
        this.loadStudents(); // refresh table
        this.closeEditModal();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  confirmDelete() {
    if (!this.selectedStudentId) return;

    this.authService.deleteStudent(this.selectedStudentId).subscribe({
      next: () => {
        this.data.set(this.data().filter((s) => s.id !== this.selectedStudentId));
        this.authService.triggerStatsRefresh(); // 👈 notify overview
        this.closeModal();
      },

      error: (err) => {
        console.error('Delete failed:', err);
      },
    });
  }

  sorting = signal<SortingState>([]);
  globalFilter = signal('');

  // Column definitions — just metadata, no FlexRender
  columns: ColumnDef<Student>[] = [
    { accessorKey: 'name', header: 'Name', enableSorting: true },
    { accessorKey: 'student_id', header: 'Student ID', enableSorting: true },
    { accessorKey: 'email', header: 'Email', enableSorting: true },
    { accessorKey: 'course', header: 'Course', enableSorting: true },
    { accessorKey: 'status', header: 'Status', enableSorting: true },
  ];

  table = createAngularTable(() => ({
    data: this.data(),
    columns: this.columns,
    state: {
      sorting: this.sorting(),
      globalFilter: this.globalFilter(),
    },
    onSortingChange: (updater) => {
      const val = typeof updater === 'function' ? updater(this.sorting()) : updater;
      this.sorting.set(val);
    },
    onGlobalFilterChange: (val) => this.globalFilter.set(val),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 6 } },
  }));

  // Helper: get header label string from column def
  getHeaderLabel(header: any): string {
    return header.column.columnDef.header as string;
  }

  // Helper: get cell value as string
  getCellValue(cell: any): string {
    return cell.getValue() as string;
  }

  deleteStudent(id: string) {
    this.data.set(this.data().filter((s) => s.id !== id));
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  getGradeClass(grade: string): string {
    const map: Record<string, string> = {
      A: 'text-green-600',
      B: 'text-blue-600',
      C: 'text-amber-600',
      D: 'text-red-600',
    };
    return map[grade] || '';
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      active: 'bg-green-50 text-green-700',
      inactive: 'bg-red-50 text-red-700',
      pending: 'bg-yellow-50 text-yellow-700',
    };
    return map[status] || '';
  }

  getSortIcon(header: any): string {
    if (!header.column.getCanSort()) return '';
    const sorted = header.column.getIsSorted();
    if (sorted === 'asc') return '↑';
    if (sorted === 'desc') return '↓';
    return '↕';
  }
}
