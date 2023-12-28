import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../types/user.type';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BannerComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss',
})
export default class BrowseComponent implements OnInit {
  private authService = inject(AuthService);
  user!: User;

  ngOnInit(): void {
    if (typeof window !== undefined) {
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
