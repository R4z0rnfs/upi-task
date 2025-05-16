import {
  afterNextRender,
  Component,
  inject,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { SendMoneyComponent } from '../../payment/send-money/send-money.component';
import { AuthService } from '../../services/auth.service';
const materialModules = [
  FormsModule,
  CommonModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  TextFieldModule,
];
@Component({
  selector: 'app-pay-dialog',
  imports: [materialModules, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './pay-dialog.component.html',
  styleUrl: './pay-dialog.component.css',
})
export class PayDialogComponent implements OnInit {
  constructor(public router: Router) {}
  private _injector = inject(Injector);
  private toastr = inject(ToastrService);
  private authService = inject(AuthService);
  @ViewChild('autosize') autosize: CdkTextareaAutosize | any;
  triggerResize() {
    afterNextRender(
      () => {
        this.autosize.resizeToFitContent(true);
      },
      {
        injector: this._injector,
      }
    );
  }
  upiId: string = '';
  amount: number = 0;
  notes: string = '';
  fontSize: number = 8;
  currentUpiId: string = '';
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      console.log('Navigation:', window.history.state);
      this.currentUpiId = window.history.state.objectKey.active_upi;
      console.log('Current UPI ID:', this.currentUpiId);
      this.upiId = this.currentUpiId;
    }
  }

  sendMoney() {
    if (this.upiId && this.amount) {
      const datePipe = new DatePipe('en-US');
      const formattedDate = datePipe.transform(new Date(), 'yyyy-MM-dd');

      const transactionData = {
        date: formattedDate,
        amount: this.amount,
        recipientUpi: this.upiId,
        status: 'Success',
      };

      this.authService.sendMoneyToServer(transactionData).subscribe({
        next: () => {
          this.toastr.success('Payment initiated', 'Success');
          this.router.navigate(['/send-money']);
        },
        error: (err) => {
          this.toastr.error('Payment failed', 'Error');
          console.error('Send money error:', err);
        },
      });
    } else {
      this.toastr.error('UPI ID and amount are required', 'Validation Error');
    }
  }
}
