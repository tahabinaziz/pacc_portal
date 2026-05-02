import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './dashboard-layout.html',
})
export class DashboardLayoutComponent {
  user = JSON.parse(localStorage.getItem('user') || '{}');

  menuItems = [
    { label: 'Overview', icon: 'grid', route: '/dashboard' },
    { label: 'Students', icon: 'students', route: '/dashboard/student' },
    { label: 'Analytics', icon: 'chart', route: '/dashboard/analytics' },
    { label: 'Users', icon: 'users', route: '/dashboard/users' },
    { label: 'Orders', icon: 'orders', route: '/dashboard/orders' },
    { label: 'Profile', icon: 'profile', route: '/dashboard/profile' },
    { label: 'Settings', icon: 'settings', route: '/dashboard/settings' },
  ];

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

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
