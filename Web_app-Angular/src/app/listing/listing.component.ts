import { ServiceProduitService } from './../service-produit/service-produit.service';
import { Component, OnInit } from '@angular/core';
import { Produit } from '../model-produit/produit.model';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  // set les services de la classe Produit()
  public constructor(private router: Router, private _produitService: ServiceProduitService){ }
  public produit = new Produit();
  public produits: Produit[] = [];

  ngOnInit() {
    // Commentaire Thibaut : non, à revoir => on en parle au prochain cours
    this._produitService.getProduits().subscribe((produits) => {
      this.produits = produits;
    })
  }

  // défini les conditions de formulaire
  public formulaireProduit = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    texture: new FormControl('', Validators.required),
    grammage: new FormControl('', Validators.required),
    couleur: new FormControl('', Validators.required)
  });

  // set un produit specific après completion du form
  public onSubmit() {
    this.produit = new Produit();
    this.produit.Id = this.produits.length + 1;
    this.produit.Nom = this.formulaireProduit.value.nom!;
    this.produit.Texture = this.formulaireProduit.value.texture!;
    this.produit.Grammage = parseInt(this.formulaireProduit.value.grammage!);
    this.produit.Couleur = this.formulaireProduit.value.couleur!;
    // Commentaire Thibaut :  et le subscribe ?
    this._produitService.createProduit(this.produit);
  }

  // retourne la liste des produits par injection de dépendance de produitServices
  // public getListeProduits() {
  //   return this.produits;
  // }
  public getListeProduits(): Observable<Produit[]> {
    return of(this.produits); // Retourne un Observable contenant la liste des produits
  }

  // fonction de redirection de type routing prenant le nom de la page en entrée
  public goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }
}
