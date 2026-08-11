"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { MailCheck, ArrowRight, RefreshCw, Loader2 } from "lucide-react";
import logo from "@/app/logo.png.webp";

export default function VerifyEmailPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const emailParam = searchParams.get("email") || "";

    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const logoSrc = typeof logo === "string" ? logo : logo.src;

    async function handleVerify() {
        setLoading(true);
        // Preserved exact verification flow redirect target with registered email context
        setTimeout(() => {
            setLoading(false);
            router.push(`/login?email=${encodeURIComponent(emailParam)}`);
        }, 1200);
    }

    async function handleResend() {
        setResending(true);
        setMessage(null);
        setTimeout(() => {
            setResending(false);
            setMessage(`A new verification link has been sent to ${emailParam || "your email"}.`);
        }, 1200);
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
                {/* Verification Card Column */}
                <div className="p-8 sm:p-12 flex flex-col justify-between bg-white text-center md:text-left">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 no-underline hover:no-underline focus:no-underline">
                            <img src={logoSrc} alt="Bloggy logo" className="h-10 w-auto" />
                        </Link>

                        <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center my-6 mx-auto md:mx-0">
                            <MailCheck className="w-6 h-6" />
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                            Verify your email
                        </h1>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                            We've sent a confirmation link to <span className="font-semibold text-slate-900">{emailParam || "your email address"}</span>. Click the link inside or tap below to continue setting up your account.
                        </p>

                        {message && (
                            <div className="mt-4 p-3 text-xs rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
                                {message}
                            </div>
                        )}

                        <div className="mt-8 space-y-3">
                            <button
                                onClick={handleVerify}
                                disabled={loading}
                                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 cursor-pointer"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Confirm Email & Continue</span>}
                                <ArrowRight className="w-4 h-4" />
                            </button>

                            <button
                                onClick={handleResend}
                                disabled={resending}
                                className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                            >
                                {resending ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                                <span>Resend Verification Email</span>
                            </button>
                        </div>
                    </div>

                    <p className="text-xs text-slate-400 mt-8">
                        Need help? Contact support at{" "}
                        <a href="mailto:support@bloggy.com" className="text-purple-600 font-semibold hover:underline">
                            support@bloggy.com
                        </a>
                    </p>
                </div>

                {/* Right Showcase Column */}
                <div className="hidden md:block relative bg-slate-900 min-h-[500px]">
                    <img
                        src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1200&auto=format&fit=crop"
                        alt="Writing workspace"
                        className="absolute inset-0 w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-8 sm:p-10 text-white">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-purple-300">Security Check</span>
                        <p className="text-xl font-serif font-bold leading-snug mt-1">
                            "We keep your subscriber data and account protected with modern verification standard protocols."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}