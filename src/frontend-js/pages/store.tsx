import { Head } from '@inertiajs/react';
import { MapPin } from 'lucide-react';
import NoCapLayout from '@/layouts/nocap-layout';
import { t } from '@/lib/i18n';

export default function Store() {
    return (
        <NoCapLayout title="Store Locator">
            <div className="flex-1 w-full max-w-[1440px] mx-auto min-h-[calc(100vh-140px)] flex flex-col md:flex-row">
                
                {/* LOCATION INFO */}
                <div className="flex-1 p-8 md:p-16 flex flex-col justify-center bg-canvas">
                    <div className="flex items-center gap-4 text-ink mb-6">
                        <MapPin className="w-10 h-10" />
                        <h1 className="text-[32px] md:text-[48px] font-black uppercase leading-none tracking-tighter">
                            {t('store.headquarters')}
                        </h1>
                    </div>
                    
                    <div className="h-px w-full bg-hairline mb-12"></div>
                    
                    <div className="flex flex-col gap-8">
                        <div>
                            <h3 className="text-[14px] font-bold uppercase tracking-widest text-mute mb-2">{t('store.address_label')}</h3>
                            <p className="text-[24px] font-medium uppercase text-ink leading-tight">
                                Condong Catur, Sleman<br />
                                Yogyakarta, Indonesia<br />
                                55281
                            </p>
                        </div>
                        
                        <div>
                            <h3 className="text-[14px] font-bold uppercase tracking-widest text-mute mb-2">{t('store.hours_label')}</h3>
                            <div className="flex flex-col gap-2 text-[16px] font-medium text-ink uppercase tracking-wider">
                                <div className="flex justify-between max-w-xs border-b border-hairline pb-2">
                                    <span>{t('store.mon_fri')}</span>
                                    <span>10:00 - 22:00</span>
                                </div>
                                <div className="flex justify-between max-w-xs border-b border-hairline pb-2">
                                    <span>{t('store.sat_sun')}</span>
                                    <span>09:00 - 23:00</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[14px] font-bold uppercase tracking-widest text-mute mb-2">{t('store.contact_label')}</h3>
                            <p className="text-[16px] font-medium text-ink uppercase tracking-wider">
                                INFO@NOCAP.COM<br />
                                +62 812 3456 7890
                            </p>
                        </div>
                    </div>
                </div>

                {/* VISUAL/MAP PLACEHOLDER */}
                <div className="flex-1 bg-ink relative min-h-[400px]">
                    <img 
                        src="https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?q=80&w=1200&auto=format&fit=crop" 
                        alt="Store Location" 
                        className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity"
                    />
                    <div className="absolute inset-0 bg-ink/30"></div>
                    <div className="absolute bottom-8 right-8 bg-canvas p-4 border border-hairline">
                        <p className="text-[12px] font-bold uppercase tracking-widest text-ink">NO CAP FLAGSHIP</p>
                    </div>
                </div>

            </div>
        </NoCapLayout>
    );
}
