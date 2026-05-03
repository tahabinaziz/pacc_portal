import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout';
import { OverviewComponent } from './pages/dashboard/overview/overview';
import { StudentsComponent } from './pages/dashboard/students/students';
import { authGuard } from './guards/auth.guard.ts/auth.guard.ts';
import { RegistrationComponent } from './pages/dashboard/registration/registration';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // Anyone can access these
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  // Only logged in users can access this
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [authGuard], // Add AuthGuard here later
    children: [
      { path: '', component: OverviewComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'registration', component: RegistrationComponent },
      // Add more pages here later:
      // { path: 'analytics', component: AnalyticsComponent },
      // { path: 'users', component: UsersComponent },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
