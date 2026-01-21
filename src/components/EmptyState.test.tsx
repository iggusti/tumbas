import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import EmptyState from './EmptyState';
import { ShoppingCart } from 'lucide-react';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  }
}));

describe('EmptyState', () => {
  it('should render icon, title, and description', () => {
    render(
      <EmptyState
        icon={ShoppingCart}
        title="Your cart is empty"
        description="Add some products to get started"
      />
    );

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(screen.getByText('Add some products to get started')).toBeInTheDocument();
  });

  it('should render icon with correct size and classes', () => {
    render(
      <EmptyState
        icon={ShoppingCart}
        title="Empty"
      />
    );

    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('width', '48');
    expect(icon).toHaveAttribute('height', '48');
    expect(icon).toHaveClass('text-muted-foreground/50');
  });

  it('should render without description when not provided', () => {
    render(
      <EmptyState
        icon={ShoppingCart}
        title="No items"
      />
    );

    expect(screen.getByText('No items')).toBeInTheDocument();
    expect(screen.queryByText(/description/i)).not.toBeInTheDocument();
  });

  it('should have correct container styling', () => {
    const { container } = render(
      <EmptyState
        icon={ShoppingCart}
        title="Test"
      />
    );

    const motionDiv = container.firstChild as HTMLElement;
    expect(motionDiv).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center', 'py-16');
  });

  it('should have correct title styling', () => {
    render(
      <EmptyState
        icon={ShoppingCart}
        title="Test Title"
      />
    );

    const title = screen.getByText('Test Title');
    expect(title).toHaveClass('font-semibold', 'text-foreground', 'mb-1');
  });

  it('should have correct description styling', () => {
    render(
      <EmptyState
        icon={ShoppingCart}
        title="Test"
        description="Test description"
      />
    );

    const description = screen.getByText('Test description');
    expect(description).toHaveClass('text-sm', 'text-muted-foreground', 'text-center');
  });
});