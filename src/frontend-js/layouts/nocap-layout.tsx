import { Head } from '@inertiajs/react';
import React from 'react';
import NoCapHeader from '@/components/nocap-header';
import NoCapFooter from '@/components/nocap-footer';
import SmoothScrolling from '@/components/smooth-scrolling';
import { ToastProvider } from '@/components/toast-provider';

export default function NoCapLayout({ children, title }: { children: React.ReactNode, title?: string }) {
    return (
        <ToastProvider>
            <SmoothScrolling>
                {title && <Head title={`${title} | NO CAP`} />}
                <div className="min-h-screen flex flex-col bg-canvas text-ink font-sans selection:bg-ink selection:text-canvas transition-colors duration-300">
                    <NoCapHeader />

                    <div 
                        className="flex-1 w-full flex flex-col mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both"
                        style={{ willChange: 'transform, opacity', transform: 'translate3d(0,0,0)' }}
                    >
                        {children}
                    </div>

                    <NoCapFooter />
                </div>
            </SmoothScrolling>
        </ToastProvider>
    );
}

