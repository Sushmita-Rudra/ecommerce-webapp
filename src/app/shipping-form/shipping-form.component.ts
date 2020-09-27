import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { FirebaseService } from './../services/firebase.service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { Order } from '../models/order';
import { Subscription } from 'rxjs';
// import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css'],
})
export class ShippingFormComponent implements OnInit {
  @Input('cart') cart: ShoppingCart;
  shipping: any = {};
  userSubscription: Subscription;
  userId: string;

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.userSubscription = this.firebaseService.user$.subscribe(
      (user) => (this.userId = user.uid)
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success/', result.key]);
  }
}
