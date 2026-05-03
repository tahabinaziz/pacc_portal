import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://frv-germany.vercel.app';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/login`,
      { email, password },
      { withCredentials: true }, // ✅ IMPORTANT
    );
  }

  signup(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { name, email, password });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  register(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/students`,
      data,
      { withCredentials: true }, // ✅ IMPORTANT
    );
  }

  getStudents(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/api/students`,
      { withCredentials: true }, // ✅ IMPORTANT
    );
  }

  deleteStudent(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/api/students/${id}`,
      { withCredentials: true }, // ✅ IMPORTANT
    );
  }

  updateStudent(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/students/${id}`, data, {
      withCredentials: true,
    });
  }
  // Save token and user to localStorage
  saveSession(token: string, user: any): void {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Check if logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Logout
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }
}
