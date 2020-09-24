import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input('product') product;
  @Input('shopping-cart') shoppingCart;
  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }
  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
  getQuantity() {
    if (!this.shoppingCart) {
      return 10;
    }
    let item = this.shoppingCart.items[this.product.key];

    return item ? item.quantity : 0;
  }
}
