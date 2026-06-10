import { Head, Link } from '@inertiajs/react';
import { Heart, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import NoCapLayout from '@/layouts/nocap-layout';
import AccountSidebar from '@/components/account-sidebar';
import { getSession, getGrails, removeFromGrails, EVENTS } from '@/lib/storage';
import { useToast } from '@/components/toast-provider';
import ConfirmationModal from '@/components/confirmation-modal';
import { t, formatPrice } from '@/lib/i18n';

export default function Favorites() {
    const { showToast } = useToast();
    const [grails, setGrails] = useState(getGrails());

    // ── Route Protection ────────────────────────────
    useEffect(() => {
        if (typeof window !== 'undefined' && !getSession()) {
            window.location.href = '/auth/login';
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

    const [itemToDelete, setItemToDelete] = useState<number | string | null>(null);

    const handleRemoveClick = (id: number | string) => {
        setItemToDelete(id);
    };

    const confirmRemove = () => {
        if (itemToDelete !== null) {
            removeFromGrails(itemToDelete);
            showToast(t('toast.removed_from_grails'), 'success');
            setItemToDelete(null);
        }
    };

    return (
        <NoCapLayout title="FAVORITES">
            <div className="flex flex-col md:flex-row px-6 py-8 md:px-12 md:py-12 gap-12 w-full">
                <AccountSidebar activeMenu="favorites" />

                <div className="flex-1 flex flex-col gap-12">
                    <section className="flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-[24px] font-medium uppercase leading-tight text-ink">My Grails</h2>
                            <span className="text-[14px] font-medium text-mute uppercase tracking-widest">{grails.length} items</span>
                        </div>

                        {grails.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 bg-soft-cloud border border-hairline rounded-none">
                                <Heart className="w-12 h-12 text-mute mb-4" />
                                <p className="text-[16px] font-medium text-ink uppercase tracking-widest">Your List is Empty</p>
                                <p className="text-[14px] text-mute mt-2 text-center max-w-sm">
                                    Save items you love to build your collection. They'll wait for you here.
                                </p>
                                <Link href="/drops" className="mt-8 flex h-12 w-max items-center justify-center rounded-none bg-ink px-8 text-[14px] font-medium uppercase tracking-widest text-canvas transition-transform hover:scale-[0.98]">
                                    Discover Gear
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {grails.map((item) => (
                                    <div key={item.id} className="group relative flex flex-col bg-canvas border border-hairline">
                                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-soft-cloud">
                                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                            <button
                                                onClick={() => handleRemoveClick(item.id)}
                                                className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center bg-canvas border border-hairline text-mute hover:text-sale transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="p-3 flex justify-between items-start">
                                            <div>
                                                <h3 className="text-[14px] font-medium text-ink uppercase">{item.name}</h3>
                                                {item.category && (
                                                    <p className="text-[12px] font-medium text-mute uppercase mt-1">{item.category}</p>
                                                )}
                                            </div>
                                            <p className="text-[14px] font-medium text-ink">{formatPrice(item.price)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <ConfirmationModal 
                            isOpen={itemToDelete !== null}
                            onClose={() => setItemToDelete(null)}
                            onConfirm={confirmRemove}
                        />
                    </section>
                </div>
            </div>
        </NoCapLayout>
    );
}
