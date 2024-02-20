import { Produit } from './../model-produit/produit.model';
import { Component, OnInit } from '@angular/core';
import { ServiceProduitService } from './../service-produit/service-produit.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.scss']
})
export class DetailProduitComponent implements OnInit{

  // set les services de la classe Produit()
  public constructor(private _route: ActivatedRoute, private _produitService: ServiceProduitService){ }

  ngOnInit() { // Je n'ai pas réussi à utiliser params.get differement
    this._route.paramMap.subscribe(params => {
      const idString = params.get('id');
      const id = idString ? parseInt(idString, 10) : null;

      if (id !== null && !isNaN(id)) {
        // Use the 'id' to retrieve specific product details
        this.updateProduit(id);
      } else {
        console.log('Invalid or missing id parameter.');
      }
    });
  }

  public produit = new Produit();
  // set la valeur conditionnelle d'affichage
  sectionVisible: boolean = false;
  modificationValidee: boolean = false;

  // défini les conditions de formulaire
  public formulaireProduit = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    texture: new FormControl('', Validators.required),
    grammage: new FormControl('', Validators.required),
    couleur: new FormControl('', Validators.required)
  });

  // update un produit specific après modification
  public modifyOnSubmit() {
    const specificProduit = this.findSpecificProduit();
    if (specificProduit) {
      this.produit.Id = specificProduit.Id;
      this.produit.Nom = this.formulaireProduit.value.nom!;
      this.produit.Texture = this.formulaireProduit.value.texture!;
      this.produit.Grammage = parseInt(this.formulaireProduit.value.grammage!);
      this.produit.Couleur = this.formulaireProduit.value.couleur!;
      this._produitService.updateProduit(this.produit.Id, this.produit);
      this.modificationValidee = true;
    } else {
      console.log("Le produit spécifié n'existe pas.");
    }
  }

  // récupère les produits du service
  public getProduits(){
    return this._produitService.getProduits();
  }

  // décide si le fomulaire de modification doit être visible ou non
  public displayForm() {
    this.sectionVisible = true;
  }

  // retourne un object produit qui correspond à l'id recherché dans la liste des produits
  public findSpecificProduit(): Produit | undefined {
    const id = +this._route.snapshot.paramMap.get('id')!;
    return this.produit; // Directly returning the property since it's now updated asynchronously
  }

  private updateProduit(id: number): void {
    this._produitService.getProduits().subscribe((produits) => {
      const specificProduit = produits.find(p => p.Id === id);
      if (specificProduit) {
        this.produit = specificProduit;
      } else {
        console.log("Le produit spécifié n'existe pas.");
      }
    });
  }
}
