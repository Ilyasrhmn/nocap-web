import { Link, usePage } from '@inertiajs/react';
import { useAppearance } from '@/hooks/use-appearance';
import { Menu, Moon, Sun, ShoppingBag, User, X, Plus, Minus } from 'lucide-react';
import { useState, type ReactElement } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

type CartSheetProps = {
    trigger: ReactElement;
};

function CartSheet({ trigger }: CartSheetProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>{trigger}</SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md border-l border-hairline bg-canvas p-0 flex flex-col">
                <SheetHeader className="p-6 border-b border-hairline flex flex-row items-center justify-between space-y-0">
                    <SheetTitle className="text-[20px] font-medium uppercase tracking-widest text-ink">Your Cart</SheetTitle>
                </SheetHeader>
                
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
                    {/* DEMO CART ITEM 1 */}
                    <div className="flex gap-4">
                        <div className="h-24 w-20 shrink-0 bg-soft-cloud">
                            <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=200&auto=format&fit=crop" alt="Product" className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-col flex-1 justify-between">
                            <div>
                                <div className="flex justify-between items-start">
                                    <h3 className="text-[14px] font-medium uppercase text-ink">NCP Heavyweight Hoodie</h3>
                                    <button className="text-mute hover:text-ink transition-colors"><X className="w-4 h-4" /></button>
                                </div>
                                <p className="text-[12px] text-mute uppercase mt-1">Size: L / Black</p>
                            </div>
                            <div className="flex justify-between items-end">
                                <div className="flex items-center gap-4 border border-hairline px-2 py-1">
                                    <button className="text-mute hover:text-ink"><Minus className="w-3 h-3" /></button>
                                    <span className="text-[14px] font-medium text-ink">1</span>
                                    <button className="text-mute hover:text-ink"><Plus className="w-3 h-3" /></button>
                                </div>
                                <p className="text-[14px] font-medium text-ink">$120.00</p>
                            </div>
                        </div>
                    </div>

                    {/* DEMO CART ITEM 2 */}
                    <div className="flex gap-4">
                        <div className="h-24 w-20 shrink-0 bg-soft-cloud">
                            <img src="https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=200&auto=format&fit=crop" alt="Product" className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-col flex-1 justify-between">
                            <div>
                                <div className="flex justify-between items-start">
                                    <h3 className="text-[14px] font-medium uppercase text-ink">NCP Tech Cargo</h3>
                                    <button className="text-mute hover:text-ink transition-colors"><X className="w-4 h-4" /></button>
                                </div>
                                <p className="text-[12px] text-mute uppercase mt-1">Size: M / Olive</p>
                            </div>
                            <div className="flex justify-between items-end">
                                <div className="flex items-center gap-4 border border-hairline px-2 py-1">
                                    <button className="text-mute hover:text-ink"><Minus className="w-3 h-3" /></button>
                                    <span className="text-[14px] font-medium text-ink">1</span>
                                    <button className="text-mute hover:text-ink"><Plus className="w-3 h-3" /></button>
                                </div>
                                <p className="text-[14px] font-medium text-ink">$145.00</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-hairline bg-soft-cloud flex flex-col gap-4">
                    <div className="flex justify-between items-center text-[16px] font-medium uppercase text-ink">
                        <span>Subtotal</span>
                        <span>$265.00</span>
                    </div>
                    <p className="text-[12px] text-mute uppercase">Shipping and taxes calculated at checkout.</p>
                    <button className="w-full bg-ink text-canvas hover:bg-ink/90 font-bold uppercase tracking-widest rounded-none h-14 mt-2 transition-transform active:scale-[0.98]">
                        Checkout
                    </button>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default function NoCapHeader() {
    const { auth } = usePage().props;
    const { updateAppearance, resolvedAppearance } = useAppearance();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Shop', href: '/drops' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Store', href: '/store' },
    ];

    const toggleTheme = () => {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    return (
        <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-hairline bg-canvas px-6 md:px-12 transition-colors duration-300 shrink-0">
            <div className="flex items-center gap-3">
                {/* LOGO */}
                <Link href="/" className="flex items-center">
                    <img 
                        src={resolvedAppearance === 'dark' ? '/images/logo-white.png' : '/images/logo-black.png'} 
                        alt="NO CAP" 
                        className="h-15 w-auto object-contain"
                    />
                </Link>
            </div>
            
            <div className="flex items-center h-full">
                {/* NAVIGATION LINKS */}
                <nav className="hidden items-center gap-8 text-[14px] font-bold uppercase tracking-widest text-ink md:flex h-full px-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="hover:text-mute transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* VERTICAL SEPARATOR */}
                <div className="hidden md:block h-8 w-px bg-hairline mx-4"></div>

                {/* ICONS */}
                <div className="hidden md:flex items-center gap-6">
                    <button 
                        onClick={toggleTheme} 
                        className="flex items-center justify-center text-ink hover:text-mute transition-colors"
                        aria-label="Toggle Theme"
                    >
                        {resolvedAppearance === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                    </button>
                    <CartSheet
                        trigger={
                            <button type="button" className="flex items-center justify-center text-ink hover:text-mute transition-colors relative group">
                                <ShoppingBag className="h-6 w-6" />
                                <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-canvas transition-colors group-hover:bg-mute">
                                    2
                                </span>
                            </button>
                        }
                    />

                    <Link 
                        href={auth.user ? "/dashboard" : "/login"} 
                        className="flex items-center justify-center text-ink hover:text-mute transition-colors"
                    >
                        <User className="h-6 w-6" />
                    </Link>
                </div>

                {/* MOBILE MENU */}
                <div className="md:hidden">
                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <SheetTrigger asChild>
                            <button
                                type="button"
                                aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
                                aria-expanded={isMenuOpen}
                                className="flex h-10 w-10 items-center justify-center text-ink transition-colors hover:text-mute"
                            >
                                {isMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
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
                                            {resolvedAppearance === 'dark' ? (
                                                <Sun className="h-5 w-5" />
                                            ) : (
                                                <Moon className="h-5 w-5" />
                                            )}
                                            <span>
                                                {resolvedAppearance === 'dark'
                                                    ? 'Light Mode'
                                                    : 'Dark Mode'}
                                            </span>
                                        </span>
                                    </button>
                                    <CartSheet
                                        trigger={
                                            <button
                                                type="button"
                                                className="flex items-center justify-between transition-colors hover:text-mute"
                                            >
                                                <span className="flex items-center gap-3">
                                                    <ShoppingBag className="h-5 w-5" />
                                                    <span>Cart</span>
                                                </span>
                                                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-bold text-canvas">
                                                    2
                                                </span>
                                            </button>
                                        }
                                    />
                                    <Link
                                        href={auth.user ? '/dashboard' : '/login'}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center justify-between transition-colors hover:text-mute"
                                    >
                                        <span className="flex items-center gap-3">
                                            <User className="h-5 w-5" />
                                            <span>{auth.user ? 'Account' : 'Login'}</span>
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
