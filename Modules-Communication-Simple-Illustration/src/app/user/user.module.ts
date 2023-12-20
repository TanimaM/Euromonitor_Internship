import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { PaymentModule } from '../payment/payment.module';


@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule, PaymentModule
  ],
  exports:[UserComponent]
})
export class UserModule { }
