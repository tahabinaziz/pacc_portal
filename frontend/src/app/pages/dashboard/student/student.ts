import { Component, signal } from '@angular/core';
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
import { Student } from '../../../models/student';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [FormsModule], // ← NO FlexRenderDirective here
  templateUrl: './student.html',
})
export class StudentsComponent {
  data = signal<Student[]>([
    {
      id: 'STU-001',
      name: 'Taha Bin Aziz',
      email: 'taha@example.com',
      grade: 'A',
      course: 'Computer Science',
      status: 'active',
    },
    {
      id: 'STU-002',
      name: 'Sara Ahmed',
      email: 'sara@example.com',
      grade: 'B',
      course: 'Mathematics',
      status: 'active',
    },
    {
      id: 'STU-003',
      name: 'Ali Hassan',
      email: 'ali@example.com',
      grade: 'A',
      course: 'Physics',
      status: 'pending',
    },
    {
      id: 'STU-004',
      name: 'Maria Khan',
      email: 'maria@example.com',
      grade: 'C',
      course: 'Chemistry',
      status: 'active',
    },
    {
      id: 'STU-005',
      name: 'Omar Farooq',
      email: 'omar@example.com',
      grade: 'B',
      course: 'Computer Science',
      status: 'inactive',
    },
    {
      id: 'STU-006',
      name: 'Fatima Malik',
      email: 'fatima@example.com',
      grade: 'A',
      course: 'Biology',
      status: 'active',
    },
    {
      id: 'STU-007',
      name: 'Yusuf Raza',
      email: 'yusuf@example.com',
      grade: 'D',
      course: 'Mathematics',
      status: 'pending',
    },
    {
      id: 'STU-008',
      name: 'Aisha Noor',
      email: 'aisha@example.com',
      grade: 'B',
      course: 'Physics',
      status: 'active',
    },
    {
      id: 'STU-009',
      name: 'Bilal Sheikh',
      email: 'bilal@example.com',
      grade: 'A',
      course: 'Chemistry',
      status: 'active',
    },
    {
      id: 'STU-010',
      name: 'Zara Qureshi',
      email: 'zara@example.com',
      grade: 'C',
      course: 'Biology',
      status: 'inactive',
    },
  ]);

  sorting = signal<SortingState>([]);
  globalFilter = signal('');

  // Column definitions — just metadata, no FlexRender
  columns: ColumnDef<Student>[] = [
    { accessorKey: 'name', header: 'Name', enableSorting: true },
    { accessorKey: 'id', header: 'Student ID', enableSorting: true },
    { accessorKey: 'email', header: 'Email', enableSorting: true },
    { accessorKey: 'grade', header: 'Grade', enableSorting: true },
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
