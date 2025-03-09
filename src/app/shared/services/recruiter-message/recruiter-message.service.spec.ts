import { TestBed } from '@angular/core/testing';

import { RecruiterMessageService } from './recruiter-message.service';

describe('RecruiterMessageService', () => {
  let service: RecruiterMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecruiterMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
