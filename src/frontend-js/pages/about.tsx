import { Head, Link } from '@inertiajs/react';
import NoCapLayout from '@/layouts/nocap-layout';
import { t } from '@/lib/i18n';

export default function About() {
    return (
        <NoCapLayout title="About">
            <div className="flex-1 w-full max-w-[1440px] mx-auto flex flex-col md:flex-row min-h-[calc(100vh-140px)]">
                <div className="flex-1 p-8 md:p-16 flex flex-col justify-center border-r border-hairline">
                    <h1 className="text-[72px] md:text-[96px] font-black uppercase leading-none tracking-tighter text-ink mb-8">
                        NO CAP
                    </h1>
                    <div className="h-px w-24 bg-ink mb-8"></div>
                    <p className="text-[20px] font-medium uppercase tracking-widest text-ink mb-4">
                        EST 2026 05 05
                    </p>
                    <p className="text-[16px] text-mute max-w-xl leading-relaxed">
                        {t('about.desc_full')}
                    </p>
                </div>
                <div className="flex-1 bg-ink text-canvas p-8 md:p-16 flex flex-col justify-center">
                    <h2 className="text-[32px] md:text-[48px] font-bold uppercase leading-none tracking-tight mb-8">
                        {t('philosophy.title')}
                    </h2>
                    <ul className="flex flex-col gap-6 text-[14px] font-medium uppercase tracking-widest">
                        <li className="flex gap-4">
                            <span className="text-mute">01.</span>
                            <span>{t('philosophy.p1')}</span>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-mute">02.</span>
                            <span>{t('philosophy.p2')}</span>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-mute">03.</span>
                            <span>{t('philosophy.p3')}</span>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-mute">04.</span>
                            <span>{t('philosophy.p4')}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </NoCapLayout>
    );
}
