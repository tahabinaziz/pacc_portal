import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  standalone: true,
  imports: [CommonModule], // ✅ FIX HERE
})
export class CardComponent {
  @Input() title = '';
  @Input() description = '';
  flag = 'assets/flag.png';
}
