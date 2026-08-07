"use client";

import React from "react";
// simple classnames helper to avoid external dependency import issues
function cn(...args: Array<string | false | null | undefined>) {
    return args.filter(Boolean).join(" ");
}
import { motion } from "framer-motion";

interface ButtonBorderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

export function ButtonBorder({ children, className, ...props }: ButtonBorderProps) {
    return (
        <button
            className={cn(
                "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-slate-900 bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all active:scale-95",
                className
            )}
            {...props}
        >
            <div
                className={cn(
                    "-inset-px pointer-events-none absolute rounded-[inherit] border-2 border-transparent border-inset [mask-clip:padding-box,border-box]",
                    "[mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
                )}
            >
                <motion.div
                    className="absolute aspect-square bg-gradient-to-r from-transparent via-purple-600 to-indigo-600"
                    animate={{
                        offsetDistance: ["0%", "100%"],
                    }}
                    style={{
                        width: 24,
                        offsetPath: `rect(0 auto auto 0 round 99px)`,
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: "linear",
                    }}
                />
            </div>
            {children}
        </button>
    );
}