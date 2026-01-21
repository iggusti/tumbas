import { describe, it, expect } from 'vitest';
import { 
  profileSchema, 
  passwordSchema, 
  addressSchema, 
  sellerMessageSchema 
} from './validations';

describe('profileSchema', () => {
  it('should validate a valid profile', () => {
    const validProfile = {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+6281234567890',
    };
    
    const result = profileSchema.safeParse(validProfile);
    expect(result.success).toBe(true);
  });

  it('should reject empty full name', () => {
    const profile = {
      fullName: '',
      email: 'john@example.com',
      phone: '+6281234567890',
    };
    
    const result = profileSchema.safeParse(profile);
    expect(result.success).toBe(false);
  });

  it('should reject invalid email', () => {
    const profile = {
      fullName: 'John Doe',
      email: 'invalid-email',
      phone: '+6281234567890',
    };
    
    const result = profileSchema.safeParse(profile);
    expect(result.success).toBe(false);
  });

  it('should reject short phone number', () => {
    const profile = {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '123',
    };
    
    const result = profileSchema.safeParse(profile);
    expect(result.success).toBe(false);
  });
});

describe('passwordSchema', () => {
  it('should validate matching passwords', () => {
    const validPasswords = {
      currentPassword: 'oldpassword123',
      newPassword: 'newpassword123',
      confirmPassword: 'newpassword123',
    };
    
    const result = passwordSchema.safeParse(validPasswords);
    expect(result.success).toBe(true);
  });

  it('should reject mismatched passwords', () => {
    const passwords = {
      currentPassword: 'oldpassword123',
      newPassword: 'newpassword123',
      confirmPassword: 'differentpassword',
    };
    
    const result = passwordSchema.safeParse(passwords);
    expect(result.success).toBe(false);
  });

  it('should reject short new password', () => {
    const passwords = {
      currentPassword: 'oldpassword123',
      newPassword: '123',
      confirmPassword: '123',
    };
    
    const result = passwordSchema.safeParse(passwords);
    expect(result.success).toBe(false);
  });
});

describe('addressSchema', () => {
  it('should validate a valid address', () => {
    const validAddress = {
      label: 'Rumah',
      name: 'John Doe',
      phone: '+6281234567890',
      address: 'Jl. Contoh No. 123, Jakarta',
      icon: 'home' as const,
      isDefault: true,
    };
    
    const result = addressSchema.safeParse(validAddress);
    expect(result.success).toBe(true);
  });

  it('should reject empty label', () => {
    const address = {
      label: '',
      name: 'John Doe',
      phone: '+6281234567890',
      address: 'Jl. Contoh No. 123',
      icon: 'home' as const,
      isDefault: false,
    };
    
    const result = addressSchema.safeParse(address);
    expect(result.success).toBe(false);
  });

  it('should reject short address', () => {
    const address = {
      label: 'Rumah',
      name: 'John Doe',
      phone: '+6281234567890',
      address: 'Jl',
      icon: 'home' as const,
      isDefault: false,
    };
    
    const result = addressSchema.safeParse(address);
    expect(result.success).toBe(false);
  });
});

describe('sellerMessageSchema', () => {
  it('should validate an empty message', () => {
    const result = sellerMessageSchema.safeParse({ message: '' });
    expect(result.success).toBe(true);
  });

  it('should validate a valid message', () => {
    const result = sellerMessageSchema.safeParse({ message: 'Tolong bungkus rapi' });
    expect(result.success).toBe(true);
  });

  it('should reject message exceeding max length', () => {
    const longMessage = 'a'.repeat(501);
    const result = sellerMessageSchema.safeParse({ message: longMessage });
    expect(result.success).toBe(false);
  });

  it('should accept message at max length', () => {
    const maxMessage = 'a'.repeat(500);
    const result = sellerMessageSchema.safeParse({ message: maxMessage });
    expect(result.success).toBe(true);
  });
});
