import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ReturnPolicyPage from './ReturnPolicyPage';

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

describe('ReturnPolicyPage', () => {
  it('should render page header with correct title', () => {
    render(
      <MemoryRouter>
        <ReturnPolicyPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('page-header')).toHaveTextContent('Return Policy');
  });

  it('should render navigation link', () => {
    render(
      <MemoryRouter>
        <ReturnPolicyPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('nav-link')).toBeInTheDocument();
  });
});