"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import logo from "@/app/logo.png.webp";
import {
    Cookie,
    ShieldCheck,
    CheckCircle2,
    Lock,
    ChevronRight,
    ArrowLeft,
    Sparkles,
    Save,
    Info,
    Sliders,
    RotateCcw,
    Check,
    X
} from "lucide-react";

export default function CookieSettingsPage() {
    // Cookie Preferences State
    const [essentialCookies] = useState(true); // Always required
    const [functionalCookies, setFunctionalCookies] = useState(true);
    const [analyticsCookies, setAnalyticsCookies] = useState(true);
    const [personalizationCookies, setPersonalizationCookies] = useState(false);

    // Status & Feedback States
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [bannerNotice, setBannerNotice] = useState<string | null>(null);
    const logoSrc = typeof logo === "string" ? logo : logo.src;

    // Load existing cookie preferences on mount
    useEffect(() => {
        const savedFunctional = localStorage.getItem("bloggy_cookie_functional");
        const savedAnalytics = localStorage.getItem("bloggy_cookie_analytics");
        const savedPersonalization = localStorage.getItem("bloggy_cookie_personalization");

        if (savedFunctional !== null) setFunctionalCookies(savedFunctional === "true");
        if (savedAnalytics !== null) setAnalyticsCookies(savedAnalytics === "true");
        if (savedPersonalization !== null) setPersonalizationCookies(savedPersonalization === "true");
    }, []);

    // Save Preferences to Database / Local Storage
    const handleSavePreferences = async (
        overrideFunctional?: boolean,
        overrideAnalytics?: boolean,
        overridePersonalization?: boolean,
        noticeText?: string
    ) => {
        setIsSaving(true);
        setSaveSuccess(false);

        const updatedFunctional = overrideFunctional ?? functionalCookies;
        const updatedAnalytics = overrideAnalytics ?? analyticsCookies;
        const updatedPersonalization = overridePersonalization ?? personalizationCookies;

        const payload = {
            essential: true,
            functional: updatedFunctional,
            analytics: updatedAnalytics,
            personalization: updatedPersonalization,
            updatedAt: new Date().toISOString()
        };

        try {
            // API call to persist settings in Neon database
            await fetch("/api/settings/cookies", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            console.warn("Client fallback execution:", err);
        } finally {
            // Local storage sync for instant client-side behavior
            localStorage.setItem("bloggy_cookie_functional", String(updatedFunctional));
            localStorage.setItem("bloggy_cookie_analytics", String(updatedAnalytics));
            localStorage.setItem("bloggy_cookie_personalization", String(updatedPersonalization));

            if (overrideFunctional !== undefined) setFunctionalCookies(overrideFunctional);
            if (overrideAnalytics !== undefined) setAnalyticsCookies(overrideAnalytics);
            if (overridePersonalization !== undefined) setPersonalizationCookies(overridePersonalization);

            setIsSaving(false);
            setSaveSuccess(true);
            if (noticeText) setBannerNotice(noticeText);

            setTimeout(() => {
                setSaveSuccess(false);
                setBannerNotice(null);
            }, 3500);
        }
    };

    // Quick Action Buttons
    const handleAcceptAll = () => {
        handleSavePreferences(true, true, true, "All cookie categories accepted and saved.");
    };

    const handleRejectNonEssential = () => {
        handleSavePreferences(false, false, false, "Non-essential cookies disabled and saved.");
    };

    const handleResetDefaults = () => {
        handleSavePreferences(true, true, false, "Cookie preferences reset to system defaults.");
    };

    return (
        <div className="min-h-screen bg-[#F8F7FC] text-slate-900 font-sans selection:bg-[#6D28D9] selection:text-white">
            {/* Top Header Bar */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-purple-900/5 px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/dashboard"
                            className="p-2 rounded-xl bg-slate-100 hover:bg-purple-50 text-slate-600 hover:text-[#6D28D9] transition-colors"
                        >
                            <ArrowLeft size={18} />
                        </Link>
                        <div className="flex items-center gap-2">
                            <img src={logoSrc} alt="Bloggy logo" className="h-10 w-auto" />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <Link href="/settings/privacy" className="hover:text-[#6D28D9]">
                            Settings
                        </Link>
                        <ChevronRight size={14} />
                        <span className="text-slate-900 font-bold">Cookie Preferences</span>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Editorial Hero Banner */}
                <div className="bg-white rounded-3xl p-8 border border-purple-900/5 shadow-xl shadow-purple-900/5 space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />

                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-purple-50 text-[#6D28D9] border border-purple-100 text-xs font-bold rounded-full uppercase tracking-wider">
                        <Cookie size={14} /> Compliance & Preferences
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-black font-serif text-slate-900 tracking-tight">
                        Cookie & Tracking Settings
                    </h1>
                    <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
                        Manage how Bloggy uses cookies and local storage tokens to store session state, remember user options, and analyze platform performance.
                    </p>
                </div>

                {/* Success / Action Alert */}
                {saveSuccess && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 animate-fadeIn">
                        <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                        <span>{bannerNotice || "Your cookie preferences have been updated and saved!"}</span>
                    </div>
                )}

                {/* Quick Bulk Action Bar */}
                <div className="bg-white rounded-3xl p-6 border border-purple-900/5 shadow-xl shadow-purple-900/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center border border-purple-100 shrink-0">
                            <Sliders size={20} />
                        </div>
                        <div>
                            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                                Quick Cookie Presets
                            </h3>
                            <p className="text-xs text-slate-500">
                                Apply standard compliance privacy levels instantly.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                        <button
                            type="button"
                            onClick={handleAcceptAll}
                            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-purple-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                            <Check size={14} /> Accept All
                        </button>
                        <button
                            type="button"
                            onClick={handleRejectNonEssential}
                            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                            <X size={14} /> Reject Optional
                        </button>
                        <button
                            type="button"
                            onClick={handleResetDefaults}
                            className="p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#6D28D9] transition-colors cursor-pointer"
                            title="Reset to defaults"
                        >
                            <RotateCcw size={16} />
                        </button>
                    </div>
                </div>

                {/* Detailed Categories Form */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSavePreferences();
                    }}
                    className="space-y-6"
                >
                    {/* Category 1: Strictly Necessary */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-900/5 shadow-xl shadow-purple-900/5 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-extrabold text-slate-900 text-base">
                                            Strictly Necessary Cookies
                                        </h3>
                                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                                            Always Active
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Essential for secure NextAuth authentication, session state, and Prisma token security.
                                    </p>
                                </div>
                            </div>

                            {/* Disabled Lock Toggle */}
                            <div className="w-12 h-6 rounded-full bg-purple-200 opacity-60 relative cursor-not-allowed">
                                <span className="absolute top-1 right-1 w-4 h-4 bg-[#6D28D9] rounded-full flex items-center justify-center text-white">
                                    <Lock size={10} />
                                </span>
                            </div>
                        </div>
                        <p className="text-xs text-slate-600 bg-[#F8F7FC] p-3.5 rounded-2xl border border-purple-900/5">
                            These cookies cannot be turned off because core operations like staying logged in, maintaining dashboard state, and saving your preferences require them.
                        </p>
                    </div>

                    {/* Category 2: Functional Cookies */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-900/5 shadow-xl shadow-purple-900/5 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center border border-purple-100">
                                    <Sliders size={20} />
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-slate-900 text-base">
                                        Functional Preferences
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Remembers layout selections, active draft edits, theme choices, and font size scaling.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setFunctionalCookies(!functionalCookies)}
                                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${functionalCookies ? "bg-[#6D28D9]" : "bg-slate-300"
                                    }`}
                            >
                                <span
                                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${functionalCookies ? "translate-x-6" : "translate-x-0"
                                        }`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Category 3: Performance & Analytics */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-900/5 shadow-xl shadow-purple-900/5 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center border border-purple-100">
                                    <Info size={20} />
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-slate-900 text-base">
                                        Analytics & Performance
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Helps us understand article reach, page read completion rates, and platform load speed.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setAnalyticsCookies(!analyticsCookies)}
                                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${analyticsCookies ? "bg-[#6D28D9]" : "bg-slate-300"
                                    }`}
                            >
                                <span
                                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${analyticsCookies ? "translate-x-6" : "translate-x-0"
                                        }`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Category 4: Personalized Content */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-900/5 shadow-xl shadow-purple-900/5 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center border border-purple-100">
                                    <Sparkles size={20} />
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-slate-900 text-base">
                                        Personalized AI Content Recommendations
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Allows Bloggy to tailor suggested articles and authors on your homepage based on your reading history.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setPersonalizationCookies(!personalizationCookies)}
                                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${personalizationCookies ? "bg-[#6D28D9]" : "bg-slate-300"
                                    }`}
                            >
                                <span
                                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${personalizationCookies ? "translate-x-6" : "translate-x-0"
                                        }`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Floating Save Action Footer */}
                    <div className="sticky bottom-6 z-30 bg-white/90 backdrop-blur-xl p-4 sm:p-5 rounded-3xl shadow-2xl border border-purple-900/10 flex items-center justify-between">
                        <div className="text-xs text-slate-500 font-medium hidden sm:flex items-center gap-1.5">
                            <Lock size={14} className="text-[#6D28D9]" />
                            <span>Preferences are automatically synced to your Neon account profile.</span>
                        </div>

                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#6D28D9] hover:bg-purple-800 text-white font-bold text-xs shadow-xl shadow-purple-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <Save size={16} />
                            <span>{isSaving ? "Saving Cookies..." : "Save Cookie Preferences"}</span>
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}