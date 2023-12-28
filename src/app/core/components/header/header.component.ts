import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '../../../pages/types/user.type';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input({ required: true }) user!: User;
  navList = [
    'Home',
    'TV Shows',
    'News & Popular',
    'My Lists',
    'Browse by Language',
  ];
}
