import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../types/user.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss',
})
export default class BrowseComponent implements OnInit {
  private authService = inject(AuthService);
  user!: User;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser')!);
      this.user = {
        name: loggedInUser.name,
        email: loggedInUser.email,
        profileImg: loggedInUser.picture,
      };
    }
  }

  signOut() {
    this.authService.signOut();
  }
}
