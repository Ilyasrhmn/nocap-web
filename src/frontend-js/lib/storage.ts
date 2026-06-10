// ─────────────────────────────────────────────────────
// NO CAP — Client-Side Storage Utilities (localStorage)
// ─────────────────────────────────────────────────────
// Single source of truth for all persistent client data.
// Every write operation dispatches a Custom Event so that
// isolated Astro Islands can synchronize in real-time.
// All browser APIs are guarded with `typeof window` checks
// for Netlify SSG safety.
// ─────────────────────────────────────────────────────

// ── Keys ────────────────────────────────────────────
const KEYS = {
  CART: 'nocap_cart',
  USERS: 'nocap_users',
  SESSION: 'nocap_session',
  GRAILS: 'nocap_grails',
  ORDERS: 'nocap_orders',
} as const;

// ── Events ──────────────────────────────────────────
const EVENTS = {
  CART_UPDATED: 'nocap:cart-updated',
  AUTH_UPDATED: 'nocap:auth-updated',
  GRAILS_UPDATED: 'nocap:grails-updated',
  ORDERS_UPDATED: 'nocap:orders-updated',
} as const;

export { EVENTS };

// ── Helpers ─────────────────────────────────────────
function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function getItem<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setItem(key: string, value: unknown): void {
  if (!isBrowser()) return;
  localStorage.setItem(key, JSON.stringify(value));
}

function dispatch(eventName: string): void {
  if (isBrowser()) {
    window.dispatchEvent(new Event(eventName));
  }
}

// ══════════════════════════════════════════════════════
// CART
// ══════════════════════════════════════════════════════

export type CartItem = {
  id: number | string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
};

export function getCart(): CartItem[] {
  return getItem<CartItem[]>(KEYS.CART, []);
}

export function addToCart(item: Omit<CartItem, 'quantity'> & { quantity?: number }): void {
  const cart = getCart();
  const existing = cart.find((c) => c.id === item.id && c.size === item.size);

  if (existing) {
    existing.quantity += item.quantity || 1;
  } else {
    cart.push({ ...item, quantity: item.quantity || 1 });
  }

  setItem(KEYS.CART, cart);
  dispatch(EVENTS.CART_UPDATED);
}

export function removeFromCart(id: number | string, size: string): void {
  const cart = getCart().filter((c) => !(c.id === id && c.size === size));
  setItem(KEYS.CART, cart);
  dispatch(EVENTS.CART_UPDATED);
}

export function updateCartQuantity(id: number | string, size: string, delta: number): void {
  const cart = getCart();
  const item = cart.find((c) => c.id === id && c.size === size);

  if (item) {
    item.quantity = Math.max(1, item.quantity + delta);
  }

  setItem(KEYS.CART, cart);
  dispatch(EVENTS.CART_UPDATED);
}

export function clearCart(): void {
  setItem(KEYS.CART, []);
  dispatch(EVENTS.CART_UPDATED);
}

export function getCartCount(): number {
  return getCart().reduce((sum, c) => sum + c.quantity, 0);
}

export function getCartTotal(): number {
  return getCart().reduce((sum, c) => sum + c.price * c.quantity, 0);
}

// ══════════════════════════════════════════════════════
// AUTH
// ══════════════════════════════════════════════════════

export type StoredUser = {
  name: string;
  email: string;
  password: string;
  created_at: string;
  tier?: 'MEMBER' | 'VERIFIED' | 'GRAIL';
  vipExpiryDate?: string;
};

export function getUsers(): StoredUser[] {
  return getItem<StoredUser[]>(KEYS.USERS, []);
}

export function registerUser(
  name: string,
  email: string,
  password: string
): { success: boolean; error?: string } {
  const users = getUsers();
  const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (exists) {
    return { success: false, error: 'EMAIL ALREADY REGISTERED' };
  }

  users.push({ 
    name, 
    email, 
    password, 
    created_at: new Date().toISOString(),
    tier: 'MEMBER'
  });
  setItem(KEYS.USERS, users);

  // Auto-login after register
  setItem(KEYS.SESSION, email);
  dispatch(EVENTS.AUTH_UPDATED);

  return { success: true };
}

export function loginUser(
  email: string,
  password: string
): { success: boolean; error?: string } {
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return { success: false, error: 'ACCOUNT NOT FOUND' };
  }

  if (user.password !== password) {
    return { success: false, error: 'WRONG PASSWORD' };
  }

  setItem(KEYS.SESSION, email);
  dispatch(EVENTS.AUTH_UPDATED);

  return { success: true };
}

