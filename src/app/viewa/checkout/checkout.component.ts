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

  //variável iniciando com um objeto vazio para usar two-way binding
  client: any = {};

  constructor(
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //buscando o id form e colocando dentro da variável form
    this.form = document.querySelector('#form');
    //tratando o evento click para evitar o comportamento padão do form
    this.form.addEventListener('click', (event: any) => {
      event.preventDefault();
    });
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
    if (
      this.client.name === undefined ||
      this.client.endereco === undefined ||
      this.client.password === undefined
    ) {
      this.checkoutService.showMessage(
        'Por favor preencha com dados válidos!',
        false
      );
    } else {
      //uso de template litearal com crase para poder interpolar variáveis na string da msg
      this.checkoutService.showMessage(
        `Pagamento realizado com sucesso! Pedido confirmado e será entregue em ${this.client.endereco}.\n ${this.client.name},obrigada por escolher True Love! :D`,
        true
      );
      this.checkoutService.totalPrice = 0;
      this.checkoutService.listSelectProducts = [];
      this.router.navigate(['../list-products']);
    }
    //this.checkoutService.showMessage('Payment', true);
  }
}
