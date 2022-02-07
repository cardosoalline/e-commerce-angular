import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout/checkout.service';
import { Products } from './products.model';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  listProducts: Products[] = [];
  constructor(private checkoutService: CheckoutService) {}

  ngOnInit(): void {
    this.checkoutService.getListProducts().subscribe((products) => {
      this.listProducts = products;
    });
  }
}
