import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
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
      this.listSelectProducts.push(this.getProduct()); //ao selecionar o card, ele pega o list e joga dentro do array o retorno do getproduct
    }, 1);
    console.log(this.listSelectProducts);
  }

  //retirada dos produto do carrinho
  unselectProduct() {
    this.totalPrice -= this.getPrice();
    if (this.totalPrice < 0) {
      this.totalPrice = 0;
    }
    let index = this.listSelectProducts.indexOf(this.getProduct()); //para percorrer o array

    //se true ele vai garantir que o produto selecionado é o q será retirado do array
    if (
      index > -1 ||
      index === this.listSelectProducts.indexOf(this.getProduct())
    ) {
      this.listSelectProducts.splice(index, 1);
      //splice() altera o conteúdo de uma lista, adicionando novos elementos enquanto remove elementos antigos
    }
    console.log(this.listSelectProducts);
  }
  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'close', {
      duration: 10000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['success'] : ['error'],
    });
  }

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
