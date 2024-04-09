import { TestBed } from '@angular/core/testing';

import { SqlInjectionService } from './sql-injection.service';

describe('SqlInjectionService', () => {
  let service: SqlInjectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqlInjectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
