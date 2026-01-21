import { describe, it, expect } from 'vitest';
import { SHIPPING_OPTIONS, ORDER_STATUS_CONFIG } from './constants';

describe('SHIPPING_OPTIONS', () => {
  it('should have 3 shipping options', () => {
    expect(SHIPPING_OPTIONS).toHaveLength(3);
  });

  it('should have required properties for each option', () => {
    SHIPPING_OPTIONS.forEach((option) => {
      expect(option).toHaveProperty('id');
      expect(option).toHaveProperty('name');
      expect(option).toHaveProperty('price');
      expect(option).toHaveProperty('eta');
      expect(option).toHaveProperty('icon');
    });
  });

  it('should have Regular option with lowest price', () => {
    const regular = SHIPPING_OPTIONS.find(o => o.id === 'regular');
    expect(regular).toBeDefined();
    expect(regular?.price).toBe(18000);
    expect(regular?.eta).toBe('3-5 hari');
  });

  it('should have Express option with medium price', () => {
    const express = SHIPPING_OPTIONS.find(o => o.id === 'express');
    expect(express).toBeDefined();
    expect(express?.price).toBe(35000);
    expect(express?.eta).toBe('1-2 hari');
  });

  it('should have Same Day option with highest price', () => {
    const sameDay = SHIPPING_OPTIONS.find(o => o.id === 'same-day');
    expect(sameDay).toBeDefined();
    expect(sameDay?.price).toBe(50000);
    expect(sameDay?.eta).toBe('Hari ini');
  });

  it('should have unique ids', () => {
    const ids = SHIPPING_OPTIONS.map(o => o.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});

describe('ORDER_STATUS_CONFIG', () => {
  it('should have all 5 status types', () => {
    const statuses = Object.keys(ORDER_STATUS_CONFIG);
    expect(statuses).toContain('pending');
    expect(statuses).toContain('processing');
    expect(statuses).toContain('shipped');
    expect(statuses).toContain('delivered');
    expect(statuses).toContain('cancelled');
  });

  it('should have required properties for each status', () => {
    Object.values(ORDER_STATUS_CONFIG).forEach((config) => {
      expect(config).toHaveProperty('label');
      expect(config).toHaveProperty('shortLabel');
      expect(config).toHaveProperty('icon');
      expect(config).toHaveProperty('color');
    });
  });

  it('should have pending status with correct label', () => {
    expect(ORDER_STATUS_CONFIG.pending.label).toBe('Menunggu Pembayaran');
    expect(ORDER_STATUS_CONFIG.pending.shortLabel).toBe('Menunggu');
  });

  it('should have delivered status with correct label', () => {
    expect(ORDER_STATUS_CONFIG.delivered.label).toBe('Diterima');
    expect(ORDER_STATUS_CONFIG.delivered.shortLabel).toBe('Diterima');
  });

  it('should have cancelled status with correct label', () => {
    expect(ORDER_STATUS_CONFIG.cancelled.label).toBe('Dibatalkan');
    expect(ORDER_STATUS_CONFIG.cancelled.shortLabel).toBe('Dibatalkan');
  });

  it('should have color classes for styling', () => {
    Object.values(ORDER_STATUS_CONFIG).forEach((config) => {
      expect(config.color).toMatch(/text-.*bg-.*/);
    });
  });
});
