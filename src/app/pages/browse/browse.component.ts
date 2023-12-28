import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss',
})
export default class BrowseComponent {
  private authService = inject(AuthService);
  name = JSON.parse(sessionStorage.getItem('loggedInUser')!).name;
  email = JSON.parse(sessionStorage.getItem('loggedInUser')!).email;
  userProfileImg = JSON.parse(sessionStorage.getItem('loggedInUser')!).picture;

  signOut() {
    this.authService.signOut();
  }
}
