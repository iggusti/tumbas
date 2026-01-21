import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PaymentMethodsPage from './PaymentMethodsPage';

vi.mock('@/components/NavLink', () => ({
  default: () => <div data-testid="nav-link">NavLink</div>
}));

vi.mock('@/components/PageHeader', () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="page-header">{title}</div>
  )
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  }
}));

describe('PaymentMethodsPage', () => {
  it('should render page header with correct title', () => {
    render(
      <MemoryRouter>
        <PaymentMethodsPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('page-header')).toHaveTextContent('Payment Methods');
  });

  it('should render navigation link', () => {
    render(
      <MemoryRouter>
        <PaymentMethodsPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('nav-link')).toBeInTheDocument();
  });
});