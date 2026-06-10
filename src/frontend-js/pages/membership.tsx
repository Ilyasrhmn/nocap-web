import { Head, Link } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { login, register } from '@/routes';
import NoCapLayout from '@/layouts/nocap-layout';
import ScrollReveal from '@/components/scroll-reveal';
import FlowingFaq from '@/components/flowing-faq';
import { t } from '@/lib/i18n';
import { getCurrentUser, upgradeUserTier } from '@/lib/storage';
import { useToast } from '@/components/toast-provider';
import ConfirmationModal from '@/components/confirmation-modal';
import { Check } from 'lucide-react';

export default function Membership() {
    const { showToast } = useToast();
    const [user, setUser] = useState(getCurrentUser());
    const [isMounted, setIsMounted] = useState(false);
    
    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTier, setSelectedTier] = useState<'VERIFIED' | 'GRAIL' | null>(null);

    useEffect(() => {
        setIsMounted(true);
        const handleAuthUpdate = () => {
            setUser(getCurrentUser());
        };
        if (typeof window !== 'undefined') {
            window.addEventListener('nocap:auth-updated', handleAuthUpdate);
            return () => window.removeEventListener('nocap:auth-updated', handleAuthUpdate);
        }
    }, []);

    const handleUpgradeClick = (tier: 'VERIFIED' | 'GRAIL') => {
        if (!user) {
            showToast(t('toast.login_required_upgrade'), 'error');
            return;
        }
        setSelectedTier(tier);
        setIsModalOpen(true);
    };

    const confirmUpgrade = () => {
        if (user && selectedTier) {
            const success = upgradeUserTier(user.email, selectedTier);
            if (success) {
                showToast(t('toast.upgrade_success'), 'success');
                // Could redirect to dashboard using window.location.href if desired, 
                // but let's just let the toast show and update state.
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1500);
            }
        }
    };

    const faqs = [
        { question: t('membership.faq1_q'), answer: t('membership.faq1_a') },
        { question: t('membership.faq2_q'), answer: t('membership.faq2_a') },
        { question: t('membership.faq3_q'), answer: t('membership.faq3_a') },
        { question: t('membership.faq4_q'), answer: t('membership.faq4_a') },
        { question: t('membership.faq5_q'), answer: t('membership.faq5_a') },
        { question: t('membership.faq6_q'), answer: t('membership.faq6_a') },
        { question: t('membership.faq7_q'), answer: t('membership.faq7_a') },
        { question: t('membership.faq8_q'), answer: t('membership.faq8_a') }
    ];

    if (!isMounted) return null;

    return (
        <NoCapLayout title="Membership">
            <main className="flex flex-col bg-canvas">
                
                {/* HERO SECTION */}
                <section className="relative flex min-h-[50vh] w-full flex-col justify-center border-b border-hairline py-24 px-6 md:px-12 bg-canvas">
                    <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto gap-6 mt-12">
                        <h1 className="text-[64px] font-medium uppercase leading-none tracking-tighter text-ink md:text-[80px]">
                            {t('membership.hero_title')}
                        </h1>
                        <p className="max-w-2xl text-[18px] font-medium text-mute uppercase tracking-widest leading-relaxed">
                            {t('membership.hero_desc')}
                        </p>
                    </div>
                </section>

                {/* PRICING CARDS */}
                <ScrollReveal className="px-6 py-24 md:px-12">
                    <div className="mb-16 text-center">
                        <h2 className="text-[32px] md:text-[40px] font-medium uppercase leading-none tracking-tighter text-ink">
                            {t('membership.pricing_title')}
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1440px] mx-auto">
                        {/* STANDARD TIER */}
                        <div className="flex flex-col border border-hairline bg-canvas p-8 rounded-none transition-transform hover:-translate-y-2 duration-300">
                            <h3 className="text-[20px] font-medium uppercase tracking-widest text-ink mb-2">
                                {t('membership.tier1_name')}
                            </h3>
                            <div className="text-[40px] font-medium tracking-tighter text-ink mb-8">
                                {t('membership.tier1_price')}
                            </div>
                            <div className="flex-1 flex flex-col gap-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-ink" strokeWidth={2} />
                                    <span className="text-[14px] font-medium uppercase tracking-widest text-ink">{t('membership.tier1_f1')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-ink" strokeWidth={2} />
                                    <span className="text-[14px] font-medium uppercase tracking-widest text-ink">{t('membership.tier1_f2')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-ink" strokeWidth={2} />
                                    <span className="text-[14px] font-medium uppercase tracking-widest text-ink">{t('membership.tier1_f3')}</span>
                                </div>
                            </div>
                            <button disabled className="w-full h-14 border border-hairline bg-transparent text-mute font-medium uppercase tracking-widest cursor-not-allowed">
                                CURRENT TIER
                            </button>
                        </div>

                        {/* VERIFIED TIER - HIGHLIGHTED */}
                        <div className="flex flex-col border-2 border-ink bg-ink p-8 rounded-none transform scale-100 md:scale-105 z-10 shadow-xl">
                            <h3 className="text-[20px] font-medium uppercase tracking-widest text-canvas mb-2">
                                {t('membership.tier2_name')}
                            </h3>
                            <div className="text-[40px] font-medium tracking-tighter text-canvas mb-8">
                                {t('membership.tier2_price')}
                            </div>
                            <div className="flex-1 flex flex-col gap-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-canvas" strokeWidth={2} />
                                    <span className="text-[14px] font-medium uppercase tracking-widest text-canvas">{t('membership.tier2_f1')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-canvas" strokeWidth={2} />
                                    <span className="text-[14px] font-medium uppercase tracking-widest text-canvas">{t('membership.tier2_f2')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-canvas" strokeWidth={2} />
                                    <span className="text-[14px] font-medium uppercase tracking-widest text-canvas">{t('membership.tier2_f3')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-canvas" strokeWidth={2} />
                                    <span className="text-[14px] font-medium uppercase tracking-widest text-canvas">{t('membership.tier2_f4')}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleUpgradeClick('VERIFIED')}
                                className="w-full h-14 bg-canvas text-ink hover:bg-canvas/90 font-medium uppercase tracking-widest transition-transform active:scale-95"
                            >
                                {t('membership.tier2_btn')}
                            </button>
                        </div>

                        {/* GRAIL STATUS TIER */}
                        <div className="flex flex-col border border-hairline bg-canvas p-8 rounded-none transition-transform hover:-translate-y-2 duration-300">
                            <h3 className="text-[20px] font-medium uppercase tracking-widest text-ink mb-2">
                                {t('membership.tier3_name')}
                            </h3>
                            <div className="text-[40px] font-medium tracking-tighter text-ink mb-8">
                                {t('membership.tier3_price')}
                            </div>
                            <div className="flex-1 flex flex-col gap-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-ink" strokeWidth={2} />
                                    <span className="text-[14px] font-medium uppercase tracking-widest text-ink">{t('membership.tier3_f1')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-ink" strokeWidth={2} />
                                    <span className="text-[14px] font-medium uppercase tracking-widest text-ink">{t('membership.tier3_f2')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-ink" strokeWidth={2} />
                                    <span className="text-[14px] font-medium uppercase tracking-widest text-ink">{t('membership.tier3_f3')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-ink" strokeWidth={2} />
                                    <span className="text-[14px] font-medium uppercase tracking-widest text-ink">{t('membership.tier3_f4')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-ink" strokeWidth={2} />
                                    <span className="text-[14px] font-medium uppercase tracking-widest text-ink">{t('membership.tier3_f5')}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleUpgradeClick('GRAIL')}
                                className="w-full h-14 bg-ink text-canvas hover:bg-ink/90 font-medium uppercase tracking-widest transition-transform active:scale-95"
                            >
                                {t('membership.tier3_btn')}
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                {/* BRUTALIST FAQ SECTION */}
                <ScrollReveal className="bg-canvas border-t border-hairline py-24 transition-colors duration-300">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                        <div className="mb-8">
                            <h2 className="text-[24px] md:text-[32px] font-medium uppercase leading-tight text-ink">
                                {t('membership.faq_title')}
                            </h2>
                        </div>
                        <FlowingFaq items={faqs} speed={10} />
                        <div className="pb-16"></div>
                    </div>
                </ScrollReveal>

                {/* UPGRADE CONFIRMATION MODAL */}
                <ConfirmationModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={confirmUpgrade}
                    message={t('alert.confirm_payment')}
                    confirmText={t('alert.yes_upgrade')}
                />
            </main>
        </NoCapLayout>
    );
}
