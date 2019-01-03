import { TestBed, inject } from '@angular/core/testing';

import { TimeEntryService } from './time-entry.service';

describe('TimeEntryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeEntryService]
    });
  });

  it('should be created', inject([TimeEntryService], (service: TimeEntryService) => {
    expect(service).toBeTruthy();
  }));
});