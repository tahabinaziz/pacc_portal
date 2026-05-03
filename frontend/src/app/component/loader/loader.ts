import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.html',
})
export class LoaderComponent {
  @Input() loading = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
}
