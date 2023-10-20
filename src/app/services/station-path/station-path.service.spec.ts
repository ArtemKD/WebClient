/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StationPathService } from './station-path.service';

describe('Service: StationPath', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StationPathService]
    });
  });

  it('should ...', inject([StationPathService], (service: StationPathService) => {
    expect(service).toBeTruthy();
  }));
});
