import { TestBed } from '@angular/core/testing';

import { AccountServiceBackupService } from './account-service-backup.service';

describe('AccountServiceBackupService', () => {
  let service: AccountServiceBackupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountServiceBackupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
