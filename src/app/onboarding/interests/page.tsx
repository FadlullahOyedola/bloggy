"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, BookOpen, Clock, Zap, CheckCircle2 } from "lucide-react";

export default function OnboardingInterestsPage() {
    const router = useRouter();
    const [length, setLength] = useState("medium");
    const [frequency, setFrequency] = useState("daily");
    const [tone, setTone] = useState("casual");
    const [isCompleting, setIsCompleting] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleFinalize = async () => {
        setIsCompleting(true);

        // Smooth simulated progress loader leading seamlessly into dashboard launch
        let cur = 0;
        const interval = setInterval(() => {
            cur += 20;
            setProgress(cur);
            if (cur >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    router.push("/dashboard");
                }, 400);
            }
        }, 300);
    };

    if (isCompleting) {
        return (
            <div className="min-h-screen bg-[#F8F7FC] flex flex-col items-center justify-center p-6 text-center font-sans relative overflow-hidden">

                {/* Subtle Ambient Background Animation Elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#6D28D9] rounded-full animate-ping"></div>
                    <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                </div>

                <div className="max-w-md w-full bg-white rounded-3xl p-10 border border-purple-900/5 shadow-2xl space-y-6 relative z-10">
                    <div className="w-20 h-20 bg-purple-50 text-[#6D28D9] rounded-3xl mx-auto flex items-center justify-center shadow-inner">
                        <Sparkles size={40} className="animate-spin" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-black font-serif text-slate-900">Generating Your Personalized Feed...</h2>
                        <p className="text-xs text-slate-500">Configuring AI authors, niche tags, and preference weightings.</p>
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="space-y-2">
                        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
                            <div
                                className="bg-[#6D28D9] h-full rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <span className="text-xs font-bold text-[#6D28D9]">{progress}% Complete</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F7FC] text-slate-900 font-sans selection:bg-[#6D28D9] selection:text-white">

            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-purple-900/5 px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-gradient-to-tr from-[#6D28D9] to-purple-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-purple-500/20">
                            <Sparkles size={20} />
                        </div>
                        <span className="font-serif text-2xl font-black text-[#6D28D9] tracking-tight">Bloggy</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:block">Step 4 of 4</div>
                        <div className="flex gap-1.5">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <div className="w-8 h-2 bg-[#6D28D9] rounded-full transition-all"></div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">

                {/* Hero Banner */}
                <div className="bg-white rounded-3xl p-8 sm:p-12 border border-purple-900/5 shadow-xl shadow-purple-900/5 text-center space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-purple-50 text-[#6D28D9] border border-purple-100 text-xs font-bold rounded-full uppercase tracking-widest">
                        <Sparkles size={14} /> Step 4: Final Preferences
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black font-serif text-slate-900 tracking-tight">
                        Personalize Your Experience
                    </h1>
                    <p className="text-slate-600 max-w-lg mx-auto text-base">
                        Configure content length, update frequency, and writing tone to fit your personal schedule.
                    </p>
                </div>

                {/* Preference Options */}
                <div className="space-y-6">

                    {/* Content Length */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-900/5 shadow-xl space-y-4">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <BookOpen size={20} className="text-[#6D28D9]" /> Preferred Article Length
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                { id: "short", label: "Quick Reads", detail: "2–3 mins" },
                                { id: "medium", label: "Standard Articles", detail: "5–7 mins" },
                                { id: "long", label: "Deep Dives", detail: "10+ mins" }
                            ].map((opt) => (
                                <button
                                    key={opt.id}
                                    type="button"
                                    onClick={() => setLength(opt.id)}
                                    className={`p-4 rounded-2xl border text-left transition-all ${length === opt.id
                                            ? "bg-[#6D28D9] text-white border-[#6D28D9] shadow-lg shadow-purple-500/20 scale-[1.02]"
                                            : "bg-[#F8F7FC] text-slate-700 border-purple-900/5 hover:border-purple-300"
                                        }`}
                                >
                                    <div className="font-bold text-sm flex items-center justify-between">
                                        <span>{opt.label}</span>
                                        {length === opt.id && <CheckCircle2 size={16} className="text-white" />}
                                    </div>
                                    <div className={`text-xs mt-1 ${length === opt.id ? "text-purple-200" : "text-slate-400"}`}>{opt.detail}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Frequency */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-900/5 shadow-xl space-y-4">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <Clock size={20} className="text-[#6D28D9]" /> Feed Update Frequency
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                { id: "daily", label: "Daily Digest", detail: "Every morning" },
                                { id: "biweekly", label: "Bi-Weekly", detail: "2x per week" },
                                { id: "weekly", label: "Weekly Curation", detail: "Every Sunday" }
                            ].map((opt) => (
                                <button
                                    key={opt.id}
                                    type="button"
                                    onClick={() => setFrequency(opt.id)}
                                    className={`p-4 rounded-2xl border text-left transition-all ${frequency === opt.id
                                            ? "bg-[#6D28D9] text-white border-[#6D28D9] shadow-lg shadow-purple-500/20 scale-[1.02]"
                                            : "bg-[#F8F7FC] text-slate-700 border-purple-900/5 hover:border-purple-300"
                                        }`}
                                >
                                    <div className="font-bold text-sm flex items-center justify-between">
                                        <span>{opt.label}</span>
                                        {frequency === opt.id && <CheckCircle2 size={16} className="text-white" />}
                                    </div>
                                    <div className={`text-xs mt-1 ${frequency === opt.id ? "text-purple-200" : "text-slate-400"}`}>{opt.detail}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tone */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-900/5 shadow-xl space-y-4">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <Zap size={20} className="text-[#6D28D9]" /> Writing Style & Tone
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                { id: "casual", label: "Conversational", detail: "Engaging & accessible" },
                                { id: "academic", label: "Academic", detail: "Analytical & cited" },
                                { id: "technical", label: "Practical", detail: "Code & case studies" }
                            ].map((opt) => (
                                <button
                                    key={opt.id}
                                    type="button"
                                    onClick={() => setTone(opt.id)}
                                    className={`p-4 rounded-2xl border text-left transition-all ${tone === opt.id
                                            ? "bg-[#6D28D9] text-white border-[#6D28D9] shadow-lg shadow-purple-500/20 scale-[1.02]"
                                            : "bg-[#F8F7FC] text-slate-700 border-purple-900/5 hover:border-purple-300"
                                        }`}
                                >
                                    <div className="font-bold text-sm flex items-center justify-between">
                                        <span>{opt.label}</span>
                                        {tone === opt.id && <CheckCircle2 size={16} className="text-white" />}
                                    </div>
                                    <div className={`text-xs mt-1 ${tone === opt.id ? "text-purple-200" : "text-slate-400"}`}>{opt.detail}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Final Footer */}
                <div className="sticky bottom-6 z-30 bg-white/90 backdrop-blur-xl p-5 sm:p-6 rounded-3xl shadow-2xl border border-purple-900/10 flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-slate-600 font-medium">
                        Setup complete. Ready to load your feed.
                    </span>

                    <button
                        type="button"
                        onClick={handleFinalize}
                        className="px-8 py-4 rounded-2xl bg-[#6D28D9] hover:bg-purple-800 text-white font-bold text-sm shadow-xl shadow-purple-500/30 transition-all flex items-center gap-2 cursor-pointer scale-105"
                    >
                        <span>Complete Setup & Launch Feed</span>
                        <ArrowRight size={16} />
                    </button>
                </div>

            </main>
        </div>
    );
}