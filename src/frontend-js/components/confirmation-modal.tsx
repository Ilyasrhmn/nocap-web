import React, { useEffect, useState } from 'react';

type ConfirmationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message?: string;
};

export default function ConfirmationModal({ 
    isOpen, 
    onClose, 
    onConfirm, 
    message = "ARE YOU SURE YOU WANT TO DELETE THIS ITEM?" 
}: ConfirmationModalProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-auto">
            {/* BACKDROP */}
            <div 
                className="absolute inset-0 bg-ink/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* MODAL */}
            <div className="relative z-10 w-[90%] max-w-[400px] bg-canvas border border-hairline p-8 shadow-2xl flex flex-col gap-8 animate-in zoom-in-95 duration-200">
                <div className="text-center">
                    <h3 className="text-[16px] font-bold uppercase tracking-widest leading-relaxed text-ink">
                        {message}
                    </h3>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="w-full bg-ink text-canvas hover:bg-ink/90 h-12 font-bold uppercase tracking-widest rounded-none transition-transform active:scale-[0.98]"
                    >
                        YES, DELETE
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full bg-transparent border border-hairline text-ink hover:border-ink h-12 font-bold uppercase tracking-widest rounded-none transition-colors"
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
    );
}
