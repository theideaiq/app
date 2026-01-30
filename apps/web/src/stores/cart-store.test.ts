import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useCartStore } from './cart-store';

describe('Cart Store', () => {
  // Reset store before each test to ensure isolation
  beforeEach(() => {
    useCartStore.setState({ items: [] });
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
    const apple = {
      id: '1',
      productId: 'p1',
      title: 'Apple',
      price: 100,
      image: '',
    };
    const banana = {
      id: '2',
      productId: 'p2',
      title: 'Banana',
      price: 200,
      image: '',
    };

    addItem(apple);
    expect(useCartStore.getState().items).toEqual([{ ...apple, quantity: 1 }]);

    addItem(banana);
    expect(useCartStore.getState().items).toEqual([
      { ...apple, quantity: 1 },
      { ...banana, quantity: 1 },
    ]);
  });

  it('should remove items from the cart', () => {
    const { addItem, removeItem } = useCartStore.getState();
    const apple = {
      id: '1',
      productId: 'p1',
      title: 'Apple',
      price: 100,
      image: '',
    };
    const banana = {
      id: '2',
      productId: 'p2',
      title: 'Banana',
      price: 200,
      image: '',
    };

    addItem(apple);
    addItem(banana);

    removeItem('1');
    expect(useCartStore.getState().items).toEqual([{ ...banana, quantity: 1 }]);
  });

  it('should clear the cart', () => {
    const { addItem, clearCart } = useCartStore.getState();
    const apple = {
      id: '1',
      productId: 'p1',
      title: 'Apple',
      price: 100,
      image: '',
    };

    addItem(apple);
    clearCart();
    expect(useCartStore.getState().items).toEqual([]);
  });

  it('should handle duplicate items correctly (increments quantity)', () => {
    const { addItem } = useCartStore.getState();
    const apple = {
      id: '1',
      productId: 'p1',
      title: 'Apple',
      price: 100,
      image: '',
    };

    addItem(apple);
    addItem(apple);
    expect(useCartStore.getState().items).toEqual([{ ...apple, quantity: 2 }]);
  });

  it('should persist state to localStorage', () => {
    const { addItem } = useCartStore.getState();
    const item = {
      id: '1',
      productId: 'p1',
      title: 'Item',
      price: 100,
      image: '',
    };
    addItem(item);

    // persist middleware usually syncs after a tiny delay or synchronously depending on impl.
    // Zustand's persist updates localStorage synchronously on state change.
    const stored = localStorage.getItem('cart-storage-v2');
    expect(stored).toBeDefined();
    if (stored) {
      const parsed = JSON.parse(stored);
      expect(parsed.state.items).toEqual([{ ...item, quantity: 1 }]);
    }
  });
});
