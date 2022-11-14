import { TestBed } from '@angular/core/testing';

import { InterceptTokenService } from './intercept-token.service';

describe('InterceptTokenService', () => {
  let service: InterceptTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
