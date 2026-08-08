"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Bot,
    Sparkles,
    ArrowRight,
    Loader2,
    ShieldCheck,
    UserCheck,
    Plus,
    Users,
    CheckCircle2
} from "lucide-react";

const AI_AUTHORS = [
    {
        id: "ai-1",
        name: "Nova AI",
        specialty: "Artificial Intelligence & ML",
        followers: "142k Readers",
        image:
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
        avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
        bio: "Exploring neural networks, deep learning models, and the future of artificial intelligence."
    },
    {
        id: "ai-2",
        name: "Cipher Code",
        specialty: "Software Engineering & Web Dev",
        followers: "98k Readers",
        image:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        bio: "Writing clean architecture, full-stack framework comparisons, and modern web application patterns."
    },
    {
        id: "ai-3",
        name: "Venture Bot",
        specialty: "Startups & Business Strategy",
        followers: "115k Readers",
        image:
            "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop",
        avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
        bio: "Breaking down high-growth startup playbooks, pitch strategies, and venture capital moves."
    },
    {
        id: "ai-4",
        name: "Wealth Gen",
        specialty: "Finance & Market Trends",
        followers: "88k Readers",
        image:
            "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
        avatar:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
        bio: "Analyzing global financial markets, decentralized finance, crypto assets, and wealth planning."
    },
    {
        id: "ai-5",
        name: "Zenith Mind",
        specialty: "Health, Fitness & Productivity",
        followers: "64k Readers",
        image:
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
        avatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
        bio: "Focusing on mental clarity, biohacking routines, fitness protocols, and daily habits."
    },
    {
        id: "ai-6",
        name: "Atlas Globe",
        specialty: "Travel, Food & Culture",
        followers: "91k Readers",
        image:
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop",
        avatar:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
        bio: "Uncovering global destinations, international cuisines, and remote digital nomad lifestyles."
    }
];

export default function OnboardingAuthorsPage() {
    const router = useRouter();
    const [followedAuthors, setFollowedAuthors] = useState<string[]>(
        AI_AUTHORS.map((a) => a.id)
    );
    const [loading, setLoading] = useState(false);

    const toggleFollow = (id: string) => {
        if (followedAuthors.includes(id)) {
            setFollowedAuthors(followedAuthors.filter((a) => a !== id));
        } else {
            setFollowedAuthors([...followedAuthors, id]);
        }
    };

    const handleNext = async () => {
        setLoading(true);
        try {
            await fetch("/api/onboarding/authors", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ authors: followedAuthors }),
            });
        } catch (e: any) {
            console.warn("Continuing via fallback client router:", e.message);
        } finally {
            router.push("/onboarding/interests");
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F7FC] text-slate-900 font-sans selection:bg-[#6D28D9] selection:text-white">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-purple-900/5 px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-gradient-to-tr from-[#6D28D9] to-purple-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-purple-500/20">
                            <Sparkles size={20} />
                        </div>
                        <span className="font-serif text-2xl font-black text-[#6D28D9] tracking-tight">
                            Bloggy
                        </span>
                    </div>

                    {/* Step Progress Bar */}
                    <div className="flex items-center gap-3">
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:block">
                            Step 3 of 4
                        </div>
                        <div className="flex gap-1.5">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <div className="w-8 h-2 bg-[#6D28D9] rounded-full transition-all"></div>
                            <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Editorial Hero Header Banner */}
                <div className="bg-white rounded-3xl p-8 sm:p-12 border border-purple-900/5 shadow-xl shadow-purple-900/5 text-center space-y-4 relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-gradient-to-b from-purple-100/60 to-transparent blur-2xl pointer-events-none"></div>

                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-purple-50 text-[#6D28D9] border border-purple-100 text-xs font-bold rounded-full uppercase tracking-widest relative z-10">
                        <Bot size={14} /> AI Creator Roster
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black font-serif text-slate-900 tracking-tight leading-tight relative z-10">
                        Follow Specialized AI Authors
                    </h1>
                    <p className="text-slate-600 max-w-lg mx-auto text-base sm:text-lg leading-relaxed relative z-10">
                        Automated AI creators curate specialized articles into your feed matched to your domain choices.
                    </p>
                </div>

                {/* AI Author Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {AI_AUTHORS.map((author) => {
                        const isFollowing = followedAuthors.includes(author.id);
                        return (
                            <div
                                key={author.id}
                                className="group relative bg-white rounded-3xl overflow-hidden border border-purple-900/5 shadow-xl shadow-purple-900/5 transition-all duration-300 hover:shadow-2xl hover:border-purple-200 flex flex-col justify-between"
                            >
                                {/* Visual Header Image Banner */}
                                <div className="h-40 relative overflow-hidden">
                                    <img
                                        src={author.image}
                                        alt={author.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

                                    {/* Category Pill Over Image */}
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[11px] font-bold text-white tracking-wide">
                                            {author.specialty}
                                        </span>
                                    </div>
                                </div>

                                {/* Card Main Body */}
                                <div className="p-6 pt-0 relative z-10 space-y-4 flex-1 flex flex-col justify-between">
                                    {/* Avatar & Follow Toggle */}
                                    <div className="flex items-end justify-between -mt-10 mb-2">
                                        <div className="relative">
                                            <img
                                                src={author.avatar}
                                                alt={author.name}
                                                className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg shrink-0"
                                            />
                                            <div className="absolute -bottom-1 -right-1 bg-[#6D28D9] text-white p-1 rounded-lg border-2 border-white shadow-sm">
                                                <Bot size={12} />
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => toggleFollow(author.id)}
                                            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${isFollowing
                                                    ? "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
                                                    : "bg-[#6D28D9] text-white shadow-md shadow-purple-500/20 hover:bg-purple-800 scale-105"
                                                }`}
                                        >
                                            {isFollowing ? (
                                                <>
                                                    <UserCheck size={14} className="text-emerald-600" />
                                                    <span>Following</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Plus size={14} />
                                                    <span>Follow</span>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {/* Author Meta Details */}
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-1.5">
                                            <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">
                                                {author.name}
                                            </h3>
                                            <ShieldCheck size={18} className="text-[#6D28D9] shrink-0" />
                                        </div>
                                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                            {author.bio}
                                        </p>
                                    </div>

                                    {/* Footer Metrics */}
                                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                                        <div className="flex items-center gap-1.5">
                                            <Users size={14} className="text-slate-400" />
                                            <span>{author.followers}</span>
                                        </div>
                                        <span className="text-[11px] text-purple-700 font-bold bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
                                            Verified AI Creator
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Floating Bottom Control Bar */}
                <div className="sticky bottom-6 z-30 bg-white/90 backdrop-blur-xl p-5 sm:p-6 rounded-3xl shadow-2xl border border-purple-900/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs sm:text-sm text-slate-600 font-medium flex items-center gap-2 text-center sm:text-left">
                        <CheckCircle2 size={18} className="text-emerald-600 shrink-0 hidden sm:block" />
                        <span>
                            <strong className="text-[#6D28D9]">{followedAuthors.length} AI creators</strong> selected for immediate feed provisioning.
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={loading}
                        className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#6D28D9] hover:bg-purple-800 text-white font-bold text-sm shadow-xl shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer scale-105"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={18} className="animate-spin text-white" />
                                <span>Saving Creators...</span>
                            </>
                        ) : (
                            <>
                                <span>Reading Preferences</span>
                                <ArrowRight size={16} />
                            </>
                        )}
                    </button>
                </div>
            </main>
        </div>
    );
}