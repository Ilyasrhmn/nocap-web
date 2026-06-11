import React from 'react';
import LogoLoop from './LogoLoop';

const magazineLogos = [
    {
        node: <span className="font-black text-[32px] tracking-tighter uppercase text-ink/70 hover:text-ink transition-colors">HYPEBEAST</span>,
        title: "HYPEBEAST"
    },
    {
        node: <span className="font-bold text-[28px] tracking-widest uppercase text-ink/70 hover:text-ink transition-colors">HIGHSNOBIETY</span>,
        title: "HIGHSNOBIETY"
    },
    {
        node: <span className="font-serif italic font-bold text-[36px] tracking-tight uppercase text-ink/70 hover:text-ink transition-colors">VOGUE</span>,
        title: "VOGUE"
    },
    {
        node: <span className="font-sans font-black text-[32px] tracking-[-0.05em] uppercase text-ink/70 hover:text-ink transition-colors">COMPLEX</span>,
        title: "COMPLEX"
    },
    {
        node: <span className="font-serif text-[40px] tracking-tight uppercase text-ink/70 hover:text-ink transition-colors">GQ</span>,
        title: "GQ"
    },
    {
        node: <span className="font-black text-[28px] tracking-widest uppercase text-ink/70 hover:text-ink transition-colors">PAUSE.</span>,
        title: "PAUSE"
    }
];

export default function AuthorityBanner() {
    return (
        <section className="w-full py-8 md:py-10 border-b border-hairline bg-canvas overflow-hidden flex items-center no-scrollbar">
            <div className="shrink-0 flex items-center px-6 md:px-12 z-10 border-r border-hairline h-full mr-4 bg-canvas">
                <span className="text-[12px] font-bold uppercase tracking-widest text-ink/60">
                    As Seen On
                </span>
            </div>
            
            <div className="flex-1 min-w-0">
                <LogoLoop
                    logos={magazineLogos}
                    speed={40}
                    direction="left"
                    logoHeight={50}
                    gap={80}
                    hoverSpeed={10}
                    fadeOut={true}
                    fadeOutColor="#FAF9F6" /* Matching NOCAP canvas color approximately */
                />
            </div>
        </section>
    );
}
