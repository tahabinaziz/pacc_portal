import { Component } from '@angular/core';
import { StudentsComponent } from '../students/students';

@Component({
  selector: 'app-overview',
  imports: [StudentsComponent],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class OverviewComponent {}
