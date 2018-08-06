import { ButtonIconModule } from './button-icon.module';

describe('ButtonIconModule', () => {
  let buttonIconModule: ButtonIconModule;

  beforeEach(() => {
    buttonIconModule = new ButtonIconModule();
  });

  it('should create an instance', () => {
    expect(buttonIconModule).toBeTruthy();
  });
});
