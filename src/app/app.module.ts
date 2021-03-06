import { FirebaseService } from './services/firebase.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { OrderService } from './services/order.service';

import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    LogInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    CheckOutComponent,
    ShippingFormComponent,
    OrderSuccessComponent,
    ShoppingCartSummaryComponent,
    MyOrdersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,

    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
  ],
  providers: [
    FirebaseService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
