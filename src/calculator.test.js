import {calculateViabilityThreshold, calculateDelegates, resolveDelegates} from './calculator.js';

test('calculates viability threshold', () => {
  expect(calculateViabilityThreshold(5, 1)).toBe(0);
  expect(calculateViabilityThreshold(45, 3)).toBe(8);
  expect(calculateViabilityThreshold(25, 5)).toBe(4);
  expect(calculateViabilityThreshold(40, 2)).toBe(10);
});

test('calculates delegates based on caucus attendees', () => {
  expect(calculateDelegates(65,9,25)).toBe(3);
  expect(calculateDelegates(65,9,16)).toBe(2);
  expect(calculateDelegates(65,9,13)).toBe(2);
  expect(calculateDelegates(65,9,11)).toBe(2);
  expect(calculateDelegates(17,3,10)).toBe(2);
  expect(calculateDelegates(17,3,4)).toBe(1);
  expect(calculateDelegates(17,3,3)).toBe(1);
});

