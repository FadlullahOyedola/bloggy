"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Sparkles } from "lucide-react";

// 5 High-quality blog & writing related images for the background slideshow
const BLOG_IMAGES = [
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1600&auto=format&fit=crop", // Desk workspace with laptop & coffee
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1600&auto=format&fit=crop", // Person writing in notebook
    "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1600&auto=format&fit=crop", // Hands typing on laptop
    "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1600&auto=format&fit=crop", // Coffee, notebook & glasses
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1600&auto=format&fit=crop", // Study desk with books & creative focus
];

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Background Slideshow State
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Automatically transition slideshow every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % BLOG_IMAGES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        setLoading(false);

        if (res?.error) {
            setError("Invalid email or password");
        } else {
            router.push("/");
            router.refresh();
        }
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8 transition-colors duration-300 overflow-hidden">

            {/* --- FULLSCREEN BACKGROUND SLIDESHOW --- */}
            <div className="absolute inset-0 z-0">
                {BLOG_IMAGES.map((imgUrl, index) => (
                    <div
                        key={imgUrl}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center ${index === currentImageIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"
                            }`}
                        style={{
                            backgroundImage: `url(${imgUrl})`,
                            transitionProperty: "opacity, transform",
                            transitionDuration: "1200ms",
                        }}
                    />
                ))}

                {/* Dark Overlay so the login card pops cleanly */}
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm z-10" />
            </div>

            {/* Background Ambient Glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl animate-pulse"></div>
            </div>

            {/* Split-Screen Main Container */}
            <div className="relative z-20 flex w-full max-w-5xl flex-col overflow-hidden rounded-[32px] bg-white/95 backdrop-blur-md shadow-2xl border border-white/20 md:flex-row transition-all duration-300">

                {/* Left Column: Form & Brand */}
                <div className="flex w-full flex-col justify-between p-8 sm:p-10 md:w-1/2 lg:p-12">
                    <div>
                        {/* Brand Logo & Header */}
                        <div className="text-left">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight focus:outline-none focus:ring-2 focus:ring-purple-600 rounded-lg p-1"
                            >
                                <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-purple-700 to-purple-400"></span>
                                <span className="text-slate-900">Bloggy</span>
                            </Link>
                            <h2 className="mt-6 text-2xl sm:text-3xl font-serif font-bold tracking-tight text-slate-900">
                                Welcome back
                            </h2>
                            <p className="mt-2 text-sm text-slate-600">
                                Sign in to your Bloggy account
                            </p>
                        </div>

                        {/* Dynamic Error Alert */}
                        {error && (
                            <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700 border border-red-200 animate-in fade-in slide-in-from-top-2 duration-300">
                                {error}
                            </div>
                        )}

                        {/* Login Form */}
                        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                {/* Email Address */}
                                <div>
                                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Email address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            className="w-full rounded-full border border-slate-300 bg-slate-50/50 pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all min-h-[44px]"
                                            placeholder="name@example.com"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                            Password
                                        </label>
                                        <a href="#" className="text-xs font-semibold text-purple-700 hover:underline">
                                            Forgot?
                                        </a>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            className="w-full rounded-full border border-slate-300 bg-slate-50/50 pl-10 pr-11 py-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all min-h-[44px]"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Animated Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-full bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 disabled:opacity-60 disabled:hover:translate-y-0"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        <span>Signing in...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Sign in</span>
                                        <ArrowRight size={16} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Bottom Area: Feature Highlight & Footer Link */}
                    <div className="mt-8 space-y-4">
                        {/* Feature Highlight */}
                        <div className="text-center flex items-center justify-center gap-1.5 text-xs text-purple-700 font-medium">
                            <Sparkles size={14} /> Jump back into your reading & writing feed
                        </div>

                        {/* Footer Link */}
                        <p className="text-center text-xs text-slate-600">
                            Don't have an account?{" "}
                            <Link href="/register" className="font-bold text-purple-700 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-600 rounded px-1">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Right Column: Hero Image Container */}
                <div className="relative hidden w-1/2 md:block p-3">
                    <div className="relative h-full w-full overflow-hidden rounded-[24px]">
                        <img
                            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop"
                            alt="Blog author workspace"
                            className="h-full w-full object-cover"
                        />

                        {/* Purple Tint Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/60 via-purple-900/10 to-transparent pointer-events-none"></div>

                        {/* Floating Glass Widget (Bottom Analytics Card) */}
                        <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-4 backdrop-blur-md shadow-xl border border-white/40">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold text-slate-900">Bloggy Feed Active</p>
                                    <p className="text-[10px] text-slate-500">Stay updated with top writers</p>
                                </div>
                                <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-1 text-[10px] font-semibold text-purple-700">
                                    <span className="h-1.5 w-1.5 rounded-full bg-purple-600 animate-pulse"></span>
                                    Live
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}