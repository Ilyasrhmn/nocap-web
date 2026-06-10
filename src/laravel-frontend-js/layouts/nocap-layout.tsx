import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import NoCapHeader from '@/components/nocap-header';
import NoCapFooter from '@/components/nocap-footer';

export default function NoCapLayout({ children, title }: { children: ReactNode, title?: string }) {
    return (
        <>
            {title && <Head title={`${title} | NO CAP`} />}
            <div className="min-h-screen flex flex-col bg-canvas text-ink font-sans selection:bg-ink selection:text-canvas transition-colors duration-300">
                <NoCapHeader />

                <div className="flex-1 w-full flex flex-col mx-auto">
                    {children}
                </div>

                <NoCapFooter />
            </div>
        </>
    );
}
