import { LambInputIconModule } from './input-icon.module';

describe('LambInputIconModule', () => {
  let lambInputIconModule: LambInputIconModule;

  beforeEach(() => {
    lambInputIconModule = new LambInputIconModule();
  });

  it('should create an instance', () => {
    expect(lambInputIconModule).toBeTruthy();
  });
});
