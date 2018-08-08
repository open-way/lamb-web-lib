import { LambButtonIconModule } from './button-icon.module';

describe('ButtonIconModule', () => {
  let lambButtonIconModule: LambButtonIconModule;

  beforeEach(() => {
    lambButtonIconModule = new LambButtonIconModule();
  });

  it('should create an instance', () => {
    expect(lambButtonIconModule).toBeTruthy();
  });
});
