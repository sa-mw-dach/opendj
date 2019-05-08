import { TestBed } from '@angular/core/testing';

import { PlaylistMockService } from './playlist-mock.service';

describe('PlaylistMockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaylistMockService = TestBed.get(PlaylistMockService);
    expect(service).toBeTruthy();
  });
});
