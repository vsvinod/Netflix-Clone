import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { User } from '../../../pages/types/user.type';
import { AuthService } from '../../../shared/services/auth.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class HeaderComponent {
  @Input({ required: true }) user!: User;
  private authService = inject(AuthService);
  navList = [
    'Home',
    'TV Shows',
    'News & Popular',
    'My Lists',
    'Browse by Language',
  ];

  signOut() {
    this.authService.signOut();
  }
}
