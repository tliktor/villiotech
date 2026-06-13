import '@testing-library/jest-dom'

// Mock IntersectionObserver for jsdom
global.IntersectionObserver = class IntersectionObserver {
  constructor(private cb: IntersectionObserverCallback) {}
  observe() {}
  unobserve() {}
  disconnect() {}
} as any