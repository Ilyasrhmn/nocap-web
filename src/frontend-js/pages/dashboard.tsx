import { Head, Link, usePage } from '@inertiajs/react';
import { Package, Heart, User, MapPin, CreditCard, LogOut } from 'lucide-react';
import NoCapLayout from '@/layouts/nocap-layout';

import AccountSidebar from '@/components/account-sidebar';

export default function Dashboard() {
    const { auth } = usePage().props;

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
                                <span className="text-[16px] font-medium text-ink">{auth.user?.name}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[12px] font-medium text-mute uppercase tracking-widest mb-1">Email</span>
                                <span className="text-[16px] font-medium text-ink">{auth.user?.email}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[12px] font-medium text-mute uppercase tracking-widest mb-1">Member Since</span>
                                <span className="text-[16px] font-medium text-ink">
                                    {new Date(auth.user?.created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </span>
                            </div>
                        </div>
                        <div className="mt-8 border-t border-hairline pt-8">
                            <Link href="/settings/profile" className="flex h-12 w-max items-center justify-center rounded-none bg-ink px-8 text-[14px] font-medium uppercase tracking-widest text-canvas transition-transform active:scale-[0.98] hover:bg-ink/90">
                                Edit Profile
                            </Link>
                        </div>
                    </section>

                    <section className="flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-[20px] font-medium uppercase leading-tight text-ink">Recent Orders</h2>
                            <Link href="#" className="text-[14px] font-medium text-mute underline hover:text-ink uppercase tracking-widest">View All</Link>
                        </div>
                        <div className="flex flex-col items-center justify-center py-16 bg-soft-cloud border border-hairline rounded-none">
                            <Package className="w-12 h-12 text-mute mb-4" />
                            <p className="text-[16px] font-medium text-ink uppercase tracking-widest">No Recent Orders</p>
                            <p className="text-[14px] text-mute mt-2">You haven't placed any orders yet.</p>
                            <Link href="/store" className="mt-6 flex h-12 w-max items-center justify-center rounded-none bg-ink px-8 text-[14px] font-medium uppercase tracking-widest text-canvas transition-transform active:scale-[0.98] hover:bg-ink/90">
                                Start Shopping
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </NoCapLayout>
    );
}
