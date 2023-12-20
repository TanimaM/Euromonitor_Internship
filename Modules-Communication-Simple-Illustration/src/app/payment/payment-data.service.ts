import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentDataService {
getPaymentDetails(): string {
    return 'Payment details from the Payment Module Service';
  }
}
