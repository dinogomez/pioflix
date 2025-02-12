//@https://icons.pqoqubbw.dev/ 

'use client';

import type { Transition } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

export interface CircleChevronRightIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

const defaultTransition: Transition = {
    times: [0, 0.4, 1],
    duration: 0.5,
};

const CircleChevronRightIcon = forwardRef<
    CircleChevronRightIconHandle,
    HTMLAttributes<HTMLDivElement>
>(({ onMouseEnter, onMouseLeave, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
        isControlledRef.current = true;

        return {
            startAnimation: () => controls.start('animate'),
            stopAnimation: () => controls.start('normal'),
        };
    });

    const handleMouseEnter = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!isControlledRef.current) {
                controls.start('animate');
            } else {
                onMouseEnter?.(e);
            }
        },
        [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!isControlledRef.current) {
                controls.start('normal');
            } else {
                onMouseLeave?.(e);
            }
        },
        [controls, onMouseLeave]
    );

    return (
        <div
            className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="10" />
                <motion.path
                    variants={{
                        normal: { x: 0 },
                        animate: { x: [0, 2, 0] },
                    }}
                    transition={defaultTransition}
                    animate={controls}
                    d="m10 8 4 4-4 4"
                />
            </svg>
        </div>
    );
});

CircleChevronRightIcon.displayName = 'CircleChevronRightIcon';

export { CircleChevronRightIcon };

