import { Component, OnInit, OnDestroy } from '@angular/core';

import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getAllProducts()
      .subscribe((products) => {
        this.filteredProducts = this.products = products;
      });
  }

  search(input) {
    this.filteredProducts = input
      ? this.products.filter((p) =>
          p.data.productTitle.toLowerCase().includes(input.toLowerCase())
        )
      : this.products;
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
