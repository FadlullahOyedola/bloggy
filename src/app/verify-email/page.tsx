"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, ArrowRight, Loader2, RefreshCw, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VerifyEmailPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleVerify = () => {
        setLoading(true);
        // Simulates email verification before routing to onboarding
        setTimeout(() => {
            setLoading(false);
            router.push("/onboarding/interests");
        }, 1200);
    };

    const handleResend = () => {
        setResending(true);
        setTimeout(() => {
            setResending(false);
            setMessage("Verification email has been resent!");
        }, 1000);
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden bg-slate-950 font-sans">
            {/* --- BACKGROUND DECORATIVE GLOWS & BACKDROP --- */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-25 scale-105"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1600&auto=format&fit=crop')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/80 to-purple-950/40 backdrop-blur-[2px]" />
            </div>

            {/* --- MAIN GLASS CARD --- */}
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 flex w-full max-w-md flex-col overflow-hidden rounded-[32px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.4)] border border-white/20 dark:border-slate-800/80 p-8 sm:p-10 text-center"
            >
                {/* Brand Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-purple-600 rounded-full p-1 transition-all"
                    >
                        <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-purple-700 to-purple-400 group-hover:scale-125 transition-transform" />
                        <span className="text-xl font-bold font-sans tracking-tight text-slate-900 dark:text-white">
                            Bloggy
                        </span>
                    </Link>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-800">
                        <ShieldCheck size={12} />
                        Verification
                    </span>
                </div>

                {/* Mail Animated Badge */}
                <div className="mx-auto my-2 flex h-20 w-20 items-center justify-center rounded-3xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/50 shadow-inner">
                    <Mail size={36} />
                </div>

                <div className="mt-4 space-y-2">
                    <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
                        Check your email
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        We sent a verification link to your email address. Click the button below once you've confirmed it.
                    </p>
                </div>

                {/* Success Alert */}
                <AnimatePresence>
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -10 }}
                            className="mt-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-900/50 flex items-center justify-center gap-2"
                        >
                            <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span>{message}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* CTA Button Group */}
                <div className="mt-8 space-y-3">
                    <button
                        onClick={handleVerify}
                        disabled={loading}
                        className="w-full min-h-[48px] flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-800 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-purple-600/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                <span>Verifying...</span>
                            </>
                        ) : (
                            <>
                                <span>I've Verified My Email</span>
                                <ArrowRight size={16} />
                            </>
                        )}
                    </button>

                    <button
                        onClick={handleResend}
                        disabled={resending}
                        className="w-full text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-colors disabled:opacity-50"
                    >
                        <RefreshCw size={14} className={resending ? "animate-spin text-purple-600" : ""} />
                        <span>Resend Email</span>
                    </button>
                </div>

                {/* Footer info */}
                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5">
                    <Sparkles size={12} className="text-purple-500" />
                    Need help? Check your spam folder or contact support
                </div>
            </motion.div>
        </div>
    );
}