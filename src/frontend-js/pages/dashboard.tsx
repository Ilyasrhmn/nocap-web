import { Head, Link } from '@inertiajs/react';
import { Package, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import NoCapLayout from '@/layouts/nocap-layout';
import AccountSidebar from '@/components/account-sidebar';
import { getCurrentUser, getSession, getGrails, removeFromGrails, getOrders, EVENTS } from '@/lib/storage';
import { useToast } from '@/components/toast-provider';
import ConfirmationModal from '@/components/confirmation-modal';
import { t, formatPrice } from '@/lib/i18n';

export default function Dashboard() {
    const { showToast } = useToast();
    const [user, setUser] = useState(getCurrentUser());
    const [grails, setGrails] = useState(getGrails());
    const [orders, setOrders] = useState(getOrders());

    // ── Route Protection ────────────────────────────
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (!getSession()) {
                window.location.href = '/auth/login';
            }
        }
    }, []);

    // ── Listen for auth changes ─────────────────────
    useEffect(() => {
        const handleAuthUpdate = () => setUser(getCurrentUser());
        if (typeof window !== 'undefined') {
            window.addEventListener(EVENTS.AUTH_UPDATED, handleAuthUpdate);
            return () => window.removeEventListener(EVENTS.AUTH_UPDATED, handleAuthUpdate);
        }
    }, []);

    // ── Listen for grails changes ───────────────────
    useEffect(() => {
        const handleGrailsUpdate = () => setGrails(getGrails());
        if (typeof window !== 'undefined') {
            window.addEventListener(EVENTS.GRAILS_UPDATED, handleGrailsUpdate);
            return () => window.removeEventListener(EVENTS.GRAILS_UPDATED, handleGrailsUpdate);
        }
    }, []);

    // ── Listen for order changes ────────────────────
    useEffect(() => {
        const handleOrdersUpdate = () => setOrders(getOrders());
        if (typeof window !== 'undefined') {
            window.addEventListener(EVENTS.ORDERS_UPDATED, handleOrdersUpdate);
            return () => window.removeEventListener(EVENTS.ORDERS_UPDATED, handleOrdersUpdate);
        }
    }, []);

    const [itemToDelete, setItemToDelete] = useState<number | string | null>(null);

    const handleRemoveGrailClick = (id: number | string) => {
        setItemToDelete(id);
    };

    const confirmRemoveGrail = () => {
        if (itemToDelete !== null) {
            removeFromGrails(itemToDelete);
            showToast(t('toast.removed_from_grails'), 'success');
            setItemToDelete(null);
        }
    };

    if (!user) return null; // guard: wait for redirect

    return (
        <NoCapLayout title="ACCOUNT">
            <div className="flex flex-col md:flex-row px-6 py-8 md:px-12 md:py-12 gap-12 w-full">
                
                <AccountSidebar activeMenu="profile" />

                {/* ACCOUNT CONTENT */}
                <div className="flex-1 flex flex-col gap-12">
                    <section className="flex flex-col border border-hairline p-8 rounded-none">
                        <h2 className="text-[20px] font-medium uppercase leading-tight text-ink mb-6">Profile Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col">
                                <span className="text-[12px] font-medium text-mute uppercase tracking-widest mb-1">Name</span>
                                <span className="text-[16px] font-medium text-ink">{user.name}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[12px] font-medium text-mute uppercase tracking-widest mb-1">Email</span>
                                <span className="text-[16px] font-medium text-ink">{user.email}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[12px] font-medium text-mute uppercase tracking-widest mb-1">Member Since</span>
                                <span className="text-[16px] font-medium text-ink">
                                    {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </span>
                            </div>
                        </div>
                        <div className="mt-8 border-t border-hairline pt-8">
                            <Link href="/settings/profile" className="flex h-12 w-max items-center justify-center rounded-none bg-ink px-8 text-[14px] font-medium uppercase tracking-widest text-canvas transition-transform active:scale-[0.98] hover:bg-ink/90">
                                Edit Profile
                            </Link>
                        </div>
                    </section>

                    {/* RECENT ORDERS */}
                    <section className="flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-[20px] font-medium uppercase leading-tight text-ink">Recent Orders</h2>
                            <Link href="/orders" className="text-[14px] font-medium text-mute underline hover:text-ink uppercase tracking-widest">View All</Link>
                        </div>
                        {orders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 bg-soft-cloud border border-hairline rounded-none">
                                <Package className="w-12 h-12 text-mute mb-4" />
                                <p className="text-[16px] font-medium text-ink uppercase tracking-widest">No Recent Orders</p>
                                <p className="text-[14px] text-mute mt-2">You haven't placed any orders yet.</p>
                                <a href="/drops" className="mt-6 flex h-12 w-max items-center justify-center rounded-none bg-ink px-8 text-[14px] font-medium uppercase tracking-widest text-canvas transition-transform active:scale-[0.98] hover:bg-ink/90">
                                    Start Shopping
                                </a>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6">
                                {orders.slice(0, 3).map((order) => (
                                    <div key={order.orderId} className="flex flex-col border border-hairline bg-canvas p-6">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                            <div className="flex flex-col">
                                                <span className="text-[12px] font-medium text-mute uppercase tracking-widest">Order Number</span>
                                                <span className="text-[16px] font-bold text-ink uppercase">{order.orderId}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[12px] font-medium text-mute uppercase tracking-widest">Date</span>
                                                <span className="text-[14px] font-medium text-ink uppercase">
                                                    {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[12px] font-medium text-mute uppercase tracking-widest">Total</span>
                                                <span className="text-[14px] font-bold text-ink uppercase">{formatPrice(order.total)}</span>
                                            </div>
                                        </div>

                                        {/* BRUTALIST ORDER TRACKER */}
                                        <div className="flex flex-col gap-2 mt-2 pt-6 border-t border-hairline">
                                            <span className="text-[12px] font-bold text-ink uppercase tracking-widest mb-2">Track Package</span>
                                            <div className="grid grid-cols-3 gap-2 h-10 w-full">
                                                <div className={`flex items-center justify-center border border-hairline text-[10px] font-bold tracking-widest uppercase transition-colors ${
                                                    ['PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order.status) ? 'bg-ink text-canvas' : 'bg-soft-cloud text-mute'
                                                }`}>
                                                    Processing
                                                </div>
                                                <div className={`flex items-center justify-center border border-hairline text-[10px] font-bold tracking-widest uppercase transition-colors ${
                                                    ['SHIPPED', 'DELIVERED'].includes(order.status) ? 'bg-ink text-canvas' : 'bg-soft-cloud text-mute'
                                                }`}>
                                                    Shipped
                                                </div>
                                                <div className={`flex items-center justify-center border border-hairline text-[10px] font-bold tracking-widest uppercase transition-colors ${
                                                    order.status === 'DELIVERED' ? 'bg-ink text-canvas' : 'bg-soft-cloud text-mute'
                                                }`}>
                                                    Delivered
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* MY GRAILS */}
                    <section className="flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-[20px] font-medium uppercase leading-tight text-ink">My Grails</h2>
                            <Link href="/favorites" className="text-[14px] font-medium text-mute underline hover:text-ink uppercase tracking-widest">View All</Link>
                        </div>
                        {grails.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 bg-soft-cloud border border-hairline rounded-none">
                                <p className="text-[16px] font-medium text-ink uppercase tracking-widest">No Grails Yet</p>
                                <p className="text-[14px] text-mute mt-2">Save your favourite items from product pages.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {grails.slice(0, 6).map((item) => (
                                    <div key={item.id} className="group relative flex flex-col bg-canvas border border-hairline">
                                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-soft-cloud">
                                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                            <button
                                                onClick={() => handleRemoveGrailClick(item.id)}
                                                className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center bg-canvas border border-hairline text-mute hover:text-sale transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="p-3">
                                            <h3 className="text-[14px] font-medium text-ink uppercase">{item.name}</h3>
                                            <p className="text-[14px] font-medium text-mute">{formatPrice(item.price)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <ConfirmationModal 
                            isOpen={itemToDelete !== null}
                            onClose={() => setItemToDelete(null)}
                            onConfirm={confirmRemoveGrail}
                        />
                    </section>
                </div>
            </div>
        </NoCapLayout>
    );
}
