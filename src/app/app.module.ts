import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgbCarouselConfig, NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptTokenService } from './intercept-token.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CarouselComponent } from './carousel/carousel.component';
import { PagingComponent } from './paging/paging.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductReviewComponent } from './product-review/product-review.component';
import { SearchButtonComponent } from './search-button/search-button.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { SellerDashComponent } from './seller-dash/seller-dash.component';
import { AddProductComponent } from './add-product/add-product.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { FormErrorComponent } from './form-error/form-error.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { ChartComponent } from './chart/chart.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { PaymentConfirmationComponent } from './payment-confirmation/payment-confirmation.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    PageNotFoundComponent,
    RegisterComponent,
    ProductCardComponent,
    CarouselComponent,
    PagingComponent,
    ProductPageComponent,
    ProductsComponent,
    CategoryComponent,
    CategoryCardComponent,
    ProductReviewComponent,
    SearchButtonComponent,
    SearchPageComponent,
    SellerDashComponent,
    AddProductComponent,
    CheckoutPageComponent,
    FormErrorComponent,
    FormFieldComponent,
    ChartComponent,
    PaymentPageComponent,
    PaymentConfirmationComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    NgbCarouselModule,
    NgxPaginationModule,
    

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptTokenService,
      multi: true
    },
    NgbCarouselConfig,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
