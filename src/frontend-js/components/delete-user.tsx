import { Form } from '@inertiajs/react';
import { useRef } from 'react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export default function DeleteUser() {
    const passwordInput = useRef<HTMLInputElement>(null);

    return (
        <div className="space-y-6">
            <div className="space-y-4 rounded-none border border-ink bg-soft-cloud p-4">
                <div className="relative space-y-0.5 text-sale">
                    <p className="text-[14px] font-bold uppercase tracking-widest">Warning</p>
                    <p className="text-[12px] font-medium uppercase tracking-wider text-ink">
                        Please proceed with caution, this cannot be undone.
                    </p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            data-test="delete-user-button"
                            className="bg-sale text-canvas hover:bg-sale-deep font-bold uppercase tracking-widest rounded-none h-12"
                        >
                            Delete account
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-none border-hairline">
                        <DialogTitle className="text-[18px] font-bold uppercase tracking-tight text-ink">
                            Are you sure you want to delete your account?
                        </DialogTitle>
                        <DialogDescription className="text-[14px] text-mute font-medium">
                            Once your account is deleted, all of its resources
                            and data will also be permanently deleted. Please
                            enter your password to confirm you would like to
                            permanently delete your account.
                        </DialogDescription>

                        <Form
                            {...ProfileController.destroy.form()}
                            options={{
                                preserveScroll: true,
                            }}
                            onError={() => passwordInput.current?.focus()}
                            resetOnSuccess
                            className="space-y-6"
                        >
                            {({ resetAndClearErrors, processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label
                                            htmlFor="password"
                                            className="sr-only"
                                        >
                                            Password
                                        </Label>

                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            ref={passwordInput}
                                            placeholder="ENTER PASSWORD"
                                            autoComplete="current-password"
                                            className="bg-transparent text-ink placeholder:text-mute placeholder:uppercase border-hairline focus:border-ink rounded-none h-12 px-4"
                                        />

                                        <InputError message={errors.password} />
                                    </div>

                                    <DialogFooter className="gap-2 sm:gap-4">
                                        <DialogClose asChild>
                                            <Button
                                                variant="outline"
                                                className="rounded-none font-bold uppercase tracking-widest h-12"
                                                onClick={() =>
                                                    resetAndClearErrors()
                                                }
                                            >
                                                Cancel
                                            </Button>
                                        </DialogClose>

                                        <Button
                                            disabled={processing}
                                            className="bg-sale text-canvas hover:bg-sale-deep font-bold uppercase tracking-widest rounded-none h-12"
                                            asChild
                                        >
                                            <button
                                                type="submit"
                                                data-test="confirm-delete-user-button"
                                            >
                                                Delete account
                                            </button>
                                        </Button>
                                    </DialogFooter>
                                </>
                            )}
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
