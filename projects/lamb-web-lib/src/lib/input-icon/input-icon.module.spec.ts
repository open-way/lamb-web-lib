import { InputIconModule } from './input-icon.module';

describe('InputIconModule', () => {
  let inputIconModule: InputIconModule;

  beforeEach(() => {
    inputIconModule = new InputIconModule();
  });

  it('should create an instance', () => {
    expect(inputIconModule).toBeTruthy();
  });
});
