export interface SpiedConsole {
  console?: jest.SpyInstance;
}

export function spyConsole() {
  const spy: SpiedConsole = {};

  beforeEach(() => {
    spy.console = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    spy.console?.mockClear();
  });

  afterAll(() => {
    spy.console?.mockRestore();
  });

  return spy;
}
