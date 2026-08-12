"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import logo from "@/app/logo.png.webp";

export function GoogleLogo() {
    return (
        <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
        </svg>
    );
}

export function GithubLogo() {
    return (
        <svg className="w-4 h-4 fill-current text-slate-900" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
    );
}

export default function LoginClient() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const logoSrc = typeof logo === "string" ? logo : logo.src;

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const emailParam = params.get("email");

        if (emailParam) {
            setEmail(emailParam);
        } else {
            const savedEmail = localStorage.getItem("bloggy_remembered_email");
            if (savedEmail) {
                setEmail(savedEmail);
            }
        }
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (rememberMe) {
            localStorage.setItem("bloggy_remembered_email", email);
        } else {
            localStorage.removeItem("bloggy_remembered_email");
        }

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setLoading(false);
                setError(data.error || "Invalid email or password");
                return;
            }

            const userRes = await fetch("/api/user/me");
            if (userRes.ok) {
                const userData = await userRes.json();
                if (!userData?.hasCompletedOnboarding) {
                    router.push("/onboarding");
                } else {
                    router.push("/dashboard");
                }
            } else {
                router.push("/dashboard");
            }
        } catch {
            router.push("/dashboard");
        } finally {
            router.refresh();
        }
    }

    return (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
            <div className="p-8 sm:p-12 flex flex-col justify-between bg-white">
                <div>
                    <Link href="/" className="inline-flex items-center gap-2">
                        <img src={logoSrc} alt="Bloggy logo" className="h-10 w-auto" />
                    </Link>

                    <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-8">
                        Welcome Back
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Sign in to access your publications, drafts, and subscriber stats.
                    </p>

                    {error && (
                        <div className="mt-4 p-3 text-xs rounded-xl bg-red-50 text-red-600 border border-red-200 font-medium">
                            {error}
                        </div>
                    )}

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => signIn("google", { callbackUrl: "/onboarding" })}
                            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                            <GoogleLogo />
                            <span>Google</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => signIn("github", { callbackUrl: "/onboarding" })}
                            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                            <GithubLogo />
                            <span>GitHub</span>
                        </button>
                    </div>

                    <div className="my-6 flex items-center gap-3">
                        <div className="h-px bg-slate-200 flex-1" />
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Or continue with</span>
                        <div className="h-px bg-slate-200 flex-1" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600 transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                                    Password
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-[11px] font-semibold text-purple-600 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600 transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-600 accent-purple-600 cursor-pointer"
                            />
                            <label htmlFor="rememberMe" className="text-xs text-slate-600 cursor-pointer">
                                Remember this device
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-xs text-slate-500 mt-8">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-purple-600 font-bold hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>

            <div className="hidden md:block relative bg-slate-900 min-h-[500px]">
                <img
                    src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop"
                    alt="Blogging workstation"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-8 sm:p-10 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-purple-300">Welcome Back</span>
                    <p className="text-xl font-serif font-bold leading-snug mt-1">
                        &quot;Your ideas belong in front of people who care.&quot;
                    </p>
                </div>
            </div>
        </div>
    );
}