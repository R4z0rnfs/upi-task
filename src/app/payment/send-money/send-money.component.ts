import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatIcon, MatIconModule } from '@angular/material/icon';
const materialModules = [
  FormsModule,
  CommonModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatIcon,
];
interface UpiEntry {
  Hashkey: string;
  name: string;
  active_upi: string;
}
@Component({
  selector: 'app-send-money',
  imports: [ReactiveFormsModule, materialModules],
  templateUrl: './send-money.component.html',
  styleUrl: './send-money.component.css',
})
export class SendMoneyComponent {
  upiForm!: FormGroup;
  validateList: UpiEntry[] = [];
  authService = inject(AuthService);
  toastr = inject(ToastrService);
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.upiForm = this.fb.group({
      upiId: [
        '',
        [Validators.required, Validators.pattern(/^[\w.-]+@[\w.-]+$/)],
      ],
    });
  }

  get upiId() {
    return this.upiForm.get('upiId');
  }

  onSubmit(type: string) {
    if (type === 'api') {
      if (!this.upiForm.valid) {
        this.upiForm.markAllAsTouched();
        return;
      }
      this.authService.validateResponse().subscribe((response: any) => {
        this.validateList = response;
        console.log('API Response:', this.validateList);
        const userUpiId = this.upiForm.value.upiId;
        const upiDataToValidate = this.validateList.find(
          (item) => item.active_upi === userUpiId
        );
        console.log('UPI Data to Validate:', upiDataToValidate);
        if (upiDataToValidate) {
          this.toastr.success('Validation successful');
          this.router.navigate(['/pay-dialog'], {
            state: { objectKey: upiDataToValidate },
          });
        } else {
          this.toastr.error('UPI ID not found in the Database');
        }
      });
    } else if (type === 'regex') {
      if (!this.upiForm.valid) {
        this.upiForm.markAllAsTouched();
        return;
      }
      if (this.upiId?.valid) {
        this.toastr.success('Click on the API Validation', 'Valid UPI ID');
      } else {
        this.toastr.error('Invalid Regex Pattern');
      }
    } else if (type === 'history') {
      this.router.navigate(['/transactions']);
    }
  }

  onClose() {
    this.router.navigate(['/login']);
  }
}
