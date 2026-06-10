import { Head, Link } from '@inertiajs/react';
import AppearanceTabs from '@/components/appearance-tabs';
import NoCapLayout from '@/layouts/nocap-layout';

export default function Appearance() {
    return (
        <NoCapLayout title="Appearance Settings">
            <div className="flex flex-col px-6 py-8 md:px-12 md:py-12 gap-12 w-full max-w-3xl mx-auto">
                <div className="flex items-center gap-4 text-[14px] font-medium text-mute uppercase tracking-widest mb-4">
                    <Link href="/dashboard" className="hover:text-ink transition-colors">Account</Link>
                    <span>/</span>
                    <span className="text-ink">Appearance</span>
                </div>

                <div className="space-y-12">
                    <section className="flex flex-col border border-hairline p-8 rounded-none bg-canvas">
                        <div className="mb-8">
                            <h2 className="text-[24px] font-medium uppercase leading-tight text-ink mb-2">Appearance Settings</h2>
                            <p className="text-[14px] text-mute font-medium uppercase tracking-widest">Update your account's appearance settings.</p>
                        </div>
                        <AppearanceTabs />
                    </section>
                </div>
            </div>
        </NoCapLayout>
    );
}
