import React from 'react';
import { getCurrentUser } from '@/lib/storage';

export const Head = ({ title }: { title?: string }) => {
    if (typeof document !== 'undefined' && title) {
        document.title = title;
    }
    return null;
};

export const Link = React.forwardRef(({ href, children, className, preserveScroll, preserveState, method, as, ...props }: any, ref) => {
    let actualHref = href;
    if (typeof href === 'object' && href !== null) {
        actualHref = href.url || '#';
    }
    // If rendered as="button", return a button
    if (as === 'button') {
        return <button className={className} ref={ref as any} {...props}>{children}</button>;
    }
    return <a href={actualHref} className={className} ref={ref} {...props}>{children}</a>;
});
Link.displayName = 'Link';

export const usePage = () => {
    // Reactive: read from localStorage when available
    const user = getCurrentUser();
    return {
        props: {
            auth: {
                user: user
                    ? { name: user.name, email: user.email, created_at: user.created_at }
                    : null,
            },
            errors: {},
            flash: {},
        },
        url: typeof window !== 'undefined' ? window.location.pathname : '/',
    };
};

export const useForm = (initialData: any) => {
    const [data, setData] = React.useState(initialData);
    const [processing, setProcessing] = React.useState(false);
    const [errors, setErrors] = React.useState({});

    return {
        data,
        setData: (keyOrData: any, value?: any) => {
            if (typeof keyOrData === 'string') {
                setData((prev: any) => ({ ...prev, [keyOrData]: value }));
            } else if (typeof keyOrData === 'function') {
                setData((prev: any) => keyOrData(prev));
            } else {
                setData(keyOrData);
            }
        },
        post: (url: string) => { console.log('POST', url, data); },
        put: (url: string) => { console.log('PUT', url, data); },
        delete: (url: string) => { console.log('DELETE', url, data); },
        processing,
        errors,
        reset: () => setData(initialData),
        clearErrors: () => setErrors({}),
    };
};

export const router = {
    get: (url: string) => { if (typeof window !== 'undefined') window.location.href = url; },
    post: (url: string) => { console.log('router.post', url); },
    put: (url: string) => { console.log('router.put', url); },
    delete: (url: string) => { console.log('router.delete', url); },
    visit: (url: string) => { if (typeof window !== 'undefined') window.location.href = url; },
};

export const Form = ({ children, className, onSubmit, ...props }: any) => {
    const mockState = { processing: false, errors: {}, resetAndClearErrors: () => {} };
    return (
        <form className={className} onSubmit={(e) => { e.preventDefault(); if (onSubmit) onSubmit(e); }}>
            {typeof children === 'function' ? children(mockState) : children}
        </form>
    );
};

export const useHttp = () => ({
    submit: async () => { return {}; }
});

export const setLayoutProps = () => {};

export const createInertiaApp = () => {};

export type InertiaLinkProps = any;
