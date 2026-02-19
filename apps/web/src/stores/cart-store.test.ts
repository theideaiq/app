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

  // Mock Items
  const apple: Omit<CartItem, 'quantity'> = {
    id: 'apple-id',
    productId: 'prod-1',
    title: 'Apple',
    price: 100,
    image: 'apple.png',
  };

  const banana: Omit<CartItem, 'quantity'> = {
    id: 'banana-id',
    productId: 'prod-2',
    title: 'Banana',
    price: 50,
    image: 'banana.png',
  };

  it('should start with an empty cart', () => {
    const { items, total } = useCartStore.getState();
    expect(items).toEqual([]);
    expect(total).toBe(0);
  });

  it('should add items to the cart', () => {
    const { addItem } = useCartStore.getState();

    addItem(apple);
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0]).toMatchObject({
      ...apple,
      quantity: 1,
    });
    expect(useCartStore.getState().total).toBe(100);

    addItem(banana);
    expect(useCartStore.getState().items).toHaveLength(2);
    expect(useCartStore.getState().total).toBe(150);
  });

  it('should remove items from the cart', () => {
    const { addItem, removeItem } = useCartStore.getState();

    addItem(apple);
    addItem(banana);

    removeItem('apple-id');
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0]?.title).toBe('Banana');
    expect(useCartStore.getState().total).toBe(50);
  });

  it('should clear the cart', () => {
    const { addItem, clearCart } = useCartStore.getState();

    addItem(apple);
    addItem(banana);

    clearCart();
    expect(useCartStore.getState().items).toEqual([]);
    expect(useCartStore.getState().total).toBe(0);
  });

  it('should handle duplicate items correctly (increments quantity)', () => {
    const { addItem } = useCartStore.getState();

    addItem(apple);
    addItem(apple);

    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0]?.quantity).toBe(2);
    expect(useCartStore.getState().total).toBe(200);
  });

  it('should update quantity correctly', () => {
    const { addItem, updateQuantity } = useCartStore.getState();

    addItem(apple);
    updateQuantity('apple-id', 5);

    expect(useCartStore.getState().items[0]?.quantity).toBe(5);
    expect(useCartStore.getState().total).toBe(500);
  });

  it('should persist state to localStorage', () => {
    const { addItem } = useCartStore.getState();
    addItem(apple);

    const stored = localStorage.getItem('cart-storage-v2');
    expect(stored).toBeDefined();
    if (stored) {
      const parsed = JSON.parse(stored);
      expect(parsed.state.items).toHaveLength(1);
      expect(parsed.state.items[0].id).toBe('apple-id');
    }
  });
});
