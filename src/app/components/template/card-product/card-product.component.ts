import { CheckoutService } from './../../../viewa/checkout/checkout.service';
import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/viewa/list-products/products.model';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css'],
})
export class CardProductComponent implements OnInit {
  listProducts: Products[] = [];

  constructor(private checkoutService: CheckoutService) {}

  ngOnInit(): void {
    this.checkoutService.getListProducts().subscribe((products) => {
      this.listProducts = products;
      console.log(this.listProducts);
    });
  }
}
