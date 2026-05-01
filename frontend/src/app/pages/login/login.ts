import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CardComponent } from '../../component/card/card';
import { InputFieldComponent } from '../../component/input-field/input-field';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  imports: [CommonModule, FormsModule, CardComponent, InputFieldComponent],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    this.errorMessage = '';

    this.authService.login(this.email.toLowerCase(), this.password).subscribe({
      next: (res: any) => {
        if (res?.user) {
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = res?.error || 'Login failed';
        }
      },
      error: () => {
        this.errorMessage = 'Something went wrong — please try again.';
      },
    });
  }
}
