import NoCapLayout from '@/layouts/nocap-layout';
import { t } from '@/lib/i18n';

export default function SizeGuide() {
    return (
        <NoCapLayout title="Size Guide">
            <div className="flex-1 w-full max-w-[1440px] mx-auto min-h-[calc(100vh-140px)]">
                
                {/* Hero Header */}
                <div className="border-b border-hairline px-6 md:px-12 pt-20 md:pt-28 pb-12 md:pb-16">
                    <p className="text-[12px] font-bold uppercase tracking-widest text-mute mb-4">
                        {t('support.label')}
                    </p>
                    <h1 className="text-[48px] md:text-[80px] font-black uppercase leading-none tracking-tighter text-ink mb-6 whitespace-pre-line">
                        {t('size.title')}
                    </h1>
                    <p className="text-[15px] text-mute max-w-xl">
                        {t('size.desc')}
                    </p>
                </div>

                {/* Tops Size Chart */}
                <div className="px-6 md:px-12 py-12 md:py-16 border-b border-hairline">
                    <h2 className="text-[20px] md:text-[24px] font-bold uppercase tracking-tight text-ink mb-8">
                        {t('size.tops.title')}
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b-2 border-ink text-[12px] font-bold uppercase tracking-widest text-ink">
                                    <th className="py-4 px-4 min-w-[100px]">{t('size.tops.h_size')}</th>
                                    <th className="py-4 px-4 min-w-[120px]">{t('size.tops.h_chest')}</th>
                                    <th className="py-4 px-4 min-w-[120px]">{t('size.tops.h_length')}</th>
                                    <th className="py-4 px-4 min-w-[120px]">{t('size.tops.h_sleeve')}</th>
                                </tr>
                            </thead>
                            <tbody className="text-[14px] text-mute">
                                <tr className="border-b border-hairline hover:bg-hairline/20 transition-colors">
                                    <td className="py-4 px-4 font-bold text-ink">S</td>
                                    <td className="py-4 px-4">54 cm</td>
                                    <td className="py-4 px-4">68 cm</td>
                                    <td className="py-4 px-4">22 cm</td>
                                </tr>
                                <tr className="border-b border-hairline hover:bg-hairline/20 transition-colors">
                                    <td className="py-4 px-4 font-bold text-ink">M</td>
                                    <td className="py-4 px-4">58 cm</td>
                                    <td className="py-4 px-4">71 cm</td>
                                    <td className="py-4 px-4">24 cm</td>
                                </tr>
                                <tr className="border-b border-hairline hover:bg-hairline/20 transition-colors">
                                    <td className="py-4 px-4 font-bold text-ink">L</td>
                                    <td className="py-4 px-4">62 cm</td>
                                    <td className="py-4 px-4">74 cm</td>
                                    <td className="py-4 px-4">26 cm</td>
                                </tr>
                                <tr className="border-b border-hairline hover:bg-hairline/20 transition-colors">
                                    <td className="py-4 px-4 font-bold text-ink">XL</td>
                                    <td className="py-4 px-4">66 cm</td>
                                    <td className="py-4 px-4">77 cm</td>
                                    <td className="py-4 px-4">28 cm</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bottoms Size Chart */}
                <div className="px-6 md:px-12 py-12 md:py-16 border-b border-hairline">
                    <h2 className="text-[20px] md:text-[24px] font-bold uppercase tracking-tight text-ink mb-8">
                        {t('size.bottoms.title')}
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b-2 border-ink text-[12px] font-bold uppercase tracking-widest text-ink">
                                    <th className="py-4 px-4 min-w-[100px]">{t('size.bottoms.h_size')}</th>
                                    <th className="py-4 px-4 min-w-[120px]">{t('size.bottoms.h_waist')}</th>
                                    <th className="py-4 px-4 min-w-[120px]">{t('size.bottoms.h_inseam')}</th>
                                    <th className="py-4 px-4 min-w-[120px]">{t('size.bottoms.h_leg')}</th>
                                </tr>
                            </thead>
                            <tbody className="text-[14px] text-mute">
                                <tr className="border-b border-hairline hover:bg-hairline/20 transition-colors">
                                    <td className="py-4 px-4 font-bold text-ink">28 (S)</td>
                                    <td className="py-4 px-4">72-76 cm</td>
                                    <td className="py-4 px-4">76 cm</td>
                                    <td className="py-4 px-4">20 cm</td>
                                </tr>
                                <tr className="border-b border-hairline hover:bg-hairline/20 transition-colors">
                                    <td className="py-4 px-4 font-bold text-ink">30 (M)</td>
                                    <td className="py-4 px-4">77-81 cm</td>
                                    <td className="py-4 px-4">78 cm</td>
                                    <td className="py-4 px-4">21 cm</td>
                                </tr>
                                <tr className="border-b border-hairline hover:bg-hairline/20 transition-colors">
                                    <td className="py-4 px-4 font-bold text-ink">32 (L)</td>
                                    <td className="py-4 px-4">82-86 cm</td>
                                    <td className="py-4 px-4">80 cm</td>
                                    <td className="py-4 px-4">22 cm</td>
                                </tr>
                                <tr className="border-b border-hairline hover:bg-hairline/20 transition-colors">
                                    <td className="py-4 px-4 font-bold text-ink">34 (XL)</td>
                                    <td className="py-4 px-4">87-91 cm</td>
                                    <td className="py-4 px-4">82 cm</td>
                                    <td className="py-4 px-4">23 cm</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footwear Size Chart */}
                <div className="px-6 md:px-12 py-12 md:py-16 border-b border-hairline">
                    <h2 className="text-[20px] md:text-[24px] font-bold uppercase tracking-tight text-ink mb-8">
                        {t('size.footwear.title')}
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b-2 border-ink text-[12px] font-bold uppercase tracking-widest text-ink">
                                    <th className="py-4 px-4 min-w-[100px]">{t('size.footwear.h_us')}</th>
                                    <th className="py-4 px-4 min-w-[120px]">{t('size.footwear.h_eu')}</th>
                                    <th className="py-4 px-4 min-w-[120px]">{t('size.footwear.h_uk')}</th>
                                    <th className="py-4 px-4 min-w-[120px]">{t('size.footwear.h_cm')}</th>
                                </tr>
                            </thead>
                            <tbody className="text-[14px] text-mute">
                                <tr className="border-b border-hairline hover:bg-hairline/20 transition-colors">
                                    <td className="py-4 px-4 font-bold text-ink">7</td>
                                    <td className="py-4 px-4">40</td>
                                    <td className="py-4 px-4">6</td>
                                    <td className="py-4 px-4">25 cm</td>
                                </tr>
                                <tr className="border-b border-hairline hover:bg-hairline/20 transition-colors">
                                    <td className="py-4 px-4 font-bold text-ink">8</td>
                                    <td className="py-4 px-4">41</td>
                                    <td className="py-4 px-4">7</td>
                                    <td className="py-4 px-4">26 cm</td>
                                </tr>
                                <tr className="border-b border-hairline hover:bg-hairline/20 transition-colors">
                                    <td className="py-4 px-4 font-bold text-ink">9</td>
                                    <td className="py-4 px-4">42.5</td>
                                    <td className="py-4 px-4">8</td>
                                    <td className="py-4 px-4">27 cm</td>
                                </tr>
                                <tr className="border-b border-hairline hover:bg-hairline/20 transition-colors">
                                    <td className="py-4 px-4 font-bold text-ink">10</td>
                                    <td className="py-4 px-4">44</td>
                                    <td className="py-4 px-4">9</td>
                                    <td className="py-4 px-4">28 cm</td>
                                </tr>
                                <tr className="border-b border-hairline hover:bg-hairline/20 transition-colors">
                                    <td className="py-4 px-4 font-bold text-ink">11</td>
                                    <td className="py-4 px-4">45</td>
                                    <td className="py-4 px-4">10</td>
                                    <td className="py-4 px-4">29 cm</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Headwear Size Chart */}
                <div className="px-6 md:px-12 py-12 md:py-16 border-b border-hairline">
                    <h2 className="text-[20px] md:text-[24px] font-bold uppercase tracking-tight text-ink mb-8">
                        {t('size.headwear.title')}
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b-2 border-ink text-[12px] font-bold uppercase tracking-widest text-ink">
                                    <th className="py-4 px-4 min-w-[150px]">{t('size.headwear.h_type')}</th>
                                    <th className="py-4 px-4 min-w-[150px]">{t('size.headwear.h_fit')}</th>
                                    <th className="py-4 px-4 min-w-[150px]">{t('size.headwear.h_circ')}</th>
                                </tr>
                            </thead>
                            <tbody className="text-[14px] text-mute">
                                <tr className="border-b border-hairline hover:bg-hairline/20 transition-colors">
                                    <td className="py-4 px-4 font-bold text-ink">{t('size.headwear.t1')}</td>
                                    <td className="py-4 px-4">{t('size.headwear.f1')}</td>
                                    <td className="py-4 px-4">55 - 61 cm</td>
                                </tr>
                                <tr className="border-b border-hairline hover:bg-hairline/20 transition-colors">
                                    <td className="py-4 px-4 font-bold text-ink">{t('size.headwear.t2')}</td>
                                    <td className="py-4 px-4">7 1/4 - 7 1/2</td>
                                    <td className="py-4 px-4">57.7 - 59.6 cm</td>
                                </tr>
                                <tr className="border-b border-hairline hover:bg-hairline/20 transition-colors">
                                    <td className="py-4 px-4 font-bold text-ink">{t('size.headwear.t3')}</td>
                                    <td className="py-4 px-4">{t('size.headwear.f3')}</td>
                                    <td className="py-4 px-4">54 - 62 cm</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </NoCapLayout>
    );
}
