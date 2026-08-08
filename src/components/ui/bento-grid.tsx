import { type ComponentPropsWithoutRef, type ReactNode } from "react";

const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
    </svg>
);

import { cn } from "@/lib/utils";
import { ButtonBorder } from "@/components/ui/button-border";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
    children: ReactNode;
    className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
    name: string;
    className: string;
    background: ReactNode;
    Icon: React.ElementType;
    description: string;
    href: string;
    cta: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
    return (
        <div
            className={cn(
                "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-6",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

const BentoCard = ({
    name,
    className,
    background,
    Icon,
    description,
    href,
    cta,
    ...props
}: BentoCardProps) => (
    <div
        key={name}
        className={cn(
            "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition-all duration-300",
            className
        )}
        {...props}
    >
        <div className="absolute inset-0 pointer-events-none z-0">{background}</div>

        <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-between h-full">
            <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-3 transition-all duration-300 lg:group-hover:-translate-y-2">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-100 dark:border-purple-800/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <Icon className="h-6 w-6 transform-gpu transition-all duration-300 ease-in-out group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
                    {description}
                </p>
            </div>

            <div className="pt-4 pointer-events-auto">
                <a href={href} className="inline-block">
                    <ButtonBorder className="text-xs px-4 py-2 font-semibold flex items-center gap-2 text-purple-700 dark:text-purple-300">
                        <span>{cta}</span>
                        <ArrowRightIcon className="h-4 w-4" />
                    </ButtonBorder>
                </a>
            </div>
        </div>
    </div>
);

export { BentoCard, BentoGrid };