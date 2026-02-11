import { createClient } from '@/lib/supabase/client';

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
}

/**
 * Add item to cart in Supabase
 */
export async function addToCartDB(
  userId: string,
  item: { productId: string; quantity: number },
) {
  const supabase = createClient();
  const cartId = await getOrCreateCartId(supabase, userId);

  if (!cartId) return { error: 'Failed to create cart' };

  // Check if item exists
  const { data: existing } = await supabase
    .from('cart_items')
    .select('id, quantity')
    .eq('cart_id', cartId)
    .eq('product_id', item.productId)
    .single();

  if (existing) {
    return supabase
      .from('cart_items')
      .update({ quantity: existing.quantity + item.quantity })
      .eq('id', existing.id);
  }

  return supabase.from('cart_items').insert({
    cart_id: cartId,
    product_id: item.productId,
    quantity: item.quantity,
  });
}

/**
 * Sync local cart to DB on login
 */
export async function syncCartToDB(userId: string, localItems: CartItem[]) {
  const supabase = createClient();
  const cartId = await getOrCreateCartId(supabase, userId);

  if (!cartId) return;

  // Simple sync: upsert all
  const upserts = localItems.map((item) => ({
    cart_id: cartId,
    product_id: item.product_id, // Note: local might use 'productId'
    quantity: item.quantity,
  }));

  if (upserts.length > 0) {
    await supabase.from('cart_items').upsert(
      upserts.map((u) => ({
        ...u,
        updated_at: new Date().toISOString(),
      })),
      { onConflict: 'cart_id,product_id' },
    );
  }
}

/**
 * Fetch cart from DB
 */
export async function fetchCartDB(userId: string) {
  const supabase = createClient();
  const { data: cart } = await supabase
    .from('carts')
    .select('id')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single();

  if (!cart) return [];

  const { data: items } = await supabase
    .from('cart_items')
    .select(`
      id,
      quantity,
      product_id,
      products (
        name,
        price,
        image_url
      )
    `)
    .eq('cart_id', cart.id);

  if (!items) return [];

  // biome-ignore lint/suspicious/noExplicitAny: Complex join type
  return (items as any[]).map((item) => ({
    id: item.id,
    productId: item.product_id,
    title: item.products?.name,
    price: item.products?.price,
    image: item.products?.image_url,
    quantity: item.quantity,
  }));
}

/**
 * Helper: Get or create active cart
 */
async function getOrCreateCartId(
  // biome-ignore lint/suspicious/noExplicitAny: Supabase client type
  supabase: any,
  userId: string,
): Promise<string | null> {
  const { data: cart } = await supabase
    .from('carts')
    .select('id')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single();

  if (cart) return cart.id;

  const { data: newCart, error } = await supabase
    .from('carts')
    .insert({ user_id: userId, status: 'active' })
    .select()
    .single();

  if (error) return null;
  return newCart.id;
}
