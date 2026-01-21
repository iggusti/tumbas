import { describe, it, expect } from 'vitest';
import { getProductById, getProductsByIds } from './product-utils';
import { products } from '@/data/products';

describe('getProductById', () => {
  it('should return product when valid id is provided', () => {
    const firstProduct = products[0];
    const result = getProductById(firstProduct.id);
    
    expect(result).toBeDefined();
    expect(result?.id).toBe(firstProduct.id);
    expect(result?.name).toBe(firstProduct.name);
  });

  it('should return undefined when product is not found', () => {
    const result = getProductById('non-existent-id');
    expect(result).toBeUndefined();
  });

  it('should return undefined for empty string', () => {
    const result = getProductById('');
    expect(result).toBeUndefined();
  });
});

describe('getProductsByIds', () => {
  it('should return multiple products when valid ids are provided', () => {
    const ids = products.slice(0, 3).map(p => p.id);
    const result = getProductsByIds(ids);
    
    expect(result).toHaveLength(3);
    expect(result.map(p => p.id)).toEqual(ids);
  });

  it('should filter out non-existent products', () => {
    const ids = [products[0].id, 'non-existent-id', products[1].id];
    const result = getProductsByIds(ids);
    
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe(products[0].id);
    expect(result[1].id).toBe(products[1].id);
  });

  it('should return empty array when no valid ids provided', () => {
    const result = getProductsByIds(['invalid-1', 'invalid-2']);
    expect(result).toHaveLength(0);
  });

  it('should return empty array for empty input', () => {
    const result = getProductsByIds([]);
    expect(result).toHaveLength(0);
  });
});
