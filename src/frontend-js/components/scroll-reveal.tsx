import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    y?: number;
    duration?: number;
}

export default function ScrollReveal({ 
    children, 
    className = "", 
    delay = 0,
    y = 40,
    duration = 1.2
}: ScrollRevealProps) {
    const el = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!el.current) return;
        
        gsap.from(el.current, {
            y: y,
            opacity: 0,
            duration: duration,
            delay: delay,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el.current,
                start: "top 85%",
                toggleActions: "play none none none", // Play once for smooth, unforced UX
            }
        });
    }, { scope: el });

    return (
        <div ref={el} className={className}>
            {children}
        </div>
    );
}
