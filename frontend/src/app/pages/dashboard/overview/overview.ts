import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StudentsComponent } from '../students/students';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth';
import { effect } from '@angular/core';

@Component({
  selector: 'app-overview',
  imports: [StudentsComponent, CommonModule],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class OverviewComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef, // 👈 inject this
  ) {
    // re-fetch stats whenever trigger bumps
    effect(() => {
      this.authService.statsVersion(); // track the signal
      this.loadStats();
    });
  }

  stats: any = {
    total_students: 0,
    active_students: 0,
    inactive_students: 0,
    pending_students: 0,
  };

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.authService.getStats().subscribe({
      next: (res: any) => {
        console.log('STATS API:', res);
        this.stats = res;
        this.cdr.detectChanges(); // 👈 tell Angular to re-check now
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
