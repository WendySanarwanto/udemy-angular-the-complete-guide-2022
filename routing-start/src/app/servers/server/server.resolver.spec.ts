import { TestBed } from '@angular/core/testing';

import { ServerResolver } from './server.resolver';

describe('ServerResolverResolver', () => {
  let resolver: ServerResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ServerResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
