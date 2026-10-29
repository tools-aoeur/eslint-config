import { a, missing } from './a.js';
import { nope } from './nope.js';
import leftpad from 'left-pad';

export function B() {
  return <Foo value={a + missing + nope + leftpad} />;
}
