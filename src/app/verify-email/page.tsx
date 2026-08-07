"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowRight, Loader2, RefreshCw } from "lucide-react";

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
        <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 sm:p-10 shadow-xl border border-slate-200 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                    <Mail size={32} />
                </div>

                <div>
                    <h2 className="text-2xl font-serif font-bold text-slate-900">Check your email</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        We sent a verification link to your email address. Click the button below once you've confirmed it.
                    </p>
                </div>

                {message && (
                    <div className="rounded-xl bg-emerald-50 p-3 text-xs font-medium text-emerald-700 border border-emerald-200">
                        {message}
                    </div>
                )}

                <div className="space-y-3">
                    <button
                        onClick={handleVerify}
                        disabled={loading}
                        className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-full bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm shadow-md transition-all disabled:opacity-60"
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
                        className="w-full text-xs font-semibold text-slate-500 hover:text-purple-700 flex items-center justify-center gap-1.5 py-2"
                    >
                        <RefreshCw size={14} className={resending ? "animate-spin" : ""} />
                        Resend Email
                    </button>
                </div>
            </div>
        </div>
    );
}