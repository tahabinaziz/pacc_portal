import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout';
import { OverviewComponent } from './pages/dashboard/overview/overview';
import { StudentsComponent } from './pages/dashboard/student/student';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  // Dashboard with nested routes
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: OverviewComponent },
      { path: 'student', component: StudentsComponent },
      // Add more pages here later:
      // { path: 'analytics', component: AnalyticsComponent },
      // { path: 'users', component: UsersComponent },
    ],
  },
];
