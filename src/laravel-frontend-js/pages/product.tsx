import { Head, Link } from '@inertiajs/react';
import { ChevronDown, Heart } from 'lucide-react';
import { useState } from 'react';
import NoCapLayout from '@/layouts/nocap-layout';

export default function Product({ canRegister = true }: { canRegister?: boolean }) {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [activeImage, setActiveImage] = useState(0);

    const images = [
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop"
    ];

    const sizes = ["US 7", "US 7.5", "US 8", "US 8.5", "US 9", "US 9.5", "US 10", "US 10.5", "US 11", "US 11.5", "US 12", "US 13"];

    return (
        <NoCapLayout title="AIR MAX 95 OG">

                {/* SUB-NAV STRIP (Breadcrumbs) */}
                <div className="hidden md:flex h-12 w-full items-center border-b border-hairline bg-canvas px-6 md:px-12 shadow-[inset_0_-1px_0_var(--hairline-soft)]">
                    <div className="flex items-center gap-2 text-[14px] font-medium text-mute">
                        <Link href="/drops" className="hover:text-ink transition-colors">Shoes</Link>
                        <span>/</span>
                        <Link href="/drops" className="hover:text-ink transition-colors">Lifestyle</Link>
                        <span>/</span>
                        <span className="text-ink">Air Max</span>
                    </div>
                </div>

                <main className="flex flex-col md:flex-row px-6 py-8 md:px-12 md:py-12 gap-12">
                    {/* PDP IMAGE GALLERY */}
                    <div className="flex w-full md:w-[65%] gap-4">
                        {/* THUMBNAIL RAIL (Desktop) */}
                        <div className="hidden md:flex flex-col gap-4 w-[80px] shrink-0">
                            {images.map((img, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`relative aspect-square w-full overflow-hidden bg-soft-cloud rounded-none ${activeImage === idx ? 'ring-2 ring-ink ring-offset-2 ring-offset-canvas' : 'opacity-70 hover:opacity-100'} transition-all`}
                                >
                                    <img src={img} alt={`Thumbnail ${idx+1}`} className="h-full w-full object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* MAIN IMAGE */}
                        <div className="relative aspect-square w-full flex-1 bg-soft-cloud overflow-hidden">
                            <img src={images[activeImage]} alt="Product Main" className="h-full w-full object-cover" />
                        </div>
                    </div>

                    {/* PDP METADATA / BUY BOX */}
                    <div className="flex w-full md:w-[35%] flex-col">
                        <div className="flex flex-col gap-1 mb-8">
                            <h2 className="text-[14px] font-medium text-mute uppercase">Men's Lifestyle Shoes</h2>
                            <h1 className="text-[32px] font-medium uppercase leading-tight text-ink mb-2">AIR MAX 95 OG</h1>
                            <p className="text-[24px] font-medium text-ink">$220</p>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[16px] font-medium text-ink">Select Size</h3>
                                <Link href="#" className="text-[16px] font-medium text-mute underline hover:text-ink">Size Guide</Link>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`flex h-12 items-center justify-center border rounded-none text-[16px] font-medium transition-colors ${
                                            selectedSize === size 
                                                ? 'border-ink bg-ink text-canvas' 
                                                : 'border-hairline bg-canvas text-ink hover:border-ink'
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 mb-12">
                            <button className="flex h-16 w-full items-center justify-center rounded-full bg-ink text-[16px] font-medium text-canvas transition-transform active:scale-[0.98] hover:bg-black/90">
                                Add to Bag
                            </button>
                            <button className="flex h-16 w-full items-center justify-center rounded-full bg-soft-cloud text-[16px] font-medium text-ink transition-transform active:scale-[0.98] hover:bg-hairline/50 gap-2">
                                Favorite <Heart className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="text-[16px] font-medium text-ink mb-8 leading-relaxed">
                            Taking inspiration from the human body and '90s track aesthetics, the Air Max 95 mixes unbelievable comfort with head-turning style. The iconic side panels represent strength, while visible Air in the heel and forefoot cushions every step.
                        </p>

                        <div className="flex flex-col border-t border-hairline pt-6 mb-6">
                            <ul className="text-[16px] text-ink list-disc list-inside mb-6 font-medium space-y-1">
                                <li>Color Shown: Black/Neon Yellow/Light Graphite</li>
                                <li>Style: CT1689-001</li>
                            </ul>
                        </div>

                        {/* DISCLOSURE ROWS */}
                        <div className="flex flex-col">
                            {['View Product Details', 'Shipping & Returns', 'Reviews (42)'].map((row, idx) => (
                                <div key={idx} className="flex cursor-pointer items-center justify-between border-b border-hairline py-6 hover:bg-soft-cloud/50 px-2 -mx-2 transition-colors">
                                    <h3 className="text-[16px] font-medium text-ink">{row}</h3>
                                    <ChevronDown className="w-5 h-5 text-ink" />
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
        </NoCapLayout>
    );
}
