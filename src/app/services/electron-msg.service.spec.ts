import { TestBed, inject } from '@angular/core/testing';

import { ElectronMsgService } from './electron-msg.service';

describe('ElectronMsgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElectronMsgService]
    });
  });

  it('should be created', inject([ElectronMsgService], (service: ElectronMsgService) => {
    expect(service).toBeTruthy();
  }));
});
