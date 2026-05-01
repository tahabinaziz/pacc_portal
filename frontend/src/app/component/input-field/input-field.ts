import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.html',
  standalone: true,
  imports: [FormsModule],
})
export class InputFieldComponent {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() value = '';

  @Output() valueChange = new EventEmitter<string>();
}
