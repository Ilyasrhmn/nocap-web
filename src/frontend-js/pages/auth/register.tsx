import { Form, Head } from '@inertiajs/react';
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
        <>
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
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
                                    className="bg-transparent text-ink placeholder:text-mute placeholder:uppercase border-hairline focus:border-ink rounded-none"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
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
                                    className="bg-transparent text-ink placeholder:text-mute placeholder:uppercase border-hairline focus:border-ink rounded-none"
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
                                    className="bg-transparent text-ink placeholder:text-mute placeholder:uppercase border-hairline focus:border-ink rounded-none"
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
                                    className="bg-transparent text-ink placeholder:text-mute placeholder:uppercase border-hairline focus:border-ink rounded-none"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full bg-ink text-canvas hover:bg-ink/90 font-bold uppercase tracking-widest rounded-none h-12"
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner className="mr-2" />}
                                Create account
                            </Button>
                        </div>

                        <div className="text-center text-[12px] font-bold uppercase tracking-widest text-mute mt-4">
                            Already have an account?{' '}
                            <TextLink href={login()} tabIndex={6} className="text-ink hover:underline">
                                Log in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'CREATE ACCOUNT',
    description: 'JOIN THE MOVEMENT',
};
