import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from '../list-products/products.model';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  listSelectedProducts: Products[] = [];
  totalPrice: number = 0;
  disabled: boolean = false;
  hide: boolean = true;
  form: any;

  constructor(
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.totalPrice = this.checkoutService.totalPrice;
    this.listSelectedProducts = this.checkoutService.listSelectProducts;
    this.toggleButton();
  }

  toggleButton() {
    if (this.listSelectedProducts.length == 0) {
      this.disabled = true;
    }
  }

  exclude(product: Products): void {
    this.totalPrice -= product.price;
    this.checkoutService.setProduct(product);
    this.checkoutService.unselectProduct();
    if (this.totalPrice <= 0) {
      this.excludeAll();
    }
  }

  excludeAll() {
    this.checkoutService.totalPrice = 0;
    this.totalPrice = 0;
    this.checkoutService.listSelectProducts = [];
    this.listSelectedProducts = [];
    this.toggleButton();
  }

  cancel(): void {
    this.router.navigate(['../list-products']);
  }

  payment(): void {
    this.checkoutService.showMessage('Payment', true);
    this.router.navigate(['../list-products']);
  }
}
