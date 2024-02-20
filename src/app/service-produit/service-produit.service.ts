import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Produit } from '../model-produit/produit.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceProduitService {
  private apiUrl = 'https://localhost:7088/api/Papeterie';

  constructor(private http: HttpClient) { }
  // liste des produits
  private _Produit: Produit[] = [];

  // section CRUD api
  /// Commentaire thibaut ; non, ca ne marche pas
  // vous auriez du déclarer une variable privée _getProduits et l'affecter à this.http.get...
  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);
  }

  getProduitById(id: number): Observable<Produit> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Produit>(url);
  }

  createProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiUrl, produit);
  }

  updateProduit(id: number, produit: Produit): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, produit);
  }

  deleteProduit(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  // section full angular
  // ajoute un produit
  public formerCreateProduit(p: Produit) {
    this._Produit.push(p);
  }

  // modifie les données d'instance de produit
  public formerUpdateProduit(p: Produit) {
    // Recherche de l'index du produit à mettre à jour
    const index = this._Produit.findIndex(prod => prod.Id === p.Id);

    // Vérification si le produit existe dans la liste
    if (index !== -1) {
        // Remplacement du produit existant par le nouveau produit
        this._Produit[index] = p;
    } else {
        console.log("Le produit à mettre à jour n'existe pas dans la liste.");
    }
  }

  // retourne l'instance de produit
  public formerGetProduits(): Observable<Produit[]> {
    return of([...this._Produit]);
  }
}
