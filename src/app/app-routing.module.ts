import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { CaddiesComponent } from './caddies/caddies.component';


const routes: Routes = [
  {path:"products/:p1/:p2",component:ProductsComponent},
  {path:"",redirectTo:'products/1/0',pathMatch:'full'},
  {path:"login",component:LoginComponent},
  {path:"details-product/:url",component:DetailProductComponent},
  {path:"caddies",component:CaddiesComponent},
];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
