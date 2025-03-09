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

  it('should show recruiter message', () => {
    spyOn(console, 'clear');
    spyOn(console, 'log');
    service.showRecruiterMessage();
    expect(console.clear).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalled();
  });
});
