/**
 * Performance utilities for optimizing Angular applications
 */

/**
 * Debounce function to limit the rate of function execution
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit function execution frequency
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Memoization function for caching expensive computations
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map();
  
  return ((...args: any[]) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Track by functions for ngFor optimization
 */
export const trackByFunctions = {
  byId: (index: number, item: { id: any }) => item.id,
  byIndex: (index: number) => index,
  byProperty: (property: string) => (index: number, item: any) => item[property]
};

/**
 * Lazy loading utility for dynamic imports
 */
export async function lazyLoad<T>(
  importFn: () => Promise<T>
): Promise<T> {
  try {
    return await importFn();
  } catch (error) {
    console.error('Failed to lazy load module:', error);
    throw error;
  }
}

/**
 * Image preloader utility
 */
export function preloadImages(urls: string[]): Promise<void[]> {
  const promises = urls.map(url => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  });
  
  return Promise.all(promises);
}

/**
 * Virtual scrolling helper
 */
export function calculateVisibleItems(
  containerHeight: number,
  itemHeight: number,
  scrollTop: number,
  buffer = 5
): { startIndex: number; endIndex: number; totalItems: number } {
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
  const endIndex = startIndex + visibleCount + (buffer * 2);
  
  return {
    startIndex,
    endIndex,
    totalItems: visibleCount + (buffer * 2)
  };
}