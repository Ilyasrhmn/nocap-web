import React, { useEffect, useState } from 'react';

// ─────────────────────────────────────────────────────
// NO CAP — Brutalist Toast Notification System
// ─────────────────────────────────────────────────────
// Zero border-radius, uppercase, bold, 3-second dismiss.
// Success = ink background. Error = sale (red) background.
// ─────────────────────────────────────────────────────

type ToastType = 'success' | 'error';

type ToastAction = {
  label: string;
  onClick: () => void;
};

type Toast = {
  id: number;
  message: string;
  type: ToastType;
  action?: ToastAction;
};

// Global emitter function
export const globalShowToast = (message: string, type: ToastType = 'success', action?: ToastAction) => {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('nocap:toast', {
            detail: { message, type, action }
        }));
    }
};

export const useToast = () => ({
  showToast: globalShowToast
});

let toastIdCounter = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handleToastEvent = (e: Event) => {
        const customEvent = e as CustomEvent;
        const { message, type, action } = customEvent.detail;
        
        const id = ++toastIdCounter;
        
        // Auto-inject login action for specific auth error messages
        let finalAction = action;
        let finalMessage = message;

        if (message.includes('[ LOGIN HERE ]')) {
            finalMessage = message.replace(/\.?\s*\[ LOGIN HERE \]/, '');
            finalAction = {
                label: '[ LOGIN HERE ]',
                onClick: () => {
                    if (typeof window !== 'undefined') {
                        window.location.href = '/auth/login';
                    }
                }
            };
        } else if (!finalAction && message.includes('LOGIN')) {
            finalAction = {
                label: '[ LOGIN HERE ]',
                onClick: () => {
                    if (typeof window !== 'undefined') {
                        window.location.href = '/auth/login';
                    }
                }
            };
        }

        setToasts((prev) => [...prev, { id, message: finalMessage, type, action: finalAction }]);

        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000); // Increased timeout slightly to allow users to click the action
    };

    if (typeof window !== 'undefined') {
        window.addEventListener('nocap:toast', handleToastEvent);
        return () => window.removeEventListener('nocap:toast', handleToastEvent);
    }
  }, []);

  return (
    <>
      {children}

      {/* TOAST CONTAINER — fixed top-right */}
      <div className="fixed top-24 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            onClick={() => {
                if (toast.action) toast.action.onClick();
            }}
            className={`pointer-events-auto flex items-center gap-4 px-6 py-4 min-w-[280px] max-w-[400px] shadow-lg transition-all duration-300 animate-in slide-in-from-right-5 ${
              toast.type === 'error'
                ? 'bg-sale text-canvas'
                : 'bg-ink text-canvas'
            } ${toast.action ? 'cursor-pointer hover:opacity-95' : ''}`}
            style={{ borderRadius: 0 }}
          >
            <div className="flex flex-col flex-1 gap-2">
                <span className="text-[12px] font-bold uppercase tracking-widest leading-tight">
                {toast.message}
                </span>
                {toast.action && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toast.action!.onClick();
                        }}
                        className="text-[10px] font-black uppercase tracking-[0.2em] w-max border-b border-current hover:opacity-70 transition-opacity"
                    >
                        {toast.action.label}
                    </button>
                )}
            </div>
            <button
              onClick={(e) => {
                  e.stopPropagation();
                  setToasts((prev) => prev.filter((t) => t.id !== toast.id));
              }}
              className="text-canvas/60 hover:text-canvas transition-colors shrink-0 text-[16px] font-bold self-start"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
