import en from '@/../locales/en.json';
import id from '@/../locales/id.json';

const dictionaries: Record<string, Record<string, string>> = { en, id };

function isBrowser() {
    return typeof window !== 'undefined';
}

export function getLang(): string {
    if (!isBrowser()) return 'en';
    let lang = localStorage.getItem('nocap_lang');
    if (!lang) {
        lang = 'en';
        localStorage.setItem('nocap_lang', lang);
    }
    return lang;
}

export function setLang(lang: string) {
    if (!isBrowser()) return;
    localStorage.setItem('nocap_lang', lang);
}

export function t(key: string): string {
    const lang = getLang();
    const dict = dictionaries[lang] || dictionaries['en'];
    return dict[key] || key;
}

export function formatPrice(usdPrice: number): string {
    const lang = getLang();
    if (lang === 'id') {
        const idr = usdPrice * 16000;
        return `Rp ${idr.toLocaleString('id-ID')}`;
    }
    return `$${usdPrice.toFixed(2)}`;
}
