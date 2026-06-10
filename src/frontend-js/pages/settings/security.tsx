import { Form, Head, Link } from '@inertiajs/react';
import { ShieldCheck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import SecurityController from '@/actions/App/Http/Controllers/Settings/SecurityController';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TwoFactorRecoveryCodes from '@/components/two-factor-recovery-codes';
import TwoFactorSetupModal from '@/components/two-factor-setup-modal';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth';
import { disable, enable } from '@/routes/two-factor';
import NoCapLayout from '@/layouts/nocap-layout';

type Props = {
    canManageTwoFactor?: boolean;
    requiresConfirmation?: boolean;
    twoFactorEnabled?: boolean;
    passwordRules: string;
};

export default function Security({
    canManageTwoFactor = false,
    requiresConfirmation = false,
    twoFactorEnabled = false,
    passwordRules,
}: Props) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const {
        qrCodeSvg,
        hasSetupData,
        manualSetupKey,
        clearSetupData,
        clearTwoFactorAuthData,
        fetchSetupData,
        recoveryCodesList,
        fetchRecoveryCodes,
        errors,
    } = useTwoFactorAuth();
    const [showSetupModal, setShowSetupModal] = useState<boolean>(false);
    const prevTwoFactorEnabled = useRef(twoFactorEnabled);

    useEffect(() => {
        if (prevTwoFactorEnabled.current && !twoFactorEnabled) {
            clearTwoFactorAuthData();
        }

        prevTwoFactorEnabled.current = twoFactorEnabled;
    }, [twoFactorEnabled, clearTwoFactorAuthData]);

    return (
        <NoCapLayout title="Security Settings">
            <div className="flex flex-col px-6 py-8 md:px-12 md:py-12 gap-12 w-full max-w-3xl mx-auto">
                <div className="flex items-center gap-4 text-[14px] font-medium text-mute uppercase tracking-widest mb-4">
                    <Link href="/dashboard" className="hover:text-ink transition-colors">Account</Link>
                    <span>/</span>
                    <span className="text-ink">Security</span>
                </div>

                <div className="space-y-12">
                    <section className="flex flex-col border border-hairline p-8 rounded-none bg-canvas">
                        <div className="mb-8">
                            <h2 className="text-[24px] font-medium uppercase leading-tight text-ink mb-2">Update Password</h2>
                            <p className="text-[14px] text-mute font-medium uppercase tracking-widest">Ensure your account is using a long, random password to stay secure.</p>
                        </div>

                        <Form
                            {...SecurityController.update.form()}
                            options={{ preserveScroll: true }}
                            resetOnError={['password', 'password_confirmation', 'current_password']}
                            resetOnSuccess
                            onError={(errors) => {
                                if (errors.password) passwordInput.current?.focus();
                                if (errors.current_password) currentPasswordInput.current?.focus();
                            }}
                            className="flex flex-col gap-6"
                        >
                            {({ errors, processing }) => (
                                <>
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="current_password" className="text-[12px] font-bold uppercase tracking-widest text-ink">Current password</Label>
                                        <PasswordInput
                                            id="current_password"
                                            ref={currentPasswordInput}
                                            name="current_password"
                                            autoComplete="current-password"
                                            placeholder="CURRENT PASSWORD"
                                            className="bg-transparent text-ink placeholder:text-mute placeholder:uppercase border-hairline focus:border-ink rounded-none h-12"
                                        />
                                        <InputError message={errors.current_password} />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="password" className="text-[12px] font-bold uppercase tracking-widest text-ink">New password</Label>
                                        <PasswordInput
                                            id="password"
                                            ref={passwordInput}
                                            name="password"
                                            autoComplete="new-password"
                                            placeholder="NEW PASSWORD"
                                            passwordrules={passwordRules}
                                            className="bg-transparent text-ink placeholder:text-mute placeholder:uppercase border-hairline focus:border-ink rounded-none h-12"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="password_confirmation" className="text-[12px] font-bold uppercase tracking-widest text-ink">Confirm password</Label>
                                        <PasswordInput
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            autoComplete="new-password"
                                            placeholder="CONFIRM PASSWORD"
                                            passwordrules={passwordRules}
                                            className="bg-transparent text-ink placeholder:text-mute placeholder:uppercase border-hairline focus:border-ink rounded-none h-12"
                                        />
                                        <InputError message={errors.password_confirmation} />
                                    </div>

                                    <div className="mt-4 flex items-center justify-end">
                                        <Button
                                            disabled={processing}
                                            className="bg-ink text-canvas hover:bg-ink/90 font-bold uppercase tracking-widest rounded-none h-12 px-8"
                                        >
                                            Save Password
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </section>

                    {canManageTwoFactor && (
                        <section className="flex flex-col border border-hairline p-8 rounded-none bg-canvas">
                            <div className="mb-8">
                                <h2 className="text-[24px] font-medium uppercase leading-tight text-ink mb-2">Two-Factor Authentication</h2>
                                <p className="text-[14px] text-mute font-medium uppercase tracking-widest">Manage your two-factor authentication settings.</p>
                            </div>

                            {twoFactorEnabled ? (
                                <div className="flex flex-col items-start justify-start gap-6">
                                    <p className="text-[14px] text-ink font-medium">
                                        You will be prompted for a secure, random pin during login, which you can retrieve from the TOTP-supported application on your phone.
                                    </p>

                                    <div className="relative inline">
                                        <Form {...disable.form()}>
                                            {({ processing }) => (
                                                <Button
                                                    variant="destructive"
                                                    type="submit"
                                                    disabled={processing}
                                                    className="font-bold uppercase tracking-widest rounded-none h-12 px-8"
                                                >
                                                    Disable 2FA
                                                </Button>
                                            )}
                                        </Form>
                                    </div>

                                    <TwoFactorRecoveryCodes
                                        recoveryCodesList={recoveryCodesList}
                                        fetchRecoveryCodes={fetchRecoveryCodes}
                                        errors={errors}
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-col items-start justify-start gap-6">
                                    <p className="text-[14px] text-ink font-medium">
                                        When you enable two-factor authentication, you will be prompted for a secure pin during login. This pin can be retrieved from a TOTP-supported application on your phone.
                                    </p>

                                    <div>
                                        {hasSetupData ? (
                                            <Button
                                                onClick={() => setShowSetupModal(true)}
                                                className="bg-ink text-canvas hover:bg-ink/90 font-bold uppercase tracking-widest rounded-none h-12 px-8"
                                            >
                                                <ShieldCheck className="w-5 h-5 mr-2" />
                                                Continue setup
                                            </Button>
                                        ) : (
                                            <Form
                                                {...enable.form()}
                                                onSuccess={() => setShowSetupModal(true)}
                                            >
                                                {({ processing }) => (
                                                    <Button
                                                        type="submit"
                                                        disabled={processing}
                                                        className="bg-ink text-canvas hover:bg-ink/90 font-bold uppercase tracking-widest rounded-none h-12 px-8"
                                                    >
                                                        Enable 2FA
                                                    </Button>
                                                )}
                                            </Form>
                                        )}
                                    </div>
                                </div>
                            )}

                            <TwoFactorSetupModal
                                isOpen={showSetupModal}
                                onClose={() => setShowSetupModal(false)}
                                requiresConfirmation={requiresConfirmation}
                                twoFactorEnabled={twoFactorEnabled}
                                qrCodeSvg={qrCodeSvg}
                                manualSetupKey={manualSetupKey}
                                clearSetupData={clearSetupData}
                                fetchSetupData={fetchSetupData}
                                errors={errors}
                            />
                        </section>
                    )}
                </div>
            </div>
        </NoCapLayout>
    );
}
