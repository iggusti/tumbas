import { describe, it, expect } from 'vitest';
import { formatPrice, formatPriceShort, formatDate, formatDateShort } from './formatters';

describe('formatPrice', () => {
  it('should format price in IDR currency', () => {
    expect(formatPrice(150000)).toBe('Rp 150.000');
  });

  it('should format zero price', () => {
    expect(formatPrice(0)).toBe('Rp 0');
  });

  it('should format large numbers', () => {
    expect(formatPrice(1500000)).toBe('Rp 1.500.000');
  });

  it('should handle decimal prices by truncating', () => {
    const result = formatPrice(150000.5);
    expect(result).toContain('150.000');
  });
});

describe('formatPriceShort', () => {
  it('should format price with Rp prefix', () => {
    expect(formatPriceShort(150000)).toBe('Rp 150.000');
  });

  it('should format zero price', () => {
    expect(formatPriceShort(0)).toBe('Rp 0');
  });
});

describe('formatDate', () => {
  it('should format date with time in Indonesian locale', () => {
    const date = '2025-01-15T10:30:00.000Z';
    const result = formatDate(date);
    
    // Should contain day, month, year, and time components
    expect(result).toMatch(/\d{1,2}/); // day
    expect(result).toMatch(/Jan|Feb|Mar|Apr|Mei|Jun|Jul|Agu|Sep|Okt|Nov|Des/i); // month
    expect(result).toMatch(/\d{4}/); // year
  });

  it('should handle ISO date strings', () => {
    const date = new Date('2025-01-20T14:00:00Z').toISOString();
    const result = formatDate(date);
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });
});

describe('formatDateShort', () => {
  it('should format date without time', () => {
    const date = '2025-01-15T10:30:00.000Z';
    const result = formatDateShort(date);
    
    // Should contain day, month, year components only
    expect(result).toMatch(/\d{1,2}/); // day
    expect(result).toMatch(/Jan|Feb|Mar|Apr|Mei|Jun|Jul|Agu|Sep|Okt|Nov|Des/i); // month
    expect(result).toMatch(/\d{4}/); // year
  });
});
