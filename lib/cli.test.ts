import generate from './generate';

jest.mock('./generate', () => ({ __esModule: true, default: jest.fn() }));

describe('cli', () => {
  it('calls generate', () => {
    require('./cli');

    expect(generate).toBeCalled();
  });
});
