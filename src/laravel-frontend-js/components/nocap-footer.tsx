import { Link } from '@inertiajs/react';

export default function NoCapFooter() {
    return (
        <footer className="mt-auto border-t border-hairline bg-canvas transition-colors duration-300 shrink-0 w-full">
            {/* MAIN FOOTER LINKS */}
            <div className="grid grid-cols-1 gap-8 px-6 py-12 md:grid-cols-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="flex flex-col gap-4">
                    <h4 className="text-[16px] font-medium uppercase text-ink">Resources</h4>
                    <Link href="#" className="text-[14px] font-medium text-mute hover:text-ink transition-colors">Gift Cards</Link>
                    <Link href="/store" className="text-[14px] font-medium text-mute hover:text-ink transition-colors">Find a Store</Link>
                    <Link href="/membership" className="text-[14px] font-medium text-mute hover:text-ink transition-colors">Become a Member</Link>
                    <Link href="#" className="text-[14px] font-medium text-mute hover:text-ink transition-colors">Site Feedback</Link>
                </div>
                <div className="flex flex-col gap-4">
                    <h4 className="text-[16px] font-medium uppercase text-ink">Help</h4>
                    <Link href="#" className="text-[14px] font-medium text-mute hover:text-ink transition-colors">Get Help</Link>
                    <Link href="#" className="text-[14px] font-medium text-mute hover:text-ink transition-colors">Order Status</Link>
                    <Link href="#" className="text-[14px] font-medium text-mute hover:text-ink transition-colors">Shipping and Delivery</Link>
                    <Link href="#" className="text-[14px] font-medium text-mute hover:text-ink transition-colors">Returns</Link>
                    <Link href="/contact" className="text-[14px] font-medium text-mute hover:text-ink transition-colors">Contact Us</Link>
                </div>
                <div className="flex flex-col gap-4">
                    <h4 className="text-[16px] font-medium uppercase text-ink">Company</h4>
                    <Link href="/about" className="text-[14px] font-medium text-mute hover:text-ink transition-colors">About No Cap</Link>
                    <Link href="#" className="text-[14px] font-medium text-mute hover:text-ink transition-colors">News</Link>
                    <Link href="#" className="text-[14px] font-medium text-mute hover:text-ink transition-colors">Careers</Link>
                    <Link href="#" className="text-[14px] font-medium text-mute hover:text-ink transition-colors">Investors</Link>
                </div>
                <div className="flex flex-col gap-4">
                    <h4 className="text-[16px] font-medium uppercase text-ink">Promotions</h4>
                    <Link href="#" className="text-[14px] font-medium text-mute hover:text-ink transition-colors">Student Discount</Link>
                    <Link href="#" className="text-[14px] font-medium text-mute hover:text-ink transition-colors">Military Discount</Link>
                    <Link href="#" className="text-[14px] font-medium text-mute hover:text-ink transition-colors">First Responder Discount</Link>
                </div>
            </div>
            
            {/* UTILITY ROW */}
            <div className="flex flex-col items-center justify-between border-t border-hairline px-6 py-6 md:flex-row md:px-12 max-w-[1440px] mx-auto">
                <p className="mb-4 text-[12px] font-medium text-mute md:mb-0">
                    &copy; {new Date().getFullYear()} No Cap, Inc. All Rights Reserved
                </p>
                <div className="flex flex-wrap gap-6 justify-center">
                    <Link href="#" className="text-[12px] font-medium text-mute hover:text-ink transition-colors">Guides</Link>
                    <Link href="#" className="text-[12px] font-medium text-mute hover:text-ink transition-colors">Terms of Sale</Link>
                    <Link href="#" className="text-[12px] font-medium text-mute hover:text-ink transition-colors">Terms of Use</Link>
                    <Link href="#" className="text-[12px] font-medium text-mute hover:text-ink transition-colors">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
}
