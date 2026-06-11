import { Link } from '@inertiajs/react';
import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { getLang, setLang, t } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function NoCapFooter() {
    const containerRef = useRef<HTMLElement>(null);
    const [lang, setLangState] = useState('en');

    useEffect(() => {
        setLangState(getLang());
    }, []);

    const handleLangChange = (newLang: string) => {
        setLang(newLang);
        if (typeof window !== 'undefined') {
            window.location.reload();
        }
    };

    useGSAP(() => {
        if (!containerRef.current) return;
        
        gsap.from('.nocap-letter', {
            y: 150,
            opacity: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reset',
            }
        });
    }, { scope: containerRef });

    return (
        <footer ref={containerRef} className="mt-auto bg-canvas transition-colors duration-300 shrink-0 w-full overflow-hidden">
            {/* TOP SECTION: Tagline + Navigation Links */}
            <div className="border-t border-hairline">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-16 md:pb-20">
                    <div className="flex flex-col md:flex-row md:justify-between gap-12">
                        {/* Tagline & Lang Toggle */}
                        <div className="md:max-w-xs flex flex-col items-start gap-6">
                            <p className="text-[22px] md:text-[28px] font-medium leading-snug text-ink tracking-tight uppercase">
                                {t('footer.manifesto')}
                            </p>
                        </div>

                        {/* Navigation Columns */}
                        <div className="flex flex-col md:flex-row gap-3 md:gap-24">
                            {/* Column 1 */}
                            <nav className="flex flex-col gap-3">
                                <Link href="/" className="w-fit text-[15px] font-medium text-ink transition-colors duration-200 relative inline-block after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 hover:text-mute">{t('nav.home')}</Link>
                                <Link href="/store" className="w-fit text-[15px] font-medium text-ink transition-colors duration-200 relative inline-block after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 hover:text-mute">{t('nav.store')}</Link>
                                <Link href="/drops" className="w-fit text-[15px] font-medium text-ink transition-colors duration-200 relative inline-block after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 hover:text-mute">{t('nav.drops')}</Link>
                            </nav>

                            {/* Column 2 */}
                            <nav className="flex flex-col gap-3">
                                <Link href="/about" className="w-fit text-[15px] font-medium text-ink transition-colors duration-200 relative inline-block after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 hover:text-mute">{t('nav.about')}</Link>
                                <Link href="/contact" className="w-fit text-[15px] font-medium text-ink transition-colors duration-200 relative inline-block after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 hover:text-mute">{t('nav.contact')}</Link>
                                <Link href="/membership" className="w-fit text-[15px] font-medium text-ink transition-colors duration-200 relative inline-block after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 hover:text-mute">{t('nav.membership')}</Link>
                            </nav>

                            {/* Column 3 (Support) */}
                            <nav className="flex flex-col gap-3">
                                <Link href="/size-guide" className="w-fit text-[15px] font-medium text-ink transition-colors duration-200 relative inline-block after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 hover:text-mute">{t('nav.size_guide')}</Link>
                                <Link href="/shipping-returns" className="w-fit text-[15px] font-medium text-ink transition-colors duration-200 relative inline-block after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 hover:text-mute">{t('nav.shipping_returns')}</Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* DIVIDER */}
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-hairline to-transparent opacity-70"></div>
            </div>

            {/* COPYRIGHT & LEGAL LINKS */}
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-5 pb-2 md:pt-8 md:pb-2 flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px] text-mute font-medium">
                <p>&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
                <div className="flex items-center gap-6">
                    <Link href="/privacy" className="hover:text-ink transition-colors duration-200">{t('nav.privacy')}</Link>
                    <Link href="/terms" className="hover:text-ink transition-colors duration-200">{t('nav.terms')}</Link>
                </div>
            </div>

            {/* GIANT WORDMARK — Scroll animated edge-to-edge */}
            <div
                className="w-full select-none pointer-events-none overflow-hidden px-4 md:px-12 pt-4 pb-2 md:pt-2 md:pb-4 max-w-[1440px] mx-auto"
                aria-hidden="true"
                style={{ fontSize: 'clamp(80px, 21vw, 420px)', lineHeight: 0.85 }}
            >
                <div className="flex justify-between items-baseline w-full font-sans font-black uppercase text-ink transform scale-y-[1.25] md:scale-y-100 origin-bottom">
                    {'NOCAP'.split('').map((letter, i) => (
                        <span key={i} className="nocap-letter inline-block">
                            {letter}
                        </span>
                    ))}
                </div>
            </div>

        </footer>
    );
}