export function logoutUser(): void {
  if (isBrowser()) {
    localStorage.removeItem(KEYS.SESSION);
  }
  dispatch(EVENTS.AUTH_UPDATED);
}

export function upgradeUserTier(email: string, newTier: 'VERIFIED' | 'GRAIL'): boolean {
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user) return false;

  user.tier = newTier;
  // Set expiry to 30 days from now
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 30);
  user.vipExpiryDate = expiry.toISOString();

  setItem(KEYS.USERS, users);
  dispatch(EVENTS.AUTH_UPDATED);
  return true;
}

export function cancelVipSubscription(email: string): boolean {
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user) return false;

  user.tier = 'MEMBER';
  delete user.vipExpiryDate;

  setItem(KEYS.USERS, users);
  dispatch(EVENTS.AUTH_UPDATED);
  return true;
}

export function renewVipSubscription(email: string): boolean {
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user || !user.vipExpiryDate) return false;

  const currentExpiry = new Date(user.vipExpiryDate);
  currentExpiry.setDate(currentExpiry.getDate() + 30);
  user.vipExpiryDate = currentExpiry.toISOString();

  setItem(KEYS.USERS, users);
  dispatch(EVENTS.AUTH_UPDATED);
  return true;
}

export function getSession(): string | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(KEYS.SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getCurrentUser(): Omit<StoredUser, 'password'> | null {
  const session = getSession();
  if (!session) return null;

  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === session.toLowerCase());

  if (!user) return null;
  return { 
    name: user.name, 
    email: user.email, 
    created_at: user.created_at,
    tier: user.tier || 'MEMBER',
    vipExpiryDate: user.vipExpiryDate
  };
}

// ══════════════════════════════════════════════════════
// GRAILS (Favorites) — scoped per user
// ══════════════════════════════════════════════════════

export type GrailItem = {
  id: number | string;
  name: string;
  price: number;
  image: string;
  category?: string;
};

type GrailsStore = Record<string, GrailItem[]>;

function getGrailsStore(): GrailsStore {
  return getItem<GrailsStore>(KEYS.GRAILS, {});
}

export function getGrails(): GrailItem[] {
  const session = getSession();
  if (!session) return [];
  const store = getGrailsStore();
  return store[session] || [];
}

export function addToGrails(product: GrailItem): void {
  const session = getSession();
  if (!session) return;

  const store = getGrailsStore();
  const userGrails = store[session] || [];

  if (userGrails.find((g) => g.id === product.id)) return; // already exists

  userGrails.push(product);
  store[session] = userGrails;
  setItem(KEYS.GRAILS, store);
  dispatch(EVENTS.GRAILS_UPDATED);
}

export function removeFromGrails(productId: number | string): void {
  const session = getSession();
  if (!session) return;

  const store = getGrailsStore();
  store[session] = (store[session] || []).filter((g) => g.id !== productId);
  setItem(KEYS.GRAILS, store);
  dispatch(EVENTS.GRAILS_UPDATED);
}

export function isInGrails(productId: number | string): boolean {
  return getGrails().some((g) => g.id === productId);
}

// ══════════════════════════════════════════════════════
// ORDERS — scoped per user
// ══════════════════════════════════════════════════════

export type OrderStatus = 'PROCESSING' | 'SHIPPED' | 'DELIVERED';

export type Order = {
  orderId: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: CartItem[];
};

type OrdersStore = Record<string, Order[]>;

function getOrdersStore(): OrdersStore {
  return getItem<OrdersStore>(KEYS.ORDERS, {});
}

export function getOrders(): Order[] {
  const session = getSession();
  if (!session) return [];
  const store = getOrdersStore();
  return store[session] || [];
}

export function placeOrder(cartItems: CartItem[], total: number): void {
  const session = getSession();
  if (!session) return;

  const store = getOrdersStore();
  const userOrders = store[session] || [];

  // Generate random order ID and random status for demo purposes
  const orderId = `#NC-${Math.floor(100 + Math.random() * 900)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(10 + Math.random() * 90)}`;
  
  const statuses: OrderStatus[] = ['PROCESSING', 'SHIPPED', 'DELIVERED'];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

  const newOrder: Order = {
    orderId,
    date: new Date().toISOString(),
    total,
    status: randomStatus, // Using random status for demo variation
    items: cartItems,
  };

  userOrders.unshift(newOrder); // add to top
  store[session] = userOrders;
  
  setItem(KEYS.ORDERS, store);
  
  // Clear cart
  setItem(KEYS.CART, []);
  
  dispatch(EVENTS.ORDERS_UPDATED);
  dispatch(EVENTS.CART_UPDATED);
}
