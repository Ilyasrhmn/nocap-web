import { Form, Head, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    return (
        <div className="min-h-screen bg-soft-cloud flex flex-col items-center justify-center p-6 font-sans">
            <Head title="Log in" />

            <div className="w-full max-w-[480px] bg-canvas border border-hairline p-8 md:p-12 flex flex-col items-center shadow-sm">
                <Link href="/" className="mb-10 cursor-pointer transition-transform hover:scale-95">
                    <h1 className="text-[36px] font-bold tracking-tighter uppercase text-ink leading-none">NO CAP.</h1>
                </Link>

                <div className="w-full text-left mb-8">
                    <h2 className="text-[24px] font-medium uppercase leading-tight tracking-tight text-ink border-b border-hairline pb-4">
                        Login to Account
                    </h2>
                </div>

                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    className="flex flex-col gap-6 w-full"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-6 w-full">
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-[12px] font-bold uppercase tracking-widest text-ink">Email address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="ENTER EMAIL"
                                        className="h-12 px-4 bg-transparent text-ink placeholder:text-mute placeholder:uppercase border border-hairline focus:border-ink focus:ring-0 rounded-none transition-colors"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className="text-[12px] font-bold uppercase tracking-widest text-ink">Password</Label>
                                        <TextLink
                                            href={request()}
                                            className="text-[12px] font-bold uppercase tracking-widest text-mute hover:text-ink transition-colors underline underline-offset-4"
                                            tabIndex={5}
                                        >
                                            Forgot password?
                                        </TextLink>
                                    </div>
                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="ENTER PASSWORD"
                                        className="h-12 px-4 bg-transparent text-ink placeholder:text-mute placeholder:uppercase border border-hairline focus:border-ink focus:ring-0 rounded-none transition-colors"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="flex items-center space-x-3 mt-2">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        tabIndex={3}
                                        className="rounded-none border border-hairline data-[state=checked]:border-ink data-[state=checked]:bg-ink data-[state=checked]:text-canvas transition-colors h-5 w-5"
                                    />
                                    <Label htmlFor="remember" className="text-[12px] font-bold uppercase tracking-widest text-ink cursor-pointer">Remember me</Label>
                                </div>

                                <Button
                                    type="submit"
                                    className="mt-6 w-full bg-ink text-canvas hover:bg-ink/80 font-bold uppercase tracking-widest rounded-none h-12 transition-transform hover:scale-[0.98]"
                                    tabIndex={4}
                                    disabled={processing}
                                    data-test="login-button"
                                >
                                    {processing && <Spinner className="mr-2" />}
                                    Log In
                                </Button>
                            </div>

                            <div className="text-center text-[12px] font-bold uppercase tracking-widest text-mute mt-6 pt-6 border-t border-hairline">
                                Don't have an account?{' '}
                                <TextLink href={register()} tabIndex={5} className="text-ink hover:underline underline-offset-4 ml-1">
                                    Join Us
                                </TextLink>
                            </div>
                        </>
                    )}
                </Form>

                {status && (
                    <div className="mt-8 text-center text-sm font-medium text-success">
                        {status}
                    </div>
                )}
            </div>
        </div>
    );
}

Login.layout = {
    title: 'LOG IN',
    description: 'ENTER YOUR CREDENTIALS TO CONTINUE',
};
