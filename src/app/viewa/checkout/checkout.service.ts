import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../list-products/products.model';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  //requisições public para poder usar em outros components
  public baseUrl: string = 'http://localhost:3000';

  public listProducts: Products[] = [];

  public totalPrice: number = 0;

  //variável privada inicia com _ por convençao
  private _priceHandler: number = 0;

  //metodos acessores do pricehandler
  getPrice(): number {
    return this._priceHandler;
  }

  setPrice(value: number): void {
    this._priceHandler = value;
  }

  //calculo do valor de produtos escolhidos
  selectProduct() {
    this.totalPrice += this.getPrice();
  }

  //retirada dos produto do carrinho
  unselectProduct() {
    this.totalPrice -= this.getPrice();
    if (this.totalPrice < 0) {
      this.totalPrice = 0;
    }
  }
  constructor(private httpClient: HttpClient) {}

  //função para

  getListProducts(): Observable<Products[]> {
    return this.httpClient.get<Products[]>(this.baseUrl + '/products');
  }
}
