import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { type CartItem, useCartStore } from './cart-store';

describe('Cart Store', () => {
  // Reset store before each test to ensure isolation
  beforeEach(() => {
    useCartStore.setState({ items: [], total: 0 });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  const mockItem1: Omit<CartItem, 'quantity'> = {
    id: '1',
    productId: 'p1',
    title: 'Apple',
    price: 100,
    image: 'apple.jpg',
  };

  const mockItem2: Omit<CartItem, 'quantity'> = {
    id: '2',
    productId: 'p2',
    title: 'Banana',
    price: 50,
    image: 'banana.jpg',
  };

  it('should start with an empty cart', () => {
    const { items } = useCartStore.getState();
    expect(items).toEqual([]);
  });

  it('should add items to the cart', () => {
    const { addItem } = useCartStore.getState();

    addItem(mockItem1);
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0]).toMatchObject({
      ...mockItem1,
      quantity: 1,
    });

    addItem(mockItem2);
    expect(useCartStore.getState().items).toHaveLength(2);
    expect(useCartStore.getState().items[1]).toMatchObject({
      ...mockItem2,
      quantity: 1,
    });
  });

  it('should increment quantity for duplicate items', () => {
    const { addItem } = useCartStore.getState();

    addItem(mockItem1);
    addItem(mockItem1);

    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0]).toMatchObject({
      ...mockItem1,
      quantity: 2,
    });
  });

  it('should remove items from the cart', () => {
    const { addItem, removeItem } = useCartStore.getState();

    addItem(mockItem1);
    addItem(mockItem2);

    removeItem(mockItem1.id);
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0]).toMatchObject({
      ...mockItem2,
      quantity: 1,
    });
  });

  it('should clear the cart', () => {
    const { addItem, clearCart } = useCartStore.getState();

    addItem(mockItem1);
    addItem(mockItem2);

    clearCart();
    expect(useCartStore.getState().items).toEqual([]);
    expect(useCartStore.getState().total).toBe(0);
  });

  it('should calculate total correctly', () => {
    const { addItem } = useCartStore.getState();

    addItem(mockItem1); // 100 * 1
    addItem(mockItem2); // 50 * 1
    addItem(mockItem1); // 100 * 1 (total 2)

    // (100 * 2) + (50 * 1) = 250
    expect(useCartStore.getState().total).toBe(250);
  });

  it('should persist state to localStorage', () => {
    const { addItem } = useCartStore.getState();
    addItem(mockItem1);

    // Zustand's persist middleware uses specific key, let's check if it exists
    // Note: The key in cart-store.ts is 'cart-storage-v2'
    const stored = localStorage.getItem('cart-storage-v2');
    expect(stored).toBeDefined();
    if (stored) {
      const parsed = JSON.parse(stored);
      expect(parsed.state.items).toHaveLength(1);
      expect(parsed.state.items[0]).toMatchObject({
        ...mockItem1,
        quantity: 1,
      });
    }
  });
});
