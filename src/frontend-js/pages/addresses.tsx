import { Head, Link } from '@inertiajs/react';
import { MapPin } from 'lucide-react';
import { useEffect } from 'react';
import NoCapLayout from '@/layouts/nocap-layout';
import AccountSidebar from '@/components/account-sidebar';
import { getSession } from '@/lib/storage';

export default function Addresses() {
    useEffect(() => {
        if (typeof window !== 'undefined' && !getSession()) {
            window.location.href = '/auth/login';
        }
    }, []);
    return (
        <NoCapLayout title="ADDRESSES">
            <div className="flex flex-col md:flex-row px-6 py-8 md:px-12 md:py-12 gap-12 w-full">
                <AccountSidebar activeMenu="addresses" />

                <div className="flex-1 flex flex-col gap-12">
                    <section className="flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-[24px] font-medium uppercase leading-tight text-ink">Shipping Addresses</h2>
                        </div>
                        <div className="flex flex-col items-center justify-center py-24 bg-soft-cloud border border-hairline rounded-none">
                            <MapPin className="w-12 h-12 text-mute mb-4" />
                            <p className="text-[16px] font-medium text-ink uppercase tracking-widest">No Addresses Saved</p>
                            <p className="text-[14px] text-mute mt-2 text-center max-w-sm">
                                Save your shipping addresses here for a faster checkout experience.
                            </p>
                            <button className="mt-8 flex h-12 w-max items-center justify-center rounded-none bg-ink px-8 text-[14px] font-medium uppercase tracking-widest text-canvas transition-transform hover:scale-[0.98]">
                                Add New Address
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </NoCapLayout>
    );
}
