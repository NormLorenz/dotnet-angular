import { TestBed, inject } from '@angular/core/testing';

import { AreaDepartmentService } from './area-department.service';

describe('AreaDepartmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AreaDepartmentService]
    });
  });

  it('should be created', inject([AreaDepartmentService], (service: AreaDepartmentService) => {
    expect(service).toBeTruthy();
  }));
});