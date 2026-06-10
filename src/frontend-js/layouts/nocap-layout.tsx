import { Head } from '@inertiajs/react';
import React from 'react';
import NoCapHeader from '@/components/nocap-header';
import NoCapFooter from '@/components/nocap-footer';
import SmoothScrolling from '@/components/smooth-scrolling';

export default function NoCapLayout({ children, title }: { children: React.ReactNode, title?: string }) {
    return (
        <SmoothScrolling>
            {title && <Head title={`${title} | NO CAP`} />}
            <div className="min-h-screen flex flex-col bg-canvas text-ink font-sans selection:bg-ink selection:text-canvas transition-colors duration-300">
                <NoCapHeader />

                <div className="flex-1 w-full flex flex-col mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out fill-mode-both">
                    {children}
                </div>

                <NoCapFooter />
            </div>
        </SmoothScrolling>
    );
}
