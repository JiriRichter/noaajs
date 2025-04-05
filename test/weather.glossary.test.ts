/**
 * @jest-environment node
 */

import { expect, test } from '@jest/globals';
import { GlossaryApi } from '../src/weather/api/glossary';

const timeout = 10000;

test('getPoint', async () => {
  const api = new GlossaryApi();
  let glossary = await api.getGlossary();

  expect(glossary).not.toBeNull();
  expect(Object.keys(glossary).length).toBeGreaterThan(0);
 
}, timeout);