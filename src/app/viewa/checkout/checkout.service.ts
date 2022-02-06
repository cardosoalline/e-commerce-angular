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

  constructor(private httpClient: HttpClient) {}

  //função para

  getListProducts(): Observable<Products[]> {
    return this.httpClient.get<Products[]>(this.baseUrl + '/products');
  }
}
