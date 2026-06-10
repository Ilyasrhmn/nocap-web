import { Link } from '@inertiajs/react';
import { useAppearance } from '@/hooks/use-appearance';
import { Menu, Moon, Sun, ShoppingCart, User, X, Plus, Minus } from 'lucide-react';
import { useState, useEffect, useRef, type ReactElement } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { getCart, getCartCount, getCartTotal, removeFromCart, updateCartQuantity, getSession, getCurrentUser, EVENTS } from '@/lib/storage';
import { useToast } from '@/components/toast-provider';
import ConfirmationModal from '@/components/confirmation-modal';

// ═══════════════════════════════════════════════════
// CART SHEET — reads from localStorage reactively
// ═══════════════════════════════════════════════════
type CartSheetProps = {
    trigger: ReactElement;
};

function CartSheet({ trigger }: CartSheetProps) {
    const { showToast } = useToast();
    const [cart, setCart] = useState(getCart());
    const [total, setTotal] = useState(getCartTotal());

    const [itemToDelete, setItemToDelete] = useState<{id: number | string, size: string} | null>(null);

    // ── Sync on Custom Event ────────────────────────
    useEffect(() => {
        const sync = () => {
            setCart(getCart());
            setTotal(getCartTotal());
        };
        if (typeof window !== 'undefined') {
            window.addEventListener(EVENTS.CART_UPDATED, sync);
            return () => window.removeEventListener(EVENTS.CART_UPDATED, sync);
        }
    }, []);

    const handleRemoveClick = (id: number | string, size: string) => {
        setItemToDelete({ id, size });
    };

    const confirmRemove = () => {
        if (itemToDelete) {
            removeFromCart(itemToDelete.id, itemToDelete.size);
            showToast('ITEM REMOVED FROM CART', 'success');
            setItemToDelete(null);
        }
    };

    const handleQuantity = (id: number | string, size: string, delta: number) => {
        updateCartQuantity(id, size, delta);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>{trigger}</SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md border-l border-hairline bg-canvas p-0 flex flex-col">
                <SheetHeader className="p-6 border-b border-hairline flex flex-row items-center justify-between space-y-0">
                    <SheetTitle className="text-[20px] font-medium uppercase tracking-widest text-ink">Your Cart</SheetTitle>
                </SheetHeader>
                
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
                    {cart.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                            <ShoppingCart className="w-12 h-12 text-mute mb-4" />
                            <p className="text-[16px] font-medium text-ink uppercase tracking-widest">Cart is Empty</p>
                            <p className="text-[14px] text-mute mt-2">Add some gear to get started.</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="flex gap-4">
                                <div className="h-24 w-20 shrink-0 bg-soft-cloud">
                                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex flex-col flex-1 justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-[14px] font-medium uppercase text-ink">{item.name}</h3>
                                            <button 
                                                onClick={() => handleRemoveClick(item.id, item.size)}
                                                className="text-mute hover:text-ink transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="text-[12px] text-mute uppercase mt-1">Size: {item.size}</p>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="flex items-center gap-4 border border-hairline px-2 py-1">
                                            <button 
                                                onClick={() => handleQuantity(item.id, item.size, -1)}
                                                className="text-mute hover:text-ink"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="text-[14px] font-medium text-ink">{item.quantity}</span>
                                            <button 
                                                onClick={() => handleQuantity(item.id, item.size, 1)}
                                                className="text-mute hover:text-ink"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <p className="text-[14px] font-medium text-ink">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-6 border-t border-hairline bg-soft-cloud flex flex-col gap-4">
                        <div className="flex justify-between items-center text-[16px] font-medium uppercase text-ink">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <p className="text-[12px] text-mute uppercase">Shipping and taxes calculated at checkout.</p>
                        <a href="/checkout" className="flex items-center justify-center w-full bg-ink text-canvas hover:bg-ink/90 font-bold uppercase tracking-widest rounded-none h-14 mt-2 transition-transform active:scale-[0.98]">
                            Checkout
                        </a>
                    </div>
                )}

                <ConfirmationModal 
                    isOpen={!!itemToDelete}
                    onClose={() => setItemToDelete(null)}
                    onConfirm={confirmRemove}
                />
            </SheetContent>
        </Sheet>
    );
}

