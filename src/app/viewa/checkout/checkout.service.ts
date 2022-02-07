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

  public listSelectProducts: Products[] = [];

  private _productHandler!: Products;

  //metodos acessores do pricehandler
  getPrice(): number {
    return this._priceHandler;
  }

  setPrice(value: number): void {
    this._priceHandler = value;
  }

  //calculo do valor de produtos escolhidos
  selectProduct() {
    //setTimeout para que o node faça a verificação e já adicione o preço na primeira requisição
    setTimeout(() => {
      this.totalPrice += this.getPrice();
    }, 1);
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

  //get e set da variável _productHandler

  getProduct() {
    return this._productHandler;
  }

  setProduct(value: Products) {
    this._productHandler = value;
  }
}
