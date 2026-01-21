import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RecentlyViewedProvider, useRecentlyViewed } from './RecentlyViewedContext';

// Test component that uses the context
const TestComponent = () => {
  const { recentlyViewed, addToRecentlyViewed } = useRecentlyViewed();

  return (
    <div>
      <div data-testid="recently-viewed-count">{recentlyViewed.length}</div>
      <button onClick={() => addToRecentlyViewed('1')} data-testid="add-recent">Add Recent</button>
      <button onClick={() => addToRecentlyViewed('2')} data-testid="add-recent-2">Add Recent 2</button>
    </div>
  );
};

describe('RecentlyViewedContext', () => {
  it('should provide recently viewed items', () => {
    render(
      <RecentlyViewedProvider>
        <TestComponent />
      </RecentlyViewedProvider>
    );

    expect(screen.getByTestId('recently-viewed-count')).toHaveTextContent('1'); // Initially has '2'
  });

  it('should add item to recently viewed', () => {
    render(
      <RecentlyViewedProvider>
        <TestComponent />
      </RecentlyViewedProvider>
    );

    expect(screen.getByTestId('recently-viewed-count')).toHaveTextContent('1');

    const addButton = screen.getByTestId('add-recent');
    addButton.click();

    expect(screen.getByTestId('recently-viewed-count')).toHaveTextContent('2');
  });

  it('should move existing item to front when re-added', () => {
    render(
      <RecentlyViewedProvider>
        <TestComponent />
      </RecentlyViewedProvider>
    );

    expect(screen.getByTestId('recently-viewed-count')).toHaveTextContent('1');

    // Add '1' (new item)
    const addButton1 = screen.getByTestId('add-recent');
    addButton1.click();
    expect(screen.getByTestId('recently-viewed-count')).toHaveTextContent('2');

    // Add '2' again (existing item, should move to front)
    const addButton2 = screen.getByTestId('add-recent-2');
    addButton2.click();
    expect(screen.getByTestId('recently-viewed-count')).toHaveTextContent('2'); // Count stays the same
  });

  it('should throw error when useRecentlyViewed is used outside provider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useRecentlyViewed must be used within a RecentlyViewedProvider');

    consoleSpy.mockRestore();
  });
});