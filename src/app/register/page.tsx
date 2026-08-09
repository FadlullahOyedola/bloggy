"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import logo from "@/app/logo.png.webp";
import {
    Sparkles,
    ArrowRight,
    CheckCircle2,
    Lock,
    Mail,
    User,
    Eye,
    EyeOff,
    Globe,
    Loader2,
} from "lucide-react";

function GithubLogo() {
    return (
        <svg className="w-4 h-4 fill-current text-slate-900" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
    );
}

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const logoSrc = typeof logo === "string" ? logo : logo.src;

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        agreeToTerms: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed. Please try again.");
            }

            // Redirect directly to verify-email route upon success
            router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
        } catch (err: any) {
            setErrorMessage(err.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF8FF] flex flex-col justify-between font-sans text-slate-900 antialiased">
            {/* Top Header */}
            <header className="px-6 py-6 max-w-7xl mx-auto w-full flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2.5 group">
                    <img src={logoSrc} alt="Bloggy logo" className="h-10 w-auto" />
                </Link>

                <p className="text-xs font-semibold text-slate-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#6D28D9] hover:underline font-bold">
                        Log in
                    </Link>
                </p>
            </header>

            {/* Main Registration Layout */}
            <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
                <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
                    {/* Left Hero / Perks Panel */}
                    <div className="lg:col-span-5 bg-gradient-to-br from-[#6D28D9] to-[#4C1D95] p-8 lg:p-10 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="relative z-10 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-purple-200">
                                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                                <span>Join Bloggy Community</span>
                            </div>

                            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold leading-snug">
                                Start sharing your ideas with the world.
                            </h2>

                            <ul className="space-y-4 text-xs sm:text-sm text-purple-100/90 pt-2">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>Publish essays, code snippets, and research papers.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>Customize your interest feed across AI, Design, and Engineering.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>Connect with verified authors, fellow students, and developers.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="relative z-10 pt-8 border-t border-purple-400/30 text-xs text-purple-200/70">
                            By joining, you get free access to all public collections and creator tools.
                        </div>

                        {/* Decorative Overlay Spheres */}
                        <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-purple-500/20 blur-2xl pointer-events-none" />
                    </div>

                    {/* Right Form Panel */}
                    <div className="lg:col-span-7 p-8 sm:p-10 bg-white flex flex-col justify-center">
                        <div className="max-w-md mx-auto w-full space-y-6">
                            <div className="space-y-1 text-left">
                                <h1 className="font-serif text-2xl font-bold text-slate-900">
                                    Create your account
                                </h1>
                                <p className="text-xs text-slate-500">
                                    Enter your details below to get started.
                                </p>
                            </div>

                            {/* Social Signup Options */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                                >
                                    <Globe className="w-4 h-4 text-slate-600" />
                                    <span>Google</span>
                                </button>
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                                >
                                    <GithubLogo />
                                    <span>GitHub</span>
                                </button>
                            </div>

                            <div className="relative flex items-center justify-center">
                                <div className="border-t border-slate-200 w-full" />
                                <span className="bg-white px-3 text-[10px] font-bold uppercase text-slate-400 tracking-wider absolute">
                                    Or continue with email
                                </span>
                            </div>

                            {/* Error Message Banner */}
                            {errorMessage && (
                                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium text-left">
                                    {errorMessage}
                                </div>
                            )}

                            {/* Form Input Block */}
                            <form onSubmit={handleSubmit} className="space-y-4 text-left">
                                {/* Full Name */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 block">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                                        <input
                                            type="text"
                                            name="fullName"
                                            required
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="e.g. Alex Rivera"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Email Address */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 block">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="name@example.com"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 block">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:bg-white transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Checkbox Terms */}
                                <div className="flex items-center gap-2 pt-1">
                                    <input
                                        type="checkbox"
                                        id="agreeToTerms"
                                        name="agreeToTerms"
                                        required
                                        checked={formData.agreeToTerms}
                                        onChange={handleChange}
                                        className="w-4 h-4 rounded border-slate-300 text-[#6D28D9] focus:ring-[#6D28D9] accent-[#6D28D9] cursor-pointer"
                                    />
                                    <label htmlFor="agreeToTerms" className="text-xs text-slate-600 cursor-pointer">
                                        I agree to the{" "}
                                        <Link href="/terms" className="text-[#6D28D9] font-bold hover:underline">
                                            Terms of Service
                                        </Link>{" "}
                                        and{" "}
                                        <Link href="/privacy" className="text-[#6D28D9] font-bold hover:underline">
                                            Privacy Policy
                                        </Link>
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3 px-4 bg-[#6D28D9] hover:bg-[#5B21B6] disabled:bg-purple-300 text-white font-bold text-xs rounded-xl shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer mt-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Creating Account...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Create Account</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer copyright */}
            <footer className="py-6 text-center text-xs text-slate-400">
                &copy; {new Date().getFullYear()} Bloggy Inc. All rights reserved.
            </footer>
        </div>
    );
}