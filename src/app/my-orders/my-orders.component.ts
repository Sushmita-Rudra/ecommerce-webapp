import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  orders$;

  constructor(private orderService: OrderService) {
    this.orders$ = this.orderService.getAllOrders();
  }

  ngOnInit(): void {}
}
