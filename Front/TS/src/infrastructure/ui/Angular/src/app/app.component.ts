import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FriendsModule } from './friends/friends.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FriendsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular';
}
