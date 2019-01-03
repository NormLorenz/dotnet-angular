import { TestBed, inject } from '@angular/core/testing';

import { FunctionTypeService } from './function-type.service';

describe('FunctionTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FunctionTypeService]
    });
  });

  it('should be created', inject([FunctionTypeService], (service: FunctionTypeService) => {
    expect(service).toBeTruthy();
  }));
});