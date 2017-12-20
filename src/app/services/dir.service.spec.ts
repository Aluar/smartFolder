import { TestBed, inject } from '@angular/core/testing';

import { DirService } from './dir.service';

describe('DirService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DirService]
    });
  });

  it('should be created', inject([DirService], (service: DirService) => {
    expect(service).toBeTruthy();
  }));
});
