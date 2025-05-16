import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
const materialModules = [
  FormsModule,
  CommonModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
];
@Component({
  selector: 'app-login',
  imports: [materialModules, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  router = inject(Router);
  toastr = inject(ToastrService);
  authService = inject(AuthService);
  username: string = '';
  password: string = '';
  error: string = '';
  loginValid: boolean = false;
  login() {
    console.log('Login clicked');
    this.authService
      .login(this.username, this.password)
      .subscribe((success) => {
        if (success) {
          this.toastr.success('Login successful', 'Success');
          this.router.navigate(['/send-money']);
        } else {
          this.toastr.error('Invalid creds', 'Failure');
        }
      });
  }
}
