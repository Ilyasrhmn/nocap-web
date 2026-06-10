import { Form, Head, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
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

                <Form
                    {...store.form()}
                    resetOnSuccess={['password', 'password_confirmation']}
                    disableWhileProcessing
                    className="flex flex-col gap-6 w-full"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-6 w-full">
                                <div className="grid gap-2">
                                    <Label htmlFor="name" className="text-[12px] font-bold uppercase tracking-widest text-ink">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        name="name"
                                        placeholder="FULL NAME"
                                        className="h-12 px-4 bg-transparent text-ink placeholder:text-mute placeholder:uppercase border border-hairline focus:border-ink focus:ring-0 rounded-none transition-colors"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-[12px] font-bold uppercase tracking-widest text-ink">Email address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        name="email"
                                        placeholder="EMAIL@EXAMPLE.COM"
                                        className="h-12 px-4 bg-transparent text-ink placeholder:text-mute placeholder:uppercase border border-hairline focus:border-ink focus:ring-0 rounded-none transition-colors"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="text-[12px] font-bold uppercase tracking-widest text-ink">Password</Label>
                                    <PasswordInput
                                        id="password"
                                        required
                                        tabIndex={3}
                                        autoComplete="new-password"
                                        name="password"
                                        placeholder="ENTER PASSWORD"
                                        passwordrules={passwordRules}
                                        className="h-12 px-4 bg-transparent text-ink placeholder:text-mute placeholder:uppercase border border-hairline focus:border-ink focus:ring-0 rounded-none transition-colors"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation" className="text-[12px] font-bold uppercase tracking-widest text-ink">
                                        Confirm password
                                    </Label>
                                    <PasswordInput
                                        id="password_confirmation"
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        name="password_confirmation"
                                        placeholder="CONFIRM PASSWORD"
                                        passwordrules={passwordRules}
                                        className="h-12 px-4 bg-transparent text-ink placeholder:text-mute placeholder:uppercase border border-hairline focus:border-ink focus:ring-0 rounded-none transition-colors"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                <Button
                                    type="submit"
                                    className="mt-6 w-full bg-ink text-canvas hover:bg-ink/80 font-bold uppercase tracking-widest rounded-none h-12 transition-transform hover:scale-[0.98]"
                                    tabIndex={5}
                                    data-test="register-user-button"
                                    disabled={processing}
                                >
                                    {processing && <Spinner className="mr-2" />}
                                    Join The Movement
                                </Button>
                            </div>

                            <div className="text-center text-[12px] font-bold uppercase tracking-widest text-mute mt-6 pt-6 border-t border-hairline">
                                Already have an account?{' '}
                                <TextLink href={login()} tabIndex={6} className="text-ink hover:underline underline-offset-4 ml-1">
                                    Log In
                                </TextLink>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </div>
    );
}

Register.layout = {
    title: 'CREATE ACCOUNT',
    description: 'JOIN THE MOVEMENT',
};
