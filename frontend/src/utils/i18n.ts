/**
 * Safe array getter for i18next returnObjects
 * Ensures the result is always an array to prevent .map() errors
 */
export function getTranslationArray<T = string>(value: unknown): T[] {
  return Array.isArray(value) ? value : []
}
