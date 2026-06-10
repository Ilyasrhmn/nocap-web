import { Head, Link } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import NoCapLayout from '@/layouts/nocap-layout';
import { login, register } from '@/routes';

const heroSlides = [
    {
        image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=2000&auto=format&fit=crop',
        title: "The Urban\nUtility Drop",
        desc: 'Built for the concrete. The new fall collection merges minimalist aesthetics with absolute functionality.'
    },
    {
        image: 'https://images.unsplash.com/photo-1552346154-21d32810baa3?q=80&w=2000&auto=format&fit=crop',
        title: "Street\nEssentials",
        desc: 'Everyday staples engineered for the modern environment.'
    },
    {
        image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=2000&auto=format&fit=crop',
        title: "Footwear\nEvolution",
        desc: 'Step into the future with our latest sneaker drops.'
    }
];

const trendingItems = [
    { name: "NCP Heavyweight Hoodie", subtitle: "Men's Fleece Pullover", price: "$120", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop" },
    { name: "NCP Tech Cargo", subtitle: "Men's Utility Pants", price: "$145", image: "https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=800&auto=format&fit=crop" },
    { name: "NCP Shield Jacket", subtitle: "Weather Resistant Outerwear", price: "$180", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop" },
    { name: "NCP Box Tee", subtitle: "Heavyweight Cotton T-Shirt", price: "$45", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop" },
    { name: "NCP Oversized Flannel", subtitle: "Heavyweight Layer", price: "$110", image: "https://images.unsplash.com/photo-1599508704512-2f19efd1eede?q=80&w=800&auto=format&fit=crop" },
    { name: "NCP Utility Vest", subtitle: "Tactical Gear", price: "$130", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=800&auto=format&fit=crop" },
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
                    <section className="px-6 py-12 md:px-12 group/trending">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-[32px] font-medium uppercase leading-tight text-ink">Trending Now</h2>
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
                                        <p className="mt-1 text-[16px] font-medium text-ink">{item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* SPORT/CATEGORY RAIL */}
                    <section className="px-6 py-12 md:px-12 border-t border-hairline transition-colors duration-300">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-[32px] font-medium uppercase leading-tight text-ink">Shop by Sport</h2>
                        </div>
                        <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
                            {[
                                { title: "Running", image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=800&auto=format&fit=crop" },
                                { title: "Training", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop" },
                                { title: "Basketball", image: "https://images.unsplash.com/photo-1542652694-40abf526446e?q=80&w=800&auto=format&fit=crop" },
                                { title: "Skateboarding", image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?q=80&w=800&auto=format&fit=crop" }
                            ].map((cat, idx) => (
                                <div key={idx} className="relative min-w-[280px] flex-shrink-0 snap-start aspect-[4/5] bg-soft-cloud overflow-hidden group transition-colors duration-300">
                                    <img src={cat.image} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/30"></div>
                                    <div className="absolute bottom-6 left-6">
                                        <Link href="#" className="flex h-10 items-center justify-center rounded-full bg-white px-6 text-[14px] font-medium text-black transition-transform hover:scale-95">
                                            {cat.title}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* MEMBER BENEFIT TILE */}
                    <section className="px-6 py-12 md:px-12">
                         <div className="relative flex min-h-[60vh] w-full flex-col justify-end bg-ink bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1617387304192-35368a157140?q=80&w=2000&auto=format&fit=crop")' }}>
                            <div className="absolute inset-0 bg-black/60"></div>
                            <div className="relative z-10 flex flex-col items-center text-center p-6 md:p-12">
                                <h2 className="mb-6 max-w-3xl text-[48px] font-medium uppercase leading-[0.9] text-white md:text-[64px]">Become A Member</h2>
                                <p className="mb-8 max-w-md text-[16px] text-white/90">Sign up for free. Join the community. Never miss a drop.</p>
                                <div className="flex flex-col gap-4 sm:flex-row">
                                    <Link href={register()} className="flex h-12 items-center justify-center rounded-full bg-white px-8 text-[16px] font-medium text-black transition-transform hover:scale-95">
                                        Join Us
                                    </Link>
                                    <Link href={login()} className="flex h-12 items-center justify-center rounded-full bg-transparent border border-white px-8 text-[16px] font-medium text-white transition-transform hover:scale-95 hover:bg-white hover:text-black">
                                        Sign In
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
        </NoCapLayout>
    );
}
