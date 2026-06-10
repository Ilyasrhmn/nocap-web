import { Head, Link } from '@inertiajs/react';
import NoCapLayout from '@/layouts/nocap-layout';

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
                        Born from the streets of Condong Catur, Sleman. No Cap is more than a brand; it's a movement. We reject the superfluous and embrace the essential. Inspired by brutalist architecture and functional utility, our garments are engineered for those who speak less and do more.
                    </p>
                </div>
                <div className="flex-1 bg-ink text-canvas p-8 md:p-16 flex flex-col justify-center">
                    <h2 className="text-[32px] md:text-[48px] font-bold uppercase leading-none tracking-tight mb-8">
                        THE PHILOSOPHY
                    </h2>
                    <ul className="flex flex-col gap-6 text-[14px] font-medium uppercase tracking-widest">
                        <li className="flex gap-4">
                            <span className="text-mute">01.</span>
                            <span>Form Follows Function</span>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-mute">02.</span>
                            <span>Ink & Canvas Aesthetics</span>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-mute">03.</span>
                            <span>Uncompromising Quality</span>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-mute">04.</span>
                            <span>Zero Bullshit. No Cap.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </NoCapLayout>
    );
}
