/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StationLoaderService } from './station-loader.service';

describe('Service: StationLoader', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StationLoaderService]
    });
  });

  it('should ...', inject([StationLoaderService], (service: StationLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
