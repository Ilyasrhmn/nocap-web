import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { registerUser } from '@/lib/storage';
import { useToast } from '@/components/toast-provider';

export default function Register() {
    const { showToast } = useToast();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('PASSWORDS DO NOT MATCH');
            showToast('PASSWORDS DO NOT MATCH', 'error');
            return;
        }

        if (password.length < 6) {
            setError('PASSWORD MUST BE AT LEAST 6 CHARACTERS');
            showToast('PASSWORD TOO SHORT', 'error');
            return;
        }

        setProcessing(true);
        const result = registerUser(name, email, password);

        if (result.success) {
            showToast('ACCOUNT CREATED — WELCOME', 'success');
            setTimeout(() => {
                if (typeof window !== 'undefined') {
                    window.location.href = '/dashboard';
                }
            }, 500);
        } else {
            setError(result.error || 'REGISTRATION FAILED');
            showToast(result.error || 'REGISTRATION FAILED', 'error');
            setProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-soft-cloud flex flex-col items-center justify-center p-6 font-sans">
            <Head title="Register" />
            
            <div className="w-full max-w-[480px] bg-canvas border border-hairline p-8 md:p-12 flex flex-col items-center shadow-sm">
                <Link href="/" className="mb-10 cursor-pointer transition-transform hover:scale-95">
                    <h1 className="text-[36px] font-bold tracking-tighter uppercase text-ink leading-none">NO CAP.</h1>
                </Link>

                <div className="w-full text-left mb-8">
                    <h2 className="text-[24px] font-medium uppercase leading-tight tracking-tight text-ink border-b border-hairline pb-4">
                        Create Account
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                    <div className="grid gap-6 w-full">
                        <div className="grid gap-2">
                            <label htmlFor="name" className="text-[12px] font-bold uppercase tracking-widest text-ink">Name</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                autoFocus
                                autoComplete="name"
                                placeholder="FULL NAME"
                                className="h-12 px-4 bg-transparent text-ink placeholder:text-mute placeholder:uppercase border border-hairline focus:border-ink focus:ring-0 focus:outline-none rounded-none transition-colors w-full"
                            />
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="email" className="text-[12px] font-bold uppercase tracking-widest text-ink">Email address</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                placeholder="EMAIL@EXAMPLE.COM"
                                className="h-12 px-4 bg-transparent text-ink placeholder:text-mute placeholder:uppercase border border-hairline focus:border-ink focus:ring-0 focus:outline-none rounded-none transition-colors w-full"
                            />
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="password" className="text-[12px] font-bold uppercase tracking-widest text-ink">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="new-password"
                                placeholder="ENTER PASSWORD"
                                className="h-12 px-4 bg-transparent text-ink placeholder:text-mute placeholder:uppercase border border-hairline focus:border-ink focus:ring-0 focus:outline-none rounded-none transition-colors w-full"
                            />
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="password_confirmation" className="text-[12px] font-bold uppercase tracking-widest text-ink">
                                Confirm password
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                autoComplete="new-password"
                                placeholder="CONFIRM PASSWORD"
                                className="h-12 px-4 bg-transparent text-ink placeholder:text-mute placeholder:uppercase border border-hairline focus:border-ink focus:ring-0 focus:outline-none rounded-none transition-colors w-full"
                            />
                            {error && (
                                <p className="text-[12px] font-bold uppercase tracking-widest text-sale mt-1">{error}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-6 w-full bg-ink text-canvas hover:bg-ink/80 font-bold uppercase tracking-widest rounded-none h-12 transition-transform hover:scale-[0.98] disabled:opacity-50"
                        >
                            {processing ? 'CREATING...' : 'JOIN THE MOVEMENT'}
                        </button>
                    </div>

                    <div className="text-center text-[12px] font-bold uppercase tracking-widest text-mute mt-6 pt-6 border-t border-hairline">
                        Already have an account?{' '}
                        <Link href="/auth/login" className="text-ink hover:underline underline-offset-4 ml-1">
                            Log In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
