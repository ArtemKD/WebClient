/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StationManagerService } from './station-manager.service';

describe('Service: StationManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StationManagerService]
    });
  });

  it('should ...', inject([StationManagerService], (service: StationManagerService) => {
    expect(service).toBeTruthy();
  }));
});
