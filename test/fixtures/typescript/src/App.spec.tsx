import { describe, it, test, expect } from 'vitest';
describe('App', () => {
  test('Works', () => { expect(1).toBe(1); });
  it.only('x', () => {});
});
