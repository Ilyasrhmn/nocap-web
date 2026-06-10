import { Head, Link } from '@inertiajs/react';
import { login, register } from '@/routes';
import { ChevronDown } from 'lucide-react';
import NoCapLayout from '@/layouts/nocap-layout';

export default function Membership({ canRegister = true }: { canRegister?: boolean }) {
    const benefits = [
        {
            title: "Exclusive Drops",
            image: "https://images.unsplash.com/photo-1552346154-21d32810baa3?q=80&w=800&auto=format&fit=crop",
            desc: "First access to our most coveted releases."
        },
        {
            title: "Member Shop",
            image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop",
            desc: "A dedicated collection of styles only for you."
        },
        {
            title: "Free Shipping",
            image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop",
            desc: "Zero delivery fees on every order, always."
        }
    ];

    const faqs = [
        { q: "What is No Cap Membership?", a: "It's our loyalty program that gives you access to exclusive products, free shipping, and early access to drops." },
        { q: "Is the membership free?", a: "Yes, joining the No Cap community is 100% free." },
        { q: "How do I get early access to drops?", a: "Make sure you're logged in. We'll send you a notification when an exclusive drop is happening." },
        { q: "Do I get free returns as a member?", a: "Yes, members enjoy free returns within 30 days on all eligible purchases." }
    ];

    return (
        <NoCapLayout title="Membership">

                <main className="flex flex-col">
                    {/* HERO CAMPAIGN TILE */}
                    <section className="relative flex min-h-[60vh] w-full flex-col justify-end bg-ink bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2000&auto=format&fit=crop")' }}>
                        <div className="absolute inset-0 bg-black/50"></div>
                        
                        <div className="relative z-10 flex w-full flex-col items-center justify-center text-center gap-6 p-6 md:p-12 mb-12">
                            <h1 className="max-w-4xl text-[64px] font-medium uppercase leading-[0.9] tracking-tight text-white md:text-[96px]">
                                No Cap<br/>Membership
                            </h1>
                            <p className="max-w-lg text-[16px] text-white/90">
                                The ultimate key to the culture. Get exclusive access to the rarest drops, member-only products, and free shipping on every order.
                            </p>
                            <div className="flex gap-4 mt-4">
                                <Link href={register()} className="flex h-12 items-center justify-center rounded-full bg-white px-8 text-[16px] font-medium text-black transition-transform hover:scale-95">
                                    Join Us
                                </Link>
                                <Link href={login()} className="flex h-12 items-center justify-center rounded-full bg-transparent border border-white px-8 text-[16px] font-medium text-white transition-transform hover:scale-95 hover:bg-white hover:text-black">
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* BENEFITS GRID */}
                    <section className="px-6 py-12 md:px-12 md:py-24">
                        <div className="mb-12 text-center">
                            <h2 className="text-[32px] font-medium uppercase leading-tight text-ink">Member Benefits</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="group relative aspect-[4/5] w-full overflow-hidden bg-ink rounded-none text-white">
                                    <img src={benefit.image} alt={benefit.title} className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-40" />
                                    <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 to-transparent">
                                        <h3 className="text-[24px] font-medium uppercase leading-tight mb-2">{benefit.title}</h3>
                                        <p className="text-[16px] opacity-90 mb-6">{benefit.desc}</p>
                                        <Link href={register()} className="flex h-10 w-max items-center justify-center rounded-full bg-white px-6 text-[14px] font-medium text-black transition-transform hover:scale-95">
                                            Explore
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* FAQ SECTION */}
                    <section className="px-6 py-12 md:px-12 md:py-24 max-w-4xl mx-auto w-full">
                        <div className="mb-8">
                            <h2 className="text-[32px] font-medium uppercase leading-tight text-ink">Frequently Asked Questions</h2>
                        </div>
                        <div className="flex flex-col border-t border-hairline">
                            {faqs.map((faq, idx) => (
                                <details key={idx} className="group py-6 border-b border-hairline cursor-pointer">
                                    <summary className="flex items-center justify-between text-[16px] font-medium text-ink list-none marker:hidden">
                                        {faq.q}
                                        <ChevronDown className="w-5 h-5 text-ink transition-transform group-open:rotate-180" />
                                    </summary>
                                    <p className="mt-4 text-[16px] text-mute pr-8 leading-relaxed">
                                        {faq.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </section>
                </main>
        </NoCapLayout>
    );
}
