import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();

    return this.db
      .object('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(map(({ items }) => new ShoppingCart(items)));
  }

  async addToCart(product) {
    this.updateItemQuantity(product, 1);
  }
  async removeFromCart(product) {
    this.updateItemQuantity(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private createCart() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      let response = await this.createCart();
      localStorage.setItem('cartId', response.key);

      return response.key;
    }
    return cartId;
  }

  private async updateItemQuantity(product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);

    item$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((item) => {
        if (item.payload.exists()) {
          let quantity = item.payload.exportVal().quantity + change;
          if (quantity === 0) {
            item$.remove();
          } else {
            item$.update({
              quantity: item.payload.exportVal().quantity + change,
            });
          }
        } else {
          item$.update({
            product: product,
            quantity: 1,
          });
        }
      });
  }
}
