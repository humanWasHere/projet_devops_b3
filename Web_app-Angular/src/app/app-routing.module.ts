import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListingComponent } from './listing/listing.component';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'listing', component: ListingComponent },
  { path: 'detail-produit/:id', component: DetailProduitComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