// ═══════════════════════════════════════════════════
// MAIN HEADER
// ═══════════════════════════════════════════════════
export default function NoCapHeader() {
    const { updateAppearance, resolvedAppearance } = useAppearance();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // ── Hydrate on mount + listen for cart events ───
    useEffect(() => {
        const syncCart = () => setCartCount(getCartCount());
        syncCart(); // initial hydration

        if (typeof window !== 'undefined') {
            window.addEventListener(EVENTS.CART_UPDATED, syncCart);
            return () => window.removeEventListener(EVENTS.CART_UPDATED, syncCart);
        }
    }, []);

    // ── Hydrate on mount + listen for auth events ───
    useEffect(() => {
        const syncAuth = () => setIsLoggedIn(!!getSession());
        syncAuth(); // initial hydration

        if (typeof window !== 'undefined') {
            window.addEventListener(EVENTS.AUTH_UPDATED, syncAuth);
            return () => window.removeEventListener(EVENTS.AUTH_UPDATED, syncAuth);
        }
    }, []);

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Shop', href: '/drops' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Store', href: '/store' },
    ];

    const [isHidden, setIsHidden] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
                setIsHidden(true);
            } else if (currentScrollY < lastScrollY.current) {
                setIsHidden(false);
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    const accountHref = isLoggedIn ? '/dashboard' : '/auth/login';
    const accountLabel = isLoggedIn ? 'Account' : 'Login';

    return (
        <header className={`sticky top-0 z-50 flex h-20 items-center justify-between border-b border-hairline bg-canvas px-6 md:px-12 shrink-0 transition-transform duration-500 ease-out ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}>
            <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center">
                    <img 
                        src="/images/logo-black.png" 
                        alt="NO CAP" 
                        className="h-15 w-auto object-contain dark:hidden"
                    />
                    <img 
                        src="/images/logo-white.png" 
                        alt="NO CAP" 
                        className="h-15 w-auto object-contain hidden dark:block"
                    />
                </Link>
            </div>
            
            <div className="flex items-center h-full">
                {/* NAVIGATION LINKS */}
                <nav className="hidden items-center gap-8 text-[15px] font-medium uppercase tracking-[0.15em] text-ink md:flex h-full px-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="relative inline-block after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* VERTICAL SEPARATOR */}
                <div className="hidden md:block h-8 w-px bg-hairline mx-4"></div>

                {/* ICONS */}
                <div className="hidden md:flex items-center gap-4">
                    <button 
                        onClick={toggleTheme} 
                        className="group flex h-12 w-12 items-center justify-center rounded-full text-ink transition-all duration-300"
                        aria-label="Toggle Theme"
                    >
                        <Moon className="h-6 w-6 dark:hidden transition-all duration-300 group-hover:fill-current group-hover:scale-110" strokeWidth={1.25} />
                        <Sun className="h-6 w-6 hidden dark:block transition-all duration-300 group-hover:fill-current group-hover:scale-110" strokeWidth={1.25} />
                    </button>
                    <CartSheet
                        trigger={
                            <button type="button" className="group flex h-12 w-12 items-center justify-center rounded-full text-ink transition-all duration-300 relative">
                                <ShoppingCart className="h-6 w-6 transition-all duration-300 group-hover:fill-current group-hover:scale-110" strokeWidth={1.25} />
                                {cartCount > 0 && (
                                    <span className="absolute top-2 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-canvas transition-colors duration-300 group-hover:bg-canvas group-hover:text-ink">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        }
                    />
                    <Link 
                        href={accountHref} 
                        className="group flex h-12 w-12 items-center justify-center rounded-full text-ink transition-all duration-300"
                    >
                        <User className="h-6 w-6 transition-all duration-300 group-hover:fill-current group-hover:scale-110" strokeWidth={1.25} />
                    </Link>
                </div>

                {/* MOBILE MENU */}
                <div className="flex items-center gap-4 md:hidden">
                    <CartSheet
                        trigger={
                            <button type="button" className="group flex h-10 w-10 items-center justify-center rounded-full text-ink transition-all duration-300 relative">
                                <ShoppingCart className="h-6 w-6 transition-all duration-300 group-hover:fill-current group-hover:scale-110" strokeWidth={1.25} />
                                {cartCount > 0 && (
                                    <span className="absolute top-1 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-ink text-[8px] font-bold text-canvas transition-colors duration-300 group-hover:bg-canvas group-hover:text-ink">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        }
                    />
                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <SheetTrigger asChild>
                            <button
                                type="button"
                                aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
                                aria-expanded={isMenuOpen}
                                className="group flex h-10 w-10 items-center justify-center rounded-full text-ink transition-all duration-300"
                            >
                                {isMenuOpen ? (
                                    <X className="h-6 w-6 transition-all duration-300 group-hover:scale-110" strokeWidth={1.25} />
                                ) : (
                                    <Menu className="h-6 w-6 transition-all duration-300 group-hover:fill-current group-hover:scale-110" strokeWidth={1.25} />
                                )}
                            </button>
                        </SheetTrigger>
                        <SheetContent side="left" hideClose className="w-full max-w-xs border-r border-hairline bg-canvas p-0">
                            <SheetHeader className="border-b border-hairline p-6">
                                <SheetTitle className="text-[16px] font-bold uppercase tracking-widest text-ink">
                                    Menu
                                </SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-5 p-6 text-[14px] font-bold uppercase tracking-widest text-ink">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="transition-colors hover:text-mute"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                            <div className="border-t border-hairline p-6 pt-5">
                                <div className="flex flex-col gap-4 text-[14px] font-bold uppercase tracking-widest text-ink">
                                    <button
                                        type="button"
                                        onClick={toggleTheme}
                                        className="flex items-center justify-between transition-colors hover:text-mute"
                                    >
                                        <span className="flex items-center gap-3">
                                            <Moon className="h-5 w-5 dark:hidden" strokeWidth={1.25} />
                                            <Sun className="h-5 w-5 hidden dark:block" strokeWidth={1.25} />
                                            <span className="dark:hidden">Dark Mode</span>
                                            <span className="hidden dark:block">Light Mode</span>
                                        </span>
                                    </button>
                                    <Link
                                        href={accountHref}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center justify-between transition-colors hover:text-mute"
                                    >
                                        <span className="flex items-center gap-3">
                                            <User className="h-5 w-5" strokeWidth={1.25} />
                                            <span>{accountLabel}</span>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
