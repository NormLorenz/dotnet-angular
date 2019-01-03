import { TestBed, inject } from '@angular/core/testing';

import { FunctionSubTypeService } from './function-sub-type.service';

describe('FunctionSubTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FunctionSubTypeService]
    });
  });

  it('should be created', inject([FunctionSubTypeService], (service: FunctionSubTypeService) => {
    expect(service).toBeTruthy();
  }));
});