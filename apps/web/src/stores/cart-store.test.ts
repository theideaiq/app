import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useCartStore } from './cart-store';

const MOCK_PRODUCT_1 = {
  id: 'p1',
  productId: 'p1',
  title: 'Apple',
  price: 100,
  image: '/apple.jpg',
  quantity: 1,
};

const MOCK_PRODUCT_2 = {
  id: 'p2',
  productId: 'p2',
  title: 'Banana',
  price: 50,
  image: '/banana.jpg',
  quantity: 1,
};

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

    addItem(MOCK_PRODUCT_1);
    expect(useCartStore.getState().items).toEqual([MOCK_PRODUCT_1]);

    addItem(MOCK_PRODUCT_2);
    expect(useCartStore.getState().items).toEqual([
      MOCK_PRODUCT_1,
      MOCK_PRODUCT_2,
    ]);
  });

  it('should remove items from the cart', () => {
    const { addItem, removeItem } = useCartStore.getState();

    addItem(MOCK_PRODUCT_1);
    addItem(MOCK_PRODUCT_2);

    removeItem('p1');
    expect(useCartStore.getState().items).toEqual([MOCK_PRODUCT_2]);
  });

  it('should clear the cart', () => {
    const { addItem, clearCart } = useCartStore.getState();

    addItem(MOCK_PRODUCT_1);
    addItem(MOCK_PRODUCT_2);

    clearCart();
    expect(useCartStore.getState().items).toEqual([]);
  });

  it('should handle duplicate items correctly (increments quantity)', () => {
    const { addItem } = useCartStore.getState();

    addItem(MOCK_PRODUCT_1);
    addItem(MOCK_PRODUCT_1);

    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
  });

  it('should persist state to localStorage', () => {
    const { addItem } = useCartStore.getState();
    addItem(MOCK_PRODUCT_1);

    const stored = localStorage.getItem('cart-storage');
    expect(stored).toBeDefined();
    if (stored) {
      const parsed = JSON.parse(stored);
      expect(parsed.state.items).toEqual([MOCK_PRODUCT_1]);
    }
  });
});
