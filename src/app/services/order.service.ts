import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService
  ) {}

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

  getAllOrders() {
    // return this.db.list('/orders');
    return this.db
      .list('/orders')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((action) => {
            const data = action.payload.val();
            console.log('Data', data);
            const key = action.payload.key;
            console.log('Key', key);
            return {
              key,
              data,
            };
          });
        })
      );
  }

  getOrdersByUser(userId: string) {
    // return this.db.list('/orders', {
    //   query: {
    //     orderByChild: 'userId',
    //     equalTo: userId
    //   }
    // });
  }
}
