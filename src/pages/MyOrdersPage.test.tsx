import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MyOrdersPage from './MyOrdersPage';

vi.mock('@/components/NavLink', () => ({
  default: () => <div data-testid="nav-link">NavLink</div>
}));

vi.mock('@/components/PageHeader', () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="page-header">{title}</div>
  )
}));

vi.mock('@/components/EmptyState', () => ({
  default: ({ title, description }: { title: string; description: string }) => (
    <div data-testid="empty-state">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  }
}));

describe('MyOrdersPage', () => {
  it('should render page header with correct title', () => {
    render(
      <MemoryRouter>
        <MyOrdersPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('page-header')).toHaveTextContent('My Orders');
  });

  it('should render navigation link', () => {
    render(
      <MemoryRouter>
        <MyOrdersPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('nav-link')).toBeInTheDocument();
  });
});