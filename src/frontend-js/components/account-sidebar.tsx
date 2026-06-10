import { Link } from '@inertiajs/react';
import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut } from 'lucide-react';
import { useState } from 'react';
import { logoutUser } from '@/lib/storage';
import { useToast } from '@/components/toast-provider';
import ConfirmationModal from '@/components/confirmation-modal';
import { t } from '@/lib/i18n';

export default function AccountSidebar({ activeMenu = 'profile' }: { activeMenu?: string }) {
    const { showToast } = useToast();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const menus = [
        { name: 'Profile', href: '/dashboard', icon: User, id: 'profile' },
        { name: 'Orders', href: '/orders', icon: Package, id: 'orders' },
        { name: 'Favorites', href: '/favorites', icon: Heart, id: 'favorites' },
        { name: 'Addresses', href: '/addresses', icon: MapPin, id: 'addresses' },
        { name: 'Payment', href: '/payment', icon: CreditCard, id: 'payment' },
    ];

    const confirmLogout = () => {
        logoutUser();
        showToast(t('toast.login_failed') ? 'SIGNED OUT SUCCESSFULLY' : 'SIGNED OUT SUCCESSFULLY', 'success'); // using explicit string or dynamic if available
        setIsLogoutModalOpen(false);
        setTimeout(() => {
            if (typeof window !== 'undefined') {
                window.location.href = '/';
            }
        }, 500);
    };

    return (
        <aside className="w-full md:w-[240px] shrink-0">
            <h1 className="text-[24px] font-medium uppercase leading-tight text-ink mb-8">My Account</h1>
            <nav className="flex flex-col gap-1">
                {menus.map((menu) => {
                    const Icon = menu.icon;
                    const isActive = activeMenu === menu.id;
                    return (
                        <Link
                            key={menu.id}
                            href={menu.href}
                            className={`flex items-center gap-3 py-3 px-4 font-medium uppercase tracking-wider text-[14px] transition-colors rounded-none ${
                                isActive
                                    ? 'bg-ink text-canvas'
                                    : 'text-mute hover:text-ink hover:bg-soft-cloud'
                            }`}
                        >
                            <Icon className="w-5 h-5" /> {menu.name}
                        </Link>
                    );
                })}

                <div className="my-2 border-t border-hairline w-full"></div>

                <Link
                    href="/settings/profile"
                    className={`flex items-center gap-3 py-3 px-4 font-medium uppercase tracking-wider text-[14px] transition-colors rounded-none ${
                        activeMenu === 'settings'
                            ? 'bg-ink text-canvas'
                            : 'text-mute hover:text-ink hover:bg-soft-cloud'
                    }`}
                >
                    <Settings className="w-5 h-5" /> Settings
                </Link>

                <button
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="flex items-center w-full text-left gap-3 py-3 px-4 hover:bg-soft-cloud font-medium uppercase tracking-wider text-[14px] text-sale hover:text-sale-deep transition-colors rounded-none"
                >
                    <LogOut className="w-5 h-5" /> Sign Out
                </button>
            </nav>

            <ConfirmationModal 
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={confirmLogout}
                message={t('alert.confirm_logout')}
                confirmText={t('alert.yes_logout')}
            />
        </aside>
    );
}
