import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import NoCapLayout from '@/layouts/nocap-layout';
import { t } from '@/lib/i18n';

export default function Contact() {
    return (
        <NoCapLayout title="Contact">
            <div className="flex-1 w-full max-w-[1440px] mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-140px)] py-16 px-6">
                <div className="w-full max-w-xl flex flex-col gap-8">
                    <div className="text-center">
                        <h1 className="text-[48px] md:text-[64px] font-black uppercase leading-none tracking-tighter text-ink mb-4">
                            {t('contact.title')}
                        </h1>
                        <p className="text-[14px] font-medium uppercase tracking-widest text-mute">
                            {t('contact.subtitle')}
                        </p>
                    </div>

                    <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="name" className="text-[12px] font-bold uppercase tracking-widest text-ink">{t('contact.name')}</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder={t('contact.placeholder_name')}
                                    className="bg-transparent text-ink placeholder:text-mute placeholder:uppercase border-hairline focus:border-ink rounded-none h-12"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email" className="text-[12px] font-bold uppercase tracking-widest text-ink">{t('contact.email')}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder={t('contact.placeholder_email')}
                                    className="bg-transparent text-ink placeholder:text-mute placeholder:uppercase border-hairline focus:border-ink rounded-none h-12"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="subject" className="text-[12px] font-bold uppercase tracking-widest text-ink">{t('contact.subject')}</Label>
                            <Input
                                id="subject"
                                type="text"
                                placeholder={t('contact.placeholder_subject')}
                                className="bg-transparent text-ink placeholder:text-mute placeholder:uppercase border-hairline focus:border-ink rounded-none h-12"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="message" className="text-[12px] font-bold uppercase tracking-widest text-ink">{t('contact.message')}</Label>
                            <textarea
                                id="message"
                                rows={5}
                                placeholder={t('contact.placeholder_message')}
                                className="bg-transparent text-ink placeholder:text-mute placeholder:uppercase border border-hairline focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink rounded-none p-3 text-sm resize-none"
                            ></textarea>
                        </div>
                        
                        <Button
                            type="submit"
                            className="w-full bg-ink text-canvas hover:bg-ink/90 font-bold uppercase tracking-widest rounded-none h-14 mt-4 transition-transform active:scale-[0.98]"
                        >
                            {t('contact.send')}
                        </Button>
                    </form>
                </div>
            </div>
        </NoCapLayout>
    );
}
