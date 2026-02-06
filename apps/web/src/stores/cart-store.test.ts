import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useCartStore } from './cart-store';

const createMockItem = (id: string) => ({
  id,
  productId: id,
  title: id,
  price: 100,
  image: 'img',
});

describe('Cart Store', () => {
  // Reset store before each test to ensure isolation
  beforeEach(() => {
    useCartStore.setState({ items: [], total: 0 });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('should start with an empty cart', () => {
    const { items } = useCartStore.getState();
    expect(items).toEqual([]);
  });

  it('should add items to the cart', () => {
    const { addItem } = useCartStore.getState();

    addItem(createMockItem('apple'));
    expect(useCartStore.getState().items).toEqual([
      { ...createMockItem('apple'), quantity: 1 },
    ]);

    addItem(createMockItem('banana'));
    expect(useCartStore.getState().items).toEqual([
      { ...createMockItem('apple'), quantity: 1 },
      { ...createMockItem('banana'), quantity: 1 },
    ]);
  });

  it('should remove items from the cart', () => {
    const { addItem, removeItem } = useCartStore.getState();

    addItem(createMockItem('apple'));
    addItem(createMockItem('banana'));

    removeItem('apple');
    expect(useCartStore.getState().items).toEqual([
      { ...createMockItem('banana'), quantity: 1 },
    ]);
  });

  it('should clear the cart', () => {
    const { addItem, clearCart } = useCartStore.getState();

    addItem(createMockItem('apple'));
    addItem(createMockItem('banana'));

    clearCart();
    expect(useCartStore.getState().items).toEqual([]);
  });

  it('should handle duplicate items correctly (increments quantity)', () => {
    const { addItem } = useCartStore.getState();

    addItem(createMockItem('apple'));
    addItem(createMockItem('apple'));
    expect(useCartStore.getState().items).toEqual([
      { ...createMockItem('apple'), quantity: 2 },
    ]);
  });

  it('should persist state to localStorage', () => {
    const { addItem } = useCartStore.getState();
    addItem(createMockItem('persistent-item'));

    const stored = localStorage.getItem('cart-storage-v2');
    expect(stored).toBeDefined();
    if (stored) {
      const parsed = JSON.parse(stored);
      expect(parsed.state.items).toEqual([
        { ...createMockItem('persistent-item'), quantity: 1 },
      ]);
    }
  });
});
