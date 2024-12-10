import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/authService';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [RouterModule]
})
export class NavbarComponent {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}
  Logout() {
    this.authService.LogOut();
  }
}
