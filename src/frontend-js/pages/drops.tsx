import { Head, Link } from '@inertiajs/react';
import { Search } from 'lucide-react';
import NoCapLayout from '@/layouts/nocap-layout';
import { addToCart } from '@/lib/storage';
import { useToast } from '@/components/toast-provider';

const mockProducts = [
    { id: 1, name: "AIR MAX 95 OG", category: "SHOES", price: 220, image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop", isTrending: true },
    { id: 2, name: "NCP OVERSIZED FLANNEL", category: "OUTERWEAR", price: 145, image: "https://images.unsplash.com/photo-1599508704512-2f19efd1eede?q=80&w=800&auto=format&fit=crop" },
    { id: 3, name: "TRAVIS DUNK LOW", category: "SHOES", price: 850, image: "https://images.unsplash.com/photo-1588636184518-5e88df283623?q=80&w=800&auto=format&fit=crop", isTrending: true },
    { id: 4, name: "HEAVYWEIGHT ZIP HOODIE", category: "HOODIES", price: 180, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop" },
    { id: 5, name: "UTILITY CARGO PANTS", category: "PANTS", price: 210, image: "https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=800&auto=format&fit=crop" },
    { id: 6, name: "NCP BEANIE", category: "ACCESSORIES", price: 40, image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=800&auto=format&fit=crop" },
    { id: 7, name: "VINTAGE WASH TEE", category: "HOODIES", price: 65, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop" },
    { id: 8, name: "JORDAN 1 CHICAGO", category: "SHOES", price: 1200, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop", isTrending: true },
    { id: 9, name: "NYLON WINDBREAKER", category: "OUTERWEAR", price: 250, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop" },
];

const categories = ["HEADWEAR", "T-SHIRT", "SHIRT", "HOODIES", "OUTERWEAR", "PANTS", "SHOES", "BAGS", "ACCESSORIES"];

export default function Drops() {
    const { showToast } = useToast();

    const handleQuickAdd = (product: typeof mockProducts[0], e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            size: 'ONE SIZE',
            image: product.image,
        });

        showToast(`${product.name} ADDED TO CART`, 'success');
    };

    return (
        <NoCapLayout title="Drops">

                <main className="flex flex-col md:flex-row px-6 py-8 md:px-12 md:py-12 gap-8 md:gap-12">
                    {/* SIDEBAR FILTER */}
                    <aside className="hidden md:flex w-[220px] flex-col shrink-0">
                        {/* SEARCH */}
                        <div className="mb-8 relative">
                            <input 
                                type="text" 
                                placeholder="SEARCH PRODUCT..." 
                                className="w-full border border-hairline bg-transparent h-10 pl-4 pr-10 text-[12px] font-bold uppercase text-ink placeholder:text-mute focus:outline-none focus:border-ink rounded-none transition-colors"
                            />
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mute" />
                        </div>

                        <div className="mb-8">
                            <h2 className="mb-4 text-[16px] font-bold uppercase tracking-wide text-ink">Category</h2>
                            <ul className="flex flex-col gap-3">
                                {categories.map(cat => (
                                    <li key={cat}>
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <div className="flex h-4 w-4 items-center justify-center border border-hairline group-hover:border-ink transition-colors">
                                            </div>
                                            <span className="text-[14px] font-medium uppercase text-mute group-hover:text-ink transition-colors">{cat}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* PRODUCT GRID */}
                    <div className="flex-1 flex flex-col">
                        <div className="mb-6 flex items-center justify-between">
                            <h1 className="text-[32px] font-medium uppercase leading-tight text-ink">The Drops</h1>
                            <div className="text-[14px] font-medium text-mute hidden md:block">{mockProducts.length} Results</div>
                        </div>

                        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
                            {mockProducts.map((product) => (
                                <div key={product.id} className="group relative flex flex-col bg-canvas transition-colors duration-300">
                                    <Link href="/product" className="relative aspect-[4/5] w-full overflow-hidden bg-soft-cloud transition-colors duration-300 cursor-pointer block">
                                        <img 
                                            src={product.image} 
                                            alt={product.name} 
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        
                                        {/* TRENDING BADGE */}
                                        {product.isTrending && (
                                            <div className="absolute top-4 left-4 border border-ink bg-canvas px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-ink rounded-none shadow-sm shadow-black/5">
                                                TRENDING
                                            </div>
                                        )}

                                        {/* HOVER CTA — QUICK ADD */}
                                        <div 
                                            onClick={(e) => handleQuickAdd(product, e)}
                                            className="absolute bottom-0 left-0 w-full translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 flex h-12 items-center justify-center bg-ink text-canvas text-[14px] font-bold uppercase tracking-widest rounded-none cursor-pointer hover:bg-ink/90"
                                        >
                                            QUICK ADD
                                        </div>
                                    </Link>
                                    <div className="flex flex-col pt-3 gap-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-[16px] font-medium text-ink uppercase leading-tight">{product.name}</h3>
                                            <span className="text-[16px] font-medium text-ink">${product.price}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <p className="text-[14px] font-medium text-mute uppercase">{product.category}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
        </NoCapLayout>
    );
}
