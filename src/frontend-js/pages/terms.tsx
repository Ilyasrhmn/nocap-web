import NoCapLayout from '@/layouts/nocap-layout';
import { t } from '@/lib/i18n';

export default function Terms() {
    const sections = [
        {
            id: '01',
            title: t('terms.s1.title'),
            content: [
                t('terms.s1.p1'),
                t('terms.s1.p2'),
            ],
        },
        {
            id: '02',
            title: t('terms.s2.title'),
            content: [
                t('terms.s2.p1'),
                t('terms.s2.p2'),
            ],
        },
        {
            id: '03',
            title: t('terms.s3.title'),
            content: [
                t('terms.s3.p1'),
                t('terms.s3.p2'),
                t('terms.s3.p3'),
            ],
        },
        {
            id: '04',
            title: t('terms.s4.title'),
            content: [
                t('terms.s4.p1'),
                t('terms.s4.p2'),
                t('terms.s4.p3'),
            ],
        },
        {
            id: '05',
            title: t('terms.s5.title'),
            content: [
                t('terms.s5.p1'),
                t('terms.s5.p2'),
                t('terms.s5.p3'),
            ],
        },
        {
            id: '06',
            title: t('terms.s6.title'),
            content: [
                t('terms.s6.p1'),
                t('terms.s6.p2'),
            ],
        },
        {
            id: '07',
            title: t('terms.s7.title'),
            content: [
                t('terms.s7.p1'),
                t('terms.s7.p2'),
            ],
        },
        {
            id: '08',
            title: t('terms.s8.title'),
            content: [
                t('terms.s8.p1'),
            ],
        },
    ];

    return (
        <NoCapLayout title="Terms of Service">
            <div className="flex-1 w-full max-w-[1440px] mx-auto min-h-[calc(100vh-140px)]">

                {/* Hero Header */}
                <div className="border-b border-hairline px-6 md:px-12 pt-20 md:pt-28 pb-12 md:pb-16">
                    <p className="text-[12px] font-bold uppercase tracking-widest text-mute mb-4">
                        {t('legal.label')}
                    </p>
                    <h1 className="text-[48px] md:text-[80px] font-black uppercase leading-none tracking-tighter text-ink mb-6 whitespace-pre-line">
                        {t('terms.title')}
                    </h1>
                    <div className="flex items-center gap-3 text-[13px] font-medium text-mute">
                        <span className="uppercase tracking-widest">{t('last_updated')}</span>
                        <span className="h-px w-6 bg-hairline"></span>
                        <span className="text-ink font-bold uppercase tracking-wider">{t('last_updated_date')}</span>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="px-6 md:px-12">
                    {sections.map((section) => (
                        <div key={section.id} className="py-12 md:py-16 border-b border-hairline flex flex-col md:flex-row gap-8 md:gap-16">
                            {/* Section Number + Title */}
                            <div className="md:w-[280px] shrink-0 flex flex-col gap-2">
                                <span className="text-[12px] font-bold text-mute tracking-widest">{section.id}.</span>
                                <h2 className="text-[20px] md:text-[24px] font-bold uppercase tracking-tight text-ink leading-tight">
                                    {section.title}
                                </h2>
                            </div>
                            {/* Section Content */}
                            <div className="flex-1 flex flex-col gap-4">
                                {section.content.map((paragraph, idx) => (
                                    <p key={idx} className="text-[15px] text-mute leading-[1.8] font-normal">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Contact CTA */}
                <div className="px-6 md:px-12 py-12 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <p className="text-[14px] font-bold uppercase tracking-widest text-ink mb-1">{t('terms.cta.q')}</p>
                        <p className="text-[14px] text-mute">{t('terms.cta.desc')}</p>
                    </div>
                    <a
                        href="/contact"
                        className="text-[13px] font-bold uppercase tracking-widest text-ink border border-ink px-8 py-3 hover:bg-ink hover:text-canvas transition-all duration-300"
                    >
                        {t('terms.cta.btn')}
                    </a>
                </div>
            </div>
        </NoCapLayout>
    );
}
