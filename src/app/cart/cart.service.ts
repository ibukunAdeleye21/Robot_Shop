import { Injectable } from '@angular/core';
import { IProduct } from '../catalog/product.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cart: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);

  constructor(private http: HttpClient) {
    this.http.get<IProduct[]>('/api/cart').subscribe({
      next: (cart) => this.cart.next(cart),
    });
  }

  getCart(): Observable<IProduct[]> {
    return this.cart.asObservable();
  }

  add(product: IProduct) {
    const newCart = [...this.cart.getValue(), product];
    this.cart.next(newCart);
    this.http.post('/api/cart', newCart).subscribe(() => {
      console.log('added ' + product.name + ' to cart!');
    });
  }

  remove(product: IProduct) {
    let newCart = this.cart.getValue().filter((i) => i !== product);
    this.cart.next(newCart);
    this.http.post('/api/cart', newCart).subscribe(() => {
      console.log('removed ' + product.name + ' from cart!');
    });
  }

  // getTotalPrice() {
  //   return(
  //     Math.round(
  //       this.cart.reduce<number>((prev, cur) => {
  //         return (
  //           prev + cur.qty * (cur.product.price * (1 - cur.product.discount))
  //         );
  //       }, 0) * 100
  //     ) / 100
  //   );
  // }

  // findLineItem(product: IProduct) {
  //   return this.cart.find((li) => li.product.id === product.id);
  // }


  // add(product: IProduct) {
  //   let lineItem = this.findLineItem(product);
  //   if (lineItem !== undefined) {
  //     lineItem.qty++;
  //   } else {
  //     lineItem = { product: product, qty: 1};
  //     this.cart.push(lineItem);
  //   }

  //   console.log('added ' + product.name + 'to cart!');
  //   console.log('Total Price: $' + this.getTotalPrice());
    // this.cart.push(product);
    // console.log(`product ${product.name} added to cart`);
  //}
    
}
