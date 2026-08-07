"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/app/actions/register";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Sparkles } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const res = await registerUser(formData);

        setLoading(false);

        if (res?.error) {
            setError(res.error);
        } else if (res?.success) {
            setSuccess("Account created successfully! Please check your email inbox (and spam folder) for the verification link.");
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12 transition-colors duration-300">
            {/* Background Decorative Ambient Glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-700/10 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <div className="relative z-10 w-full max-w-md space-y-8 rounded-2xl bg-white p-8 sm:p-10 shadow-xl border border-slate-200 transition-all duration-300">
                {/* Brand Logo & Header */}
                <div className="text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight focus:outline-none focus:ring-2 focus:ring-purple-600 rounded-lg p-1"
                    >
                        <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-purple-700 to-purple-400"></span>
                        <span className="text-slate-900">Bloggy</span>
                    </Link>
                    <h2 className="mt-6 text-2xl sm:text-3xl font-serif font-bold tracking-tight text-slate-900">
                        Create an account
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Join Bloggy to start writing and reading stories
                    </p>
                </div>

                {/* Dynamic Alerts */}
                {error && (
                    <div className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700 border border-red-200 animate-in fade-in slide-in-from-top-2 duration-300">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700 border border-emerald-200 animate-in fade-in slide-in-from-top-2 duration-300">
                        {success}
                    </div>
                )}

                {/* Registration Form */}
                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <User size={18} />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="w-full rounded-xl border border-slate-300 bg-slate-50/50 pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all min-h-[44px]"
                                    placeholder="Jane Doe"
                                />
                            </div>
                        </div>

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
                                    className="w-full rounded-xl border border-slate-300 bg-slate-50/50 pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all min-h-[44px]"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Lock size={18} />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="w-full rounded-xl border border-slate-300 bg-slate-50/50 pl-10 pr-11 py-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all min-h-[44px]"
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-full bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 disabled:opacity-60 disabled:hover:translate-y-0"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                <span>Creating account...</span>
                            </>
                        ) : (
                            <>
                                <span>Sign up</span>
                                <ArrowRight size={16} />
                            </>
                        )}
                    </button>
                </form>

                {/* Feature Highlight Badge */}
                <div className="pt-2 text-center flex items-center justify-center gap-1.5 text-xs text-purple-700 font-medium">
                    <Sparkles size={14} /> Includes access to Bloggy AI tools & audio stories
                </div>

                {/* Footer Link */}
                <p className="text-center text-xs text-slate-600">
                    Already have an account?{" "}
                    <Link href="/login" className="font-bold text-purple-700 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-600 rounded px-1">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}