// core angular imports
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// other application-specific imports
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'EmpowerHR';
}
