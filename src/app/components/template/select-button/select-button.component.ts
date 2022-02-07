import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/viewa/checkout/checkout.service';

@Component({
  selector: 'app-select-button',
  templateUrl: './select-button.component.html',
  styleUrls: ['./select-button.component.css'],
})
export class SelectButtonComponent implements OnInit {
  public disabled: boolean = false;
  constructor(private checkoutService: CheckoutService) {}

  ngOnInit(): void {}

  selectProduct() {
    this.disabled = true;
    this.checkoutService.selectProduct();
  }

  unselectProduct() {
    this.disabled = false;
    this.checkoutService.unselectProduct();
  }
}
