export function getDiscountPercent(startValue: number, finalValue: number): number {
  return Math.floor(((finalValue - startValue) / startValue) * 100);
}
