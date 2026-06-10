import { useState, useEffect } from 'react';
import { getCart, getCartTotal, placeOrder, getSession, getCurrentUser } from '@/lib/storage';
import { useToast } from '@/components/toast-provider';
import NoCapLayout from '@/layouts/nocap-layout';
import { t, formatPrice } from '@/lib/i18n';

export default function Checkout() {
    const { showToast } = useToast();
    const [cart, setCart] = useState(getCart());
    const [total, setTotal] = useState(getCartTotal());

    const [user, setUser] = useState(getCurrentUser());

    useEffect(() => {
        // Hydrate data purely on the client
        setCart(getCart());
        setTotal(getCartTotal());
        setUser(getCurrentUser());
    }, []);

    const isVip = user?.tier === 'VERIFIED' || user?.tier === 'GRAIL';
    const shippingCost = isVip ? 0 : 15;
    const finalTotal = total > 0 ? total + shippingCost : 0;

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();

        if (typeof window === 'undefined') return;

        if (!getSession()) {
            showToast(t('toast.login_required_order'), 'error');
            return;
        }

        if (cart.length === 0) {
            showToast(t('toast.cart_empty'), 'error');
            return;
        }

        placeOrder(cart, finalTotal);
        showToast(t('toast.order_success'), 'success');
        
        window.location.href = '/dashboard';
    };

    return (
        <NoCapLayout title={t('checkout.title')}>
            <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-80px)]">
                {/* LEFT COL: SHIPPING FORM */}
                <div className="w-full lg:w-1/2 p-6 md:p-12 lg:p-24 bg-canvas border-r border-hairline flex flex-col justify-center">
                    <h1 className="text-[32px] font-medium uppercase tracking-widest text-ink mb-12 leading-none">
                        {t('checkout.title')}
                    </h1>

                    <form onSubmit={handlePlaceOrder} className="flex flex-col gap-8 w-full max-w-xl">
                        <section className="flex flex-col gap-4">
                            <h2 className="text-[16px] font-bold uppercase tracking-widest text-ink border-b border-hairline pb-2">
                                {t('checkout.contact_info')}
                            </h2>
                            <div className="flex flex-col gap-2">
                                <label className="text-[12px] font-bold uppercase tracking-widest text-ink">Email</label>
                                <input 
                                    type="email" 
                                    required 
                                    placeholder="EMAIL ADDRESS"
                                    className="h-12 border border-hairline bg-transparent px-4 text-[14px] uppercase placeholder:text-mute focus:border-ink focus:outline-none rounded-none"
                                />
                            </div>
                        </section>

                        <section className="flex flex-col gap-4">
                            <h2 className="text-[16px] font-bold uppercase tracking-widest text-ink border-b border-hairline pb-2">
                                {t('checkout.shipping_address')}
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[12px] font-bold uppercase tracking-widest text-ink">{t('checkout.first_name')}</label>
                                    <input 
                                        type="text" 
                                        required 
                                        placeholder="FIRST NAME"
                                        className="h-12 border border-hairline bg-transparent px-4 text-[14px] uppercase placeholder:text-mute focus:border-ink focus:outline-none rounded-none"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[12px] font-bold uppercase tracking-widest text-ink">{t('checkout.last_name')}</label>
                                    <input 
                                        type="text" 
                                        required 
                                        placeholder="LAST NAME"
                                        className="h-12 border border-hairline bg-transparent px-4 text-[14px] uppercase placeholder:text-mute focus:border-ink focus:outline-none rounded-none"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[12px] font-bold uppercase tracking-widest text-ink">{t('checkout.address')}</label>
                                <input 
                                    type="text" 
                                    required 
                                    placeholder="STREET ADDRESS"
                                    className="h-12 border border-hairline bg-transparent px-4 text-[14px] uppercase placeholder:text-mute focus:border-ink focus:outline-none rounded-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[12px] font-bold uppercase tracking-widest text-ink">{t('checkout.city')}</label>
                                    <input 
                                        type="text" 
                                        required 
                                        placeholder="CITY"
                                        className="h-12 border border-hairline bg-transparent px-4 text-[14px] uppercase placeholder:text-mute focus:border-ink focus:outline-none rounded-none"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[12px] font-bold uppercase tracking-widest text-ink">{t('checkout.postal_code')}</label>
                                    <input 
                                        type="text" 
                                        required 
                                        placeholder="POSTAL CODE"
                                        className="h-12 border border-hairline bg-transparent px-4 text-[14px] uppercase placeholder:text-mute focus:border-ink focus:outline-none rounded-none"
                                    />
                                </div>
                            </div>
                        </section>

                        <button 
                            type="submit"
                            className="mt-8 h-16 w-full bg-ink text-canvas font-bold uppercase tracking-widest rounded-none transition-transform active:scale-[0.98] hover:bg-ink/90 flex items-center justify-center"
                        >
                            {t('action.place_order')}
                        </button>
                    </form>
                </div>

                {/* RIGHT COL: ORDER SUMMARY */}
                <div className="w-full lg:w-1/2 p-6 md:p-12 lg:p-24 bg-soft-cloud flex flex-col justify-start relative">
                    <div className="sticky top-24 flex flex-col gap-8 w-full max-w-xl mx-auto lg:mx-0">
                        <h2 className="text-[16px] font-bold uppercase tracking-widest text-ink border-b border-hairline pb-2">
                            {t('checkout.order_summary')}
                        </h2>

                        <div className="flex flex-col gap-6">
                            {cart.length === 0 ? (
                                <p className="text-[14px] uppercase font-medium text-mute">{t('cart.empty')}</p>
                            ) : (
                                cart.map((item) => (
                                    <div key={`${item.id}-${item.size}`} className="flex gap-4 items-center border border-hairline bg-canvas p-4">
                                        <div className="relative h-20 w-16 bg-soft-cloud shrink-0">
                                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                            <div className="absolute -top-2 -right-2 h-5 w-5 rounded-none bg-ink text-canvas text-[10px] font-bold flex items-center justify-center">
                                                {item.quantity}
                                            </div>
                                        </div>
                                        <div className="flex flex-col flex-1">
                                            <h3 className="text-[14px] font-medium uppercase text-ink leading-tight">{item.name}</h3>
                                            <p className="text-[12px] text-mute uppercase mt-1">{t('action.size')}: {item.size}</p>
                                        </div>
                                        <p className="text-[14px] font-medium text-ink">{formatPrice(item.price * item.quantity)}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="flex flex-col gap-4 border-t border-hairline pt-6">
                            <div className="flex justify-between text-[14px] font-medium uppercase text-mute">
                                <span>{t('cart.subtotal')}</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                            <div className="flex justify-between items-center text-[14px] font-medium uppercase text-mute">
                                <span>{t('checkout.shipping')}</span>
                                <div className="flex flex-col items-end gap-1">
                                    {isVip ? (
                                        <div className="flex items-center gap-2">
                                            <span className="bg-ink text-canvas text-[10px] font-bold px-2 py-1 tracking-widest">[ VIP FREE SHIPPING APPLIED ]</span>
                                            <span className="text-ink font-bold">{formatPrice(shippingCost)}</span>
                                        </div>
                                    ) : (
                                        <span>{total > 0 ? formatPrice(shippingCost) : formatPrice(0)}</span>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-between text-[16px] font-bold uppercase text-ink pt-4 border-t border-hairline">
                                <span>{t('cart.total')}</span>
                                <span>{formatPrice(finalTotal)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NoCapLayout>
    );
}
