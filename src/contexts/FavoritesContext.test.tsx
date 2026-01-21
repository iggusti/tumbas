import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FavoritesProvider, useFavorites } from './FavoritesContext';

// Test component that uses the context
const TestComponent = () => {
  const { favorites, addToFavorites, removeFromFavorites, toggleFavorite, isFavorite } = useFavorites();

  return (
    <div>
      <div data-testid="favorites-count">{favorites.length}</div>
      <div data-testid="is-favorite-1">{isFavorite('1') ? 'true' : 'false'}</div>
      <div data-testid="is-favorite-2">{isFavorite('2') ? 'true' : 'false'}</div>
      <button onClick={() => addToFavorites('2')} data-testid="add-favorite">Add Favorite</button>
      <button onClick={() => removeFromFavorites('1')} data-testid="remove-favorite">Remove Favorite</button>
      <button onClick={() => toggleFavorite('3')} data-testid="toggle-favorite">Toggle Favorite</button>
    </div>
  );
};

describe('FavoritesContext', () => {
  it('should provide default favorites', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    expect(screen.getByTestId('favorites-count')).toHaveTextContent('3');
    expect(screen.getByTestId('is-favorite-1')).toHaveTextContent('true');
    expect(screen.getByTestId('is-favorite-2')).toHaveTextContent('false');
  });

  it('should add item to favorites', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    expect(screen.getByTestId('favorites-count')).toHaveTextContent('3');
    expect(screen.getByTestId('is-favorite-2')).toHaveTextContent('false');

    const addButton = screen.getByTestId('add-favorite');
    addButton.click();

    expect(screen.getByTestId('favorites-count')).toHaveTextContent('4');
    expect(screen.getByTestId('is-favorite-2')).toHaveTextContent('true');
  });

  it('should not add duplicate favorites', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    expect(screen.getByTestId('favorites-count')).toHaveTextContent('3');

    const addButton = screen.getByTestId('add-favorite');
    addButton.click(); // Add '2'
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('4');

    addButton.click(); // Try to add '2' again
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('4'); // Should remain 4
  });

  it('should remove item from favorites', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    expect(screen.getByTestId('favorites-count')).toHaveTextContent('3');
    expect(screen.getByTestId('is-favorite-1')).toHaveTextContent('true');

    const removeButton = screen.getByTestId('remove-favorite');
    removeButton.click();

    expect(screen.getByTestId('favorites-count')).toHaveTextContent('2');
    expect(screen.getByTestId('is-favorite-1')).toHaveTextContent('false');
  });

  it('should toggle favorite status', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    expect(screen.getByTestId('is-favorite-3')).toHaveTextContent('true'); // '3' is in default favorites

    const toggleButton = screen.getByTestId('toggle-favorite');
    toggleButton.click(); // Remove '3'

    expect(screen.getByTestId('is-favorite-3')).toHaveTextContent('false');
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('2');

    toggleButton.click(); // Add '3' back

    expect(screen.getByTestId('is-favorite-3')).toHaveTextContent('true');
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('3');
  });

  it('should correctly check if item is favorite', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    expect(screen.getByTestId('is-favorite-1')).toHaveTextContent('true');
    expect(screen.getByTestId('is-favorite-2')).toHaveTextContent('false');
  });

  it('should throw error when useFavorites is used outside provider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useFavorites must be used within a FavoritesProvider');

    consoleSpy.mockRestore();
  });
});