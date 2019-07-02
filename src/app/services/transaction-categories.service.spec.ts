import { TestBed } from '@angular/core/testing';

import { TransactionCategoriesService } from './transaction-categories.service';

describe('TransactionCategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactionCategoriesService = TestBed.get(TransactionCategoriesService);
    expect(service).toBeTruthy();
  });
});
