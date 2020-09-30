import { TestBed } from '@angular/core/testing';

import { GitDataService } from './git-data.service';

describe('GitDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GitDataService = TestBed.get(GitDataService);
    expect(service).toBeTruthy();
  });
});
