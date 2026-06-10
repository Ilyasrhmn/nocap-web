import { useState, useEffect } from 'react';
import { getCart, getCartTotal, placeOrder, getSession } from '@/lib/storage';
import { useToast } from '@/components/toast-provider';
import NoCapLayout from '@/layouts/nocap-layout';

export default function Checkout() {
    const { showToast } = useToast();
    const [cart, setCart] = useState(getCart());
    const [total, setTotal] = useState(getCartTotal());

    useEffect(() => {
        // Hydrate data purely on the client
        setCart(getCart());
        setTotal(getCartTotal());
    }, []);

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();

        if (typeof window === 'undefined') return;

        if (!getSession()) {
            showToast('LOGIN REQUIRED TO COMPLETE ORDER. [ LOGIN HERE ]', 'error');
            return;
        }

        if (cart.length === 0) {
            showToast('YOUR CART IS EMPTY', 'error');
            return;
        }

        placeOrder(cart, total);
        showToast('ORDER PLACED SUCCESSFULLY. THANK YOU.', 'success');
        
        window.location.href = '/dashboard';
    };

    return (
        <NoCapLayout title="CHECKOUT">
            <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-80px)]">
                {/* LEFT COL: SHIPPING FORM */}
                <div className="w-full lg:w-1/2 p-6 md:p-12 lg:p-24 bg-canvas border-r border-hairline flex flex-col justify-center">
                    <h1 className="text-[32px] font-medium uppercase tracking-widest text-ink mb-12 leading-none">
                        Checkout
                    </h1>

                    <form onSubmit={handlePlaceOrder} className="flex flex-col gap-8 w-full max-w-xl">
                        <section className="flex flex-col gap-4">
                            <h2 className="text-[16px] font-bold uppercase tracking-widest text-ink border-b border-hairline pb-2">
                                Contact Information
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
                                Shipping Address
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[12px] font-bold uppercase tracking-widest text-ink">First Name</label>
                                    <input 
                                        type="text" 
                                        required 
                                        placeholder="FIRST NAME"
                                        className="h-12 border border-hairline bg-transparent px-4 text-[14px] uppercase placeholder:text-mute focus:border-ink focus:outline-none rounded-none"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[12px] font-bold uppercase tracking-widest text-ink">Last Name</label>
                                    <input 
                                        type="text" 
                                        required 
                                        placeholder="LAST NAME"
                                        className="h-12 border border-hairline bg-transparent px-4 text-[14px] uppercase placeholder:text-mute focus:border-ink focus:outline-none rounded-none"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[12px] font-bold uppercase tracking-widest text-ink">Address</label>
                                <input 
                                    type="text" 
                                    required 
                                    placeholder="STREET ADDRESS"
                                    className="h-12 border border-hairline bg-transparent px-4 text-[14px] uppercase placeholder:text-mute focus:border-ink focus:outline-none rounded-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[12px] font-bold uppercase tracking-widest text-ink">City</label>
                                    <input 
                                        type="text" 
                                        required 
                                        placeholder="CITY"
                                        className="h-12 border border-hairline bg-transparent px-4 text-[14px] uppercase placeholder:text-mute focus:border-ink focus:outline-none rounded-none"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[12px] font-bold uppercase tracking-widest text-ink">Postal Code</label>
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
                            Place Order
                        </button>
                    </form>
                </div>

                {/* RIGHT COL: ORDER SUMMARY */}
                <div className="w-full lg:w-1/2 p-6 md:p-12 lg:p-24 bg-soft-cloud flex flex-col justify-start relative">
                    <div className="sticky top-24 flex flex-col gap-8 w-full max-w-xl mx-auto lg:mx-0">
                        <h2 className="text-[16px] font-bold uppercase tracking-widest text-ink border-b border-hairline pb-2">
                            Order Summary
                        </h2>

                        <div className="flex flex-col gap-6">
                            {cart.length === 0 ? (
                                <p className="text-[14px] uppercase font-medium text-mute">Your cart is empty.</p>
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
                                            <p className="text-[12px] text-mute uppercase mt-1">Size: {item.size}</p>
                                        </div>
                                        <p className="text-[14px] font-medium text-ink">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="flex flex-col gap-4 border-t border-hairline pt-6">
                            <div className="flex justify-between text-[14px] font-medium uppercase text-mute">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-[14px] font-medium uppercase text-mute">
                                <span>Shipping</span>
                                <span>Calculated at next step</span>
                            </div>
                            <div className="flex justify-between text-[16px] font-bold uppercase text-ink pt-4 border-t border-hairline">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NoCapLayout>
    );
}
