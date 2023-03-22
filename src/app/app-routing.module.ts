import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AuthGuardService } from './auth-guard.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { SellerDashComponent } from './seller-dash/seller-dash.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "", redirectTo: "home", pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "products", component: ProductsComponent },
  { path: "register", component: RegisterComponent },
  { path: "product/:id", component: ProductPageComponent },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: "search", component: SearchPageComponent },
  { path: "seller", component: SellerDashComponent, canActivate: [AuthGuardService] },
  { path: "seller/add", component: AddProductComponent, canActivate: [AuthGuardService] },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
