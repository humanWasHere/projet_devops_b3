import { TestBed } from '@angular/core/testing';

import { ServiceProduitService } from './service-produit.service';

describe('ServiceProduitService', () => {
  let service: ServiceProduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceProduitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
