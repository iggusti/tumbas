import { describe, it, expect } from 'vitest';
import { products, ProductTag } from './products';

describe('products', () => {
  it('should have products array', () => {
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  it('should have valid product structure', () => {
    products.forEach((product) => {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('image');
      expect(product).toHaveProperty('category');
      expect(product).toHaveProperty('tags');
      expect(product).toHaveProperty('description');
      expect(product).toHaveProperty('origin');
      expect(product).toHaveProperty('material');
      expect(product).toHaveProperty('dyeingProcess');

      expect(typeof product.id).toBe('string');
      expect(typeof product.name).toBe('string');
      expect(typeof product.price).toBe('number');
      expect(typeof product.category).toBe('string');
      expect(Array.isArray(product.tags)).toBe(true);
      expect(typeof product.description).toBe('string');
      expect(typeof product.origin).toBe('string');
      expect(typeof product.material).toBe('string');
      expect(typeof product.dyeingProcess).toBe('string');
    });
  });

  it('should have unique product IDs', () => {
    const ids = products.map(p => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have valid prices', () => {
    products.forEach((product) => {
      expect(product.price).toBeGreaterThan(0);
      if (product.originalPrice) {
        expect(product.originalPrice).toBeGreaterThan(product.price);
      }
    });
  });

  it('should have valid tags', () => {
    const validTags: ProductTag[] = ['Man', 'Woman', 'Batik Fabric', 'Accessories'];

    products.forEach((product) => {
      product.tags.forEach((tag) => {
        expect(validTags).toContain(tag);
      });
    });
  });

  it('should have premium products', () => {
    const premiumProducts = products.filter(p => p.isPremium);
    expect(premiumProducts.length).toBeGreaterThan(0);

    premiumProducts.forEach((product) => {
      expect(product.isPremium).toBe(true);
    });
  });

  it('should have products with original prices (discounted items)', () => {
    const discountedProducts = products.filter(p => p.originalPrice);
    expect(discountedProducts.length).toBeGreaterThan(0);

    discountedProducts.forEach((product) => {
      expect(product.originalPrice).toBeGreaterThan(product.price);
    });
  });

  it('should have products from Indramayu', () => {
    products.forEach((product) => {
      expect(product.origin).toContain('Indramayu');
    });
  });

  it('should have valid categories', () => {
    const validCategories = ['Batik Tulis', 'Batik Cap', 'Batik Printing'];
    products.forEach((product) => {
      expect(validCategories).toContain(product.category);
    });
  });

  it('should have valid materials', () => {
    const validMaterials = ['Premium cotton', 'Cotton', 'Silk'];
    products.forEach((product) => {
      expect(validMaterials.some(material => product.material.includes(material))).toBe(true);
    });
  });

  it('should have valid dyeing processes', () => {
    const validProcesses = ['Natural Dye', 'Synthetic Dye', 'Hand-dyed'];
    products.forEach((product) => {
      expect(validProcesses.some(process => product.dyeingProcess.includes(process))).toBe(true);
    });
  });
});

describe('ProductTag type', () => {
  it('should accept valid tag values', () => {
    const validTags: ProductTag[] = ['Man', 'Woman', 'Batik Fabric', 'Accessories'];

    validTags.forEach(tag => {
      expect(() => {
        const testTag: ProductTag = tag;
        expect(testTag).toBe(tag);
      }).not.toThrow();
    });
  });
});