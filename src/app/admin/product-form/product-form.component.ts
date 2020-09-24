import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: any;
  id;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = this.categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService
        .getProduct(this.id)
        .pipe(take(1))
        .subscribe((resProduct) => {
          this.product = resProduct;
          console.log(this.product);
        });
    }
  }

  ngOnInit(): void {}

  saveProduct(product) {
    if (this.id) {
      console.log('Product info:', product);
      this.productService.updateProduct(this.id, product);
    } else {
      this.productService.createProduct(product);
    }

    this.router.navigate(['admin/products']);
  }

  deleteProduct() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(this.id);
      this.router.navigate(['admin/products']);
    }
  }
}
