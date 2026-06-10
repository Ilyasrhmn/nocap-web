import { Head, Link } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import NoCapLayout from '@/layouts/nocap-layout';
import ScrollReveal from '@/components/scroll-reveal';
import FlowingFaq from '@/components/flowing-faq';
import { login, register } from '@/routes';
import { t, formatPrice } from '@/lib/i18n';

const heroSlides = [
    {
        image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=2000&auto=format&fit=crop',
        title: t('hero.slide1_title'),
        desc: t('hero.slide1_desc')
    },
    {
        image: 'https://images.unsplash.com/photo-1552346154-21d32810baa3?q=80&w=2000&auto=format&fit=crop',
        title: t('hero.slide2_title'),
        desc: t('hero.slide2_desc')
    },
    {
        image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=2000&auto=format&fit=crop',
        title: t('hero.slide3_title'),
        desc: t('hero.slide3_desc')
    }
];

const trendingItems = [
    { name: "NCP Heavyweight Hoodie", subtitle: "Men's Fleece Pullover", price: 20, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop" },
    { name: "NCP Tech Cargo", subtitle: "Men's Utility Pants", price: 25, image: "https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=800&auto=format&fit=crop" },
    { name: "NCP Shield Jacket", subtitle: "Weather Resistant Outerwear", price: 50, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop" },
    { name: "NCP Box Tee", subtitle: "Heavyweight Cotton T-Shirt", price: 15, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop" },
    { name: "NCP Oversized Flannel", subtitle: "Heavyweight Layer", price: 22, image: "https://images.unsplash.com/photo-1599508704512-2f19efd1eede?q=80&w=800&auto=format&fit=crop" },
    { name: "NCP Utility Vest", subtitle: "Tactical Gear", price: 30, image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=800&auto=format&fit=crop" },
];

const faqs = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') }
];

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const trendingRef = useRef<HTMLDivElement>(null);

    // Auto-slide effect for Hero
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000); // 5 seconds
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

    const scrollTrending = (dir: 'left' | 'right') => {
        if (trendingRef.current) {
            const scrollAmount = trendingRef.current.clientWidth * 0.5;
            trendingRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <NoCapLayout title="Marketplace">
                <main className="flex flex-col">
                    {/* HERO CAMPAIGN TILE - CAROUSEL */}
                    <section className="relative flex min-h-[80vh] w-full flex-col justify-end bg-soft-cloud overflow-hidden group">
                        
                        {/* Slides Container */}
                        <div 
                            className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {heroSlides.map((slide, idx) => (
                                <div 
                                    key={idx} 
                                    className="w-full shrink-0 relative bg-cover bg-center"
                                    style={{ backgroundImage: `url("${slide.image}")` }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Static Content Overlay - Updates with slide state */}
                        <div className="relative z-10 flex w-full flex-col items-start gap-8 p-6 md:p-12 transition-all duration-500">
                            <h1 className="whitespace-pre-line max-w-5xl text-[64px] font-medium uppercase leading-[0.9] tracking-tight text-white md:text-[96px] animate-in fade-in slide-in-from-bottom-4 duration-500" key={`title-${currentSlide}`}>
                                {heroSlides[currentSlide].title}
                            </h1>
                            <p className="max-w-md text-[16px] text-white/90 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100" key={`desc-${currentSlide}`}>
                                {heroSlides[currentSlide].desc}
                            </p>
                            <Link href="/drops" className="flex h-12 items-center justify-center rounded-full bg-white px-8 text-[16px] font-medium text-black transition-transform hover:scale-95 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200" key={`btn-${currentSlide}`}>
                                Shop Collection
                            </Link>
                        </div>

                        {/* Slide Indicators */}
                        <div className="absolute bottom-6 md:bottom-12 right-6 md:right-12 z-20 flex gap-2">
                            {heroSlides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`h-1 transition-all duration-300 ${currentSlide === idx ? 'w-8 bg-white' : 'w-4 bg-white/40 hover:bg-white/70'}`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>

                        {/* Navigation Arrows */}
                        <button 
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm opacity-0 transition-opacity hover:bg-black/40 group-hover:opacity-100"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button 
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm opacity-0 transition-opacity hover:bg-black/40 group-hover:opacity-100"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </section>

                    {/* PRODUCT GRID - TRENDING (CAROUSEL) */}
                    <ScrollReveal>
                        <section className="px-6 py-12 md:px-12 group/trending">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-[32px] font-medium uppercase leading-tight text-ink">{t('welcome.trending_now')}</h2>
                                <div className="flex gap-2 opacity-0 group-hover/trending:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => scrollTrending('left')}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-soft-cloud text-ink hover:bg-hairline transition-colors"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    <button 
                                        onClick={() => scrollTrending('right')}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-soft-cloud text-ink hover:bg-hairline transition-colors"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            <div 
                                ref={trendingRef}
                                className="flex overflow-x-auto snap-x gap-4 pb-4 no-scrollbar"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {trendingItems.map((item, index) => (
                                    <div key={index} className="w-[80vw] md:w-[280px] shrink-0 snap-start group relative flex flex-col bg-canvas transition-colors duration-300">
                                        <Link href="/product" className="relative aspect-square w-full overflow-hidden bg-soft-cloud transition-colors duration-300 block cursor-pointer">
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </Link>
                                        <div className="flex flex-col pt-3 gap-1">
                                            <h3 className="text-[16px] font-medium text-ink leading-tight">{item.name}</h3>
                                            <p className="text-[14px] font-medium text-mute">{item.subtitle}</p>
                                            <p className="mt-1 text-[16px] font-medium text-ink">{formatPrice(item.price)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </ScrollReveal>

                    {/* CURATED CATEGORIES */}
                    <ScrollReveal>
                        <section className="px-6 py-12 md:px-12 border-t border-hairline transition-colors duration-300">
                            <div className="mb-8 flex items-center justify-between">
                                <h2 className="text-[32px] font-medium uppercase leading-tight text-ink">{t('welcome.curated_categories')}</h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                                {[
                                    { title: "Footwear", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop" },
                                    { title: "Upperwear", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop" },
                                    { title: "Lowerwear", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop" },
                                    { title: "Headwear", image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800&auto=format&fit=crop" }
                                ].map((cat, idx) => (
                                    <Link href="#" key={idx} className="group flex flex-col gap-4">
                                        <div className="relative aspect-[4/5] md:aspect-square w-full overflow-hidden bg-soft-cloud">
                                            <img 
                                                src={cat.image} 
                                                alt={cat.title} 
                                                className="h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0" 
                                            />
                                            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10"></div>
                                        </div>
                                        <div className="flex items-center justify-between border-b border-hairline pb-4 transition-colors duration-300 group-hover:border-ink">
                                            <span className="text-[14px] md:text-[16px] font-medium uppercase tracking-[0.1em] text-ink">{cat.title}</span>
                                            <ArrowUpRight className="h-5 w-5 text-mute transition-all duration-300 group-hover:text-ink group-hover:-translate-y-1 group-hover:translate-x-1" strokeWidth={1.5} />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </ScrollReveal>

                    {/* MEMBER BENEFIT TILE */}
                    <ScrollReveal>
                        <section className="px-6 py-12 md:px-12">
                             <div className="relative flex min-h-[60vh] w-full flex-col justify-end bg-ink bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=2000&auto=format&fit=crop")' }}>
                                <div className="absolute inset-0 bg-black/40"></div>
                                <div className="relative z-10 flex flex-col items-center text-center p-6 md:p-12">
                                    <h2 className="mb-6 max-w-3xl text-[48px] font-medium uppercase leading-[0.9] text-white md:text-[64px]">{t('welcome.member_title')}</h2>
                                    <p className="mb-8 max-w-md text-[16px] text-white/90">{t('welcome.member_desc')}</p>
                                    <div className="flex flex-col gap-4 sm:flex-row">
                                        <Link href="/membership" className="flex h-12 items-center justify-center rounded-none bg-white/80 backdrop-blur-sm px-8 text-[16px] font-medium text-black transition-transform hover:scale-95">
                                            {t('welcome.view_memberships')}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </ScrollReveal>

                    {/* RADICAL AUTHENTICITY SECTION */}
                    <ScrollReveal className="bg-canvas transition-colors duration-300">
                        <section className="max-w-[1440px] mx-auto px-6 py-24 md:px-12 text-ink">
                            <div className="flex flex-col md:flex-row gap-16 md:gap-24">
                                {/* Left Side: Brand Manifesto */}
                                <div className="flex flex-col gap-6 md:w-1/2">
                                    <h2 className="whitespace-pre-line text-[48px] md:text-[64px] font-medium leading-[0.9] uppercase tracking-tight">
                                        {t('hero.title')}
                                    </h2>
                                    <p className="text-[16px] text-mute max-w-md leading-relaxed">
                                        {t('hero.subtitle')}
                                    </p>
                                </div>
                                
                                {/* Right Side: Trust Guarantees */}
                                <div className="flex flex-col md:w-1/2">
                                    {[
                                        { title: t('trust.legit_checked'), desc: t('trust.legit_desc') },
                                        { title: t('trust.premium_materials'), desc: t('trust.premium_desc') },
                                        { title: t('trust.dswt'), desc: t('trust.dswt_desc') }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex flex-col gap-3 py-8 border-t border-hairline last:border-b transition-colors duration-300 hover:bg-soft-cloud px-4 -mx-4 md:px-6 md:-mx-6 cursor-default">
                                            <h3 className="text-[18px] md:text-[20px] font-medium uppercase tracking-widest text-ink">{item.title}</h3>
                                            <p className="text-[14px] md:text-[15px] text-mute leading-relaxed">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </ScrollReveal>

                    {/* FAQ SECTION — Constrained to match footer width */}
                    <ScrollReveal className="bg-canvas transition-colors duration-300">
                        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                            <div className="pt-16 pb-8">
                                <h2 className="text-[24px] md:text-[32px] font-medium uppercase leading-tight text-ink">
                                    Frequently Asked Questions
                                </h2>
                            </div>
                            <FlowingFaq items={faqs} speed={10} />
                            <div className="pb-16"></div>
                        </div>
                    </ScrollReveal>
                </main>
        </NoCapLayout>
    );
}
