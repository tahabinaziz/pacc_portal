import { Component, Input, Output, EventEmitter, signal } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.html',
})
export class DropdownComponent {
  @Input() options: string[] = [];
  @Input() placeholder = 'Select';
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  isOpen = signal(false);

  toggle() {
    this.isOpen.set(!this.isOpen());
  }

  select(option: string) {
    this.value = option;
    this.valueChange.emit(option);
    this.isOpen.set(false);
  }
}
