import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from '../checkout/checkout.service';
import { Products } from './products.model';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  listProducts: Products[] = [];
  listSelectedProducts!: number;
  hidden = false;

  constructor(
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkoutService.getListProducts().subscribe((products) => {
      this.listProducts = products;
    });
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  toggleCount() {
    return (this.listSelectedProducts =
      this.checkoutService.listSelectProducts.length);
  }

  //se clicar no checkout vai navegar para a tela de checkout
  toCheckout(): void {
    this.router.navigate(['../checkout']);
  }
}
