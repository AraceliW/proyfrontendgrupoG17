import { TestBed } from '@angular/core/testing';

import { AdminEventoService } from './admin-evento.service';

describe('AdminEventoService', () => {
  let service: AdminEventoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminEventoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
