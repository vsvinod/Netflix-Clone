declare var google: any;
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent implements OnInit {
  private router = inject(Router);
  ngOnInit(): void {
    //Reference for Google Authentication
    //https://developers.google.com/identity/gsi/web/guides/client-library
    //https://console.cloud.google.com/?pli=1 : client -Identity
    google.accounts.id.initialize({
      client_id:
        '1093074276626-4hjqc44dgkrlk8g2ofvndpdl8i5pc8lf.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp),
    });
    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 350,
    });
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleLogin(response: any) {
    if (response) {
      const payLoad = this.decodeToken(response.credential);
      sessionStorage.setItem('loggedInUser', JSON.stringify(payLoad));
      this.router.navigate(['/browse']);
      // setTimeout(() => {
      //   location.reload();
      // }, 100);
    }
  }
}
