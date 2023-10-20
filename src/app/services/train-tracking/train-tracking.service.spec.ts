/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TrainTrackingService } from './train-tracking.service';

describe('Service: TrainTracking', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrainTrackingService]
    });
  });

  it('should ...', inject([TrainTrackingService], (service: TrainTrackingService) => {
    expect(service).toBeTruthy();
  }));
});
