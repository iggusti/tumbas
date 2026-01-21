import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('should merge class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('should handle undefined and null values', () => {
    expect(cn('class1', undefined, null, 'class2')).toBe('class1 class2');
  });

  it('should handle empty strings', () => {
    expect(cn('class1', '', 'class2')).toBe('class1 class2');
  });

  it('should merge Tailwind classes with proper precedence', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('should handle responsive classes', () => {
    expect(cn('text-sm', 'md:text-lg')).toBe('text-sm md:text-lg');
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    expect(cn('base-class', isActive && 'active-class')).toBe('base-class active-class');
  });

  it('should handle array inputs', () => {
    expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3');
  });

  it('should handle object inputs', () => {
    expect(cn({ 'class1': true, 'class2': false }, 'class3')).toBe('class1 class3');
  });

  it('should return empty string for no valid inputs', () => {
    expect(cn(undefined, null, '')).toBe('');
  });

  it('should handle single class name', () => {
    expect(cn('single-class')).toBe('single-class');
  });

  it('should handle complex Tailwind combinations', () => {
    const result = cn(
      'flex items-center justify-center',
      'px-4 py-2',
      'bg-blue-500 hover:bg-blue-600',
      'text-white font-medium',
      'rounded-lg shadow-md'
    );
    expect(result).toBe('flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-md');
  });
});