import { TestBed, inject } from '@angular/core/testing';

import { FunctionTypeDepartmentService } from './function-type-department.service';

describe('FunctionTypeDepartmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FunctionTypeDepartmentService]
    });
  });

  it('should be created', inject([FunctionTypeDepartmentService], (service: FunctionTypeDepartmentService) => {
    expect(service).toBeTruthy();
  }));
});