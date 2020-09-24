import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';

import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[];
  filteredProducts: any[];
  category: string;
  shoppingCart: any;
  subscription: Subscription;

  constructor(
    private productService: ProductService,
    private cartService: ShoppingCartService,
    route: ActivatedRoute
  ) {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;

      route.queryParamMap.subscribe((params) => {
        this.category = params.get('category');

        this.filteredProducts = this.category
          ? this.products.filter(
              (p) => p.data.productCategory === this.category
            )
          : this.products;
      });
    });
  }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).subscribe(
      (shoppingCart) => {
        this.shoppingCart = shoppingCart;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
