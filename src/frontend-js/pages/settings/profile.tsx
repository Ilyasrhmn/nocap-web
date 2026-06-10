import { Form, Head, Link, usePage } from '@inertiajs/react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/delete-user';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { edit } from '@/routes/profile';
import { send } from '@/routes/verification';
import NoCapLayout from '@/layouts/nocap-layout';
import AccountSidebar from '@/components/account-sidebar';

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage().props;

    return (
        <NoCapLayout title="Profile Settings">
            <div className="flex flex-col md:flex-row px-6 py-8 md:px-12 md:py-12 gap-12 w-full">
                
                <AccountSidebar activeMenu="settings" />

                <div className="flex-1 flex flex-col gap-12">
                    <div className="flex items-center gap-4 text-[14px] font-medium text-mute uppercase tracking-widest mb-2">
                        <Link href="/dashboard" className="hover:text-ink transition-colors">Account</Link>
                        <span>/</span>
                        <span className="text-ink">Settings</span>
                    </div>

                    <div className="space-y-12">
                        <section className="flex flex-col border border-hairline p-8 rounded-none bg-canvas">
                            <div className="mb-8">
                                <h2 className="text-[24px] font-medium uppercase leading-tight text-ink mb-2">Profile Information</h2>
                                <p className="text-[14px] text-mute font-medium uppercase tracking-widest">Update your account's profile information and email address.</p>
                            </div>

                            <Form
                                {...ProfileController.update.form()}
                                options={{ preserveScroll: true }}
                                className="flex flex-col gap-6"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="name" className="text-[12px] font-bold uppercase tracking-widest text-ink">Name</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                defaultValue={auth.user.name}
                                                required
                                                autoComplete="name"
                                                placeholder="FULL NAME"
                                                className="bg-transparent text-ink placeholder:text-mute placeholder:uppercase border-hairline focus:border-ink rounded-none h-12"
                                            />
                                            <InputError message={errors.name} />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="email" className="text-[12px] font-bold uppercase tracking-widest text-ink">Email address</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                defaultValue={auth.user.email}
                                                required
                                                autoComplete="username"
                                                placeholder="EMAIL ADDRESS"
                                                className="bg-transparent text-ink placeholder:text-mute placeholder:uppercase border-hairline focus:border-ink rounded-none h-12"
                                            />
                                            <InputError message={errors.email} />
                                        </div>

                                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                                            <div className="bg-soft-cloud p-4 border border-hairline">
                                                <p className="text-[14px] text-ink font-medium">
                                                    Your email address is unverified.{' '}
                                                    <Link
                                                        href={send()}
                                                        as="button"
                                                        className="underline hover:text-mute transition-colors uppercase tracking-widest text-[12px]"
                                                    >
                                                        Resend verification email
                                                    </Link>
                                                </p>
                                                {status === 'verification-link-sent' && (
                                                    <div className="mt-2 text-[12px] font-bold uppercase tracking-widest text-success">
                                                        A new verification link has been sent.
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        <div className="mt-4 flex items-center justify-end">
                                            <Button
                                                disabled={processing}
                                                className="bg-ink text-canvas hover:bg-ink/90 font-bold uppercase tracking-widest rounded-none h-12 px-8"
                                            >
                                                Save Changes
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </section>

                        <section className="flex flex-col border border-hairline p-8 rounded-none bg-canvas">
                            <div className="mb-8 flex flex-col gap-4">
                                <h2 className="text-[24px] font-medium uppercase leading-tight text-ink mb-2">Delete Account</h2>
                                <p className="text-[14px] text-mute font-medium uppercase tracking-widest max-w-xl">
                                    Once your account is deleted, all of its resources and data will be permanently deleted.
                                </p>
                                <DeleteUser />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </NoCapLayout>
    );
}
