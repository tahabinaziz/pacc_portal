import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from '../../../component/dropdown/dropdown';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, DropdownComponent, CommonModule],
  templateUrl: './registration.html',
})
export class RegistrationComponent {
  constructor(private authService: AuthService) {}
  submitted = false;

  form: any = {
    name: '',
    student_id: '',
    fh_name: '',
    email: '',
    gender: '',
    phone: '',
    department: '',
    course: '',
    amount: '',
    bank: '',
    status: '',
  };
  status = ['active', 'pending', 'inactive'];
  genders = ['Male', 'Female', 'Other'];

  center = ['KMB', 'LHR', 'HYD'];

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

  generatestudent_id() {
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    this.form.student_id = `REG/${random}/${year}`;
  }

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  onSubmit() {
    this.isLoading = true;
    this.submitted = false;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.form).subscribe({
      next: (res: any) => {
        this.isLoading = false;

        this.successMessage = 'Registration successful 🎉';
        this.resetFormFields();
      },

      error: (err) => {
        this.isLoading = false;
        this.submitted = false;
        this.errorMessage = err?.error?.message || 'Server error — try again';
      },
    });
  }

  // Resets only the form fields
  resetFormFields() {
    this.form = {
      name: '',
      student_id: '',
      fh_name: '',
      email: '',
      gender: '',
      phone: '',
      department: '',
      course: '',
      amount: '',
      bank: '',
      status: '',
    };
  }
}
