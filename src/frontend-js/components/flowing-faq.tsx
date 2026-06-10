import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { Plus, Minus } from 'lucide-react';

interface FaqItemData {
    question: string;
    answer: string;
}

interface FlowingFaqProps {
    items: FaqItemData[];
    speed?: number;
}

interface FaqRowProps {
    item: FaqItemData;
    index: number;
    isOpen: boolean;
    onToggle: () => void;
    speed: number;
}

const FaqRow: React.FC<FaqRowProps> = ({ item, index, isOpen, onToggle, speed }) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const marqueeInnerRef = useRef<HTMLDivElement>(null);
    const staticRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Tween | null>(null);
    const [repetitions, setRepetitions] = useState(6);

    const animationDefaults = { duration: 0.5, ease: 'expo' };

    const findClosestEdge = (mouseY: number, height: number): 'top' | 'bottom' => {
        return mouseY < height / 2 ? 'top' : 'bottom';
    };

    useEffect(() => {
        const calculateRepetitions = () => {
            if (!marqueeInnerRef.current) return;
            const marqueeContent = marqueeInnerRef.current.querySelector('.faq-marquee-part') as HTMLElement;
            if (!marqueeContent) return;
            const contentWidth = marqueeContent.offsetWidth;
            const viewportWidth = window.innerWidth;
            if (contentWidth === 0) return;
            const needed = Math.ceil(viewportWidth / contentWidth) + 3;
            setRepetitions(Math.max(6, needed));
        };

        calculateRepetitions();
        window.addEventListener('resize', calculateRepetitions);
        return () => window.removeEventListener('resize', calculateRepetitions);
    }, [item.question]);

    useEffect(() => {
        const setupMarquee = () => {
            if (!marqueeInnerRef.current) return;
            const marqueeContent = marqueeInnerRef.current.querySelector('.faq-marquee-part') as HTMLElement;
            if (!marqueeContent) return;
            const contentWidth = marqueeContent.offsetWidth;
            if (contentWidth === 0) return;

            if (animationRef.current) {
                animationRef.current.kill();
            }

            animationRef.current = gsap.to(marqueeInnerRef.current, {
                x: -contentWidth,
                duration: speed,
                ease: 'none',
                repeat: -1,
            });
        };

        const timer = setTimeout(setupMarquee, 100);
        return () => {
            clearTimeout(timer);
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, [item.question, repetitions, speed]);

    const handleMouseEnter = useCallback((ev: React.MouseEvent<HTMLDivElement>) => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current || !staticRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(ev.clientY - rect.top, rect.height);

        // Fade out static text
        gsap.to(staticRef.current, { opacity: 0, duration: 0.3 });

        gsap
            .timeline({ defaults: animationDefaults })
            .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
            .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
            .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
    }, []);

    const handleMouseLeave = useCallback((ev: React.MouseEvent<HTMLDivElement>) => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current || !staticRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(ev.clientY - rect.top, rect.height);

        // Fade in static text
        gsap.to(staticRef.current, { opacity: 1, duration: 0.3, delay: 0.2 });

        gsap
            .timeline({ defaults: animationDefaults })
            .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
            .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
    }, []);

    return (
        <div className="flex flex-col">
            {/* Question row with hover effect */}
            <div
                className="relative overflow-hidden cursor-pointer"
                ref={itemRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={onToggle}
            >
                {/* Static content (fades out on hover) */}
                <div
                    ref={staticRef}
                    className="flex items-center justify-between w-full py-6 md:py-8 relative z-10"
                >
                    <span className="text-[16px] md:text-[20px] font-medium text-ink uppercase tracking-tight">
                        {item.question}
                    </span>
                    <span className="text-ink shrink-0 ml-6">
                        {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </span>
                </div>

                {/* Marquee overlay (slides in on hover, sits ABOVE static text) */}
                <div
                    className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-20"
                    ref={marqueeRef}
                    style={{
                        transform: 'translateY(101%)',
                        backgroundColor: 'var(--ink)',
                    }}
                >
                    <div className="h-full w-fit flex items-center" ref={marqueeInnerRef}>
                        {[...Array(repetitions)].map((_, idx) => (
                            <div
                                className="faq-marquee-part flex items-center flex-shrink-0"
                                key={idx}
                            >
                                <span
                                    className="whitespace-nowrap uppercase font-semibold text-[16px] md:text-[20px] leading-[1] px-[2vw]"
                                    style={{ color: 'var(--canvas)' }}
                                >
                                    {item.question}
                                </span>
                                <span
                                    className="w-[6px] h-[6px] rounded-full mx-[1vw] flex-shrink-0"
                                    style={{ backgroundColor: 'var(--canvas)', opacity: 0.35 }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hairline divider — respects content padding */}
            <div className="h-px w-full bg-hairline"></div>

            {/* Answer — expands below */}
            <div
                className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div className="overflow-hidden">
                    <div className="py-6 md:py-8">
                        <p className="text-[15px] md:text-[16px] text-mute leading-[1.7] max-w-4xl">
                            {item.answer}
                        </p>
                    </div>
                    {/* Divider after answer too */}
                    <div className="h-px w-full bg-hairline"></div>
                </div>
            </div>
        </div>
    );
};

const FlowingFaq: React.FC<FlowingFaqProps> = ({ items, speed = 12 }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full">
            {/* Top border */}
            <div className="h-px w-full bg-hairline"></div>

            {items.map((item, idx) => (
                <FaqRow
                    key={idx}
                    item={item}
                    index={idx}
                    isOpen={openIndex === idx}
                    onToggle={() => handleToggle(idx)}
                    speed={speed}
                />
            ))}
        </div>
    );
};

export default FlowingFaq;
