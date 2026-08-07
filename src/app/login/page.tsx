"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    Loader2,
    Sparkles,
    ShieldCheck,
    CheckCircle2,
    TrendingUp,
    Globe,
    GitBranch
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { ButtonBorder } from "@/components/ui/button-border";

// High-quality slideshow imagery matching editorial theme
const BLOG_IMAGES = [
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1600&auto=format&fit=crop",
];

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Background Slideshow Interval
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % BLOG_IMAGES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Form Submission
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError("Invalid email or password. Please check your credentials.");
            } else {
                router.push("/");
                router.refresh();
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    // Social Auth Handler
    const handleSocialSignIn = async (provider: string) => {
        setSocialLoading(provider);
        try {
            await signIn(provider, { callbackUrl: "/" });
        } catch (err) {
            setError(`Failed to sign in with ${provider}`);
            setSocialLoading(null);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden bg-slate-950 font-sans">
            {/* --- BACKGROUND SLIDESHOW WITH AURORA OVERLAY --- */}
            <div className="absolute inset-0 z-0">
                {BLOG_IMAGES.map((imgUrl, index) => (
                    <div
                        key={imgUrl}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out bg-cover bg-center ${index === currentImageIndex ? "opacity-35 scale-105" : "opacity-0 scale-100"
                            }`}
                        style={{ backgroundImage: `url(${imgUrl})` }}
                    />
                ))}
                {/* Subtle Gradient Veil */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/80 to-purple-950/40 backdrop-blur-[2px]" />
            </div>

            {/* --- MAIN GLASS CARD --- */}
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 flex w-full max-w-5xl flex-col overflow-hidden rounded-[32px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.4)] border border-white/20 dark:border-slate-800/80 md:flex-row"
            >
                {/* LEFT COLUMN: AUTH FORM */}
                <div className="flex w-full flex-col justify-between p-8 sm:p-10 md:w-1/2 lg:p-12">
                    <div>
                        {/* Header & Brand */}
                        <div className="flex items-center justify-between">
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
                                <Sparkles size={12} />
                                Secure Portal
                            </span>
                        </div>

                        <div className="mt-8">
                            <h1 className="text-3xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
                                Welcome back
                            </h1>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                Sign in to manage your articles, drafts, and reader insights.
                            </p>
                        </div>

                        {/* Error Notification */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, y: -10 }}
                                    animate={{ opacity: 1, height: "auto", y: 0 }}
                                    exit={{ opacity: 0, height: 0, y: -10 }}
                                    className="mt-6 rounded-2xl bg-red-50 dark:bg-red-950/40 p-4 text-xs font-medium text-red-600 dark:text-red-400 border border-red-200/80 dark:border-red-900/50 flex items-center justify-between gap-2"
                                >
                                    <span>{error}</span>
                                    <button
                                        onClick={() => setError(null)}
                                        className="text-red-500 hover:text-red-700 dark:hover:text-red-300 text-sm font-bold"
                                    >
                                        ✕
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Social Logins */}
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => handleSocialSignIn("google")}
                                disabled={!!socialLoading || loading}
                                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all active:scale-95 disabled:opacity-50"
                            >
                                {socialLoading === "google" ? (
                                    <Loader2 size={16} className="animate-spin text-purple-600" />
                                ) : (
                                    <Globe size={16} className="text-purple-600" />
                                )}
                                <span>Google</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => handleSocialSignIn("github")}
                                disabled={!!socialLoading || loading}
                                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all active:scale-95 disabled:opacity-50"
                            >
                                {socialLoading === "github" ? (
                                    <Loader2 size={16} className="animate-spin text-purple-600" />
                                ) : (
                                    <GitBranch size={16} className="text-slate-900 dark:text-white" />
                                )}
                                <span>GitHub</span>
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
                                <span className="bg-white dark:bg-slate-900 px-3 text-slate-400">
                                    Or continue with email
                                </span>
                            </div>
                        </div>

                        {/* Credentials Form */}
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                                >
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="w-full rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/30 pl-11 pr-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:border-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-600/10 transition-all"
                                        placeholder="name@example.com"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label
                                        htmlFor="password"
                                        className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                                    >
                                        Password
                                    </label>
                                    <Link
                                        href="/forgot-password"
                                        className="text-xs font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 hover:underline"
                                    >
                                        Forgot?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="w-full rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/30 pl-11 pr-11 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:border-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-600/10 transition-all"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit CTA */}
                            <button
                                type="submit"
                                disabled={loading || !!socialLoading}
                                className="w-full min-h-[48px] mt-2 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-800 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-purple-600/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        <span>Signing in...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Sign in to Dashboard</span>
                                        <ArrowRight size={16} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Footer Registration Link */}
                    <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                        <span className="text-slate-500 dark:text-slate-400">Don't have an account?</span>
                        <Link
                            href="/register"
                            className="font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 hover:underline px-2 py-1 rounded-lg transition-colors"
                        >
                            Create Account →
                        </Link>
                    </div>
                </div>

                {/* RIGHT COLUMN: BRAND SHOWCASE & LIVE CARD */}
                <div className="relative hidden w-1/2 md:block p-3">
                    <div className="relative h-full w-full overflow-hidden rounded-[24px] bg-slate-900 flex flex-col justify-between p-8">
                        {/* Background Image Showcase */}
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105 transition-transform duration-10000 ease-out"
                            style={{
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop')",
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-purple-950/60 to-transparent" />

                        {/* Top Showcase Header */}
                        <div className="relative z-10 flex items-center justify-between">
                            <span className="tag tag-white text-[10px]">Bloggy Editorial</span>
                            <div className="flex items-center gap-1 text-[11px] text-purple-200 font-mono">
                                <ShieldCheck size={14} className="text-purple-400" /> Encrypted Session
                            </div>
                        </div>

                        {/* Bottom Floating Stats & Quote */}
                        <div className="relative z-10 space-y-4">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                                    "Writing is thinking on paper. Bloggy makes sure your thoughts reach the right minds."
                                </h3>
                                <p className="text-xs text-purple-200/80">
                                    Join over 48,000 independent authors and creators worldwide.
                                </p>
                            </div>

                            {/* Glass Interactive Widget */}
                            <div className="rounded-2xl bg-white/10 backdrop-blur-xl p-4 border border-white/20 shadow-2xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
                                            <TrendingUp size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white">Live Platform Status</p>
                                            <p className="text-[10px] text-purple-200/70">2.4M Readers Active Today</p>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-semibold text-emerald-300">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        Optimal
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}