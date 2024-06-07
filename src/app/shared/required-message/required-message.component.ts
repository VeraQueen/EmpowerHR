import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-required-message',
  standalone: true,
  imports: [NgIf],
  template: `<span
    *ngIf="control && control.invalid && control.touched"
    class="text-red-700 text-xs"
    >{{ message }}</span
  >`,
})
export class RequiredMessageComponent {
  @Input() control!: AbstractControl<any, any> | null | undefined;
  @Input() message: string = 'Required!';
}
