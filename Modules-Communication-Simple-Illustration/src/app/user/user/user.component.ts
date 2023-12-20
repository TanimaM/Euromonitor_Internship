import { Component } from '@angular/core';
import { PaymentDataService } from 'src/app/payment/payment-data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  paymentServiceData: string;

  constructor(private paymentDataService: PaymentDataService) {}

  ngOnInit() {
    this.paymentServiceData = this.paymentDataService.getPaymentDetails();
  }
}
