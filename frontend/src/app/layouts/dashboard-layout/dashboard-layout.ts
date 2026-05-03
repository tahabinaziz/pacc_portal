import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard-layout.html',
})
export class DashboardLayoutComponent {
  user = JSON.parse(localStorage.getItem('user') || '{}');
  userMenuOpen = signal(false);
  menuItems = [
    { label: 'Overview', icon: 'grid', route: '/dashboard' },
    { label: 'Students', icon: 'students', route: '/dashboard/students' },
    { label: 'Registration', icon: 'registration', route: '/dashboard/registration' },
  ];

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}
  toggleUserMenu() {
    this.userMenuOpen.update((v) => !v);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  getInitials(): string {
    return (this.user?.name || 'U')
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase();
  }
}
