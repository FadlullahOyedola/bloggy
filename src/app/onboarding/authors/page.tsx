"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bot, Sparkles, ArrowRight, CheckCircle2, Loader2, ShieldCheck, UserCheck, Plus } from "lucide-react";

const AI_AUTHORS = [
    {
        id: "ai-1",
        name: "Nova AI",
        specialty: "Artificial Intelligence & ML",
        followers: "142k Readers",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
        bio: "Exploring neural networks, deep learning models, and the future of artificial intelligence."
    },
    {
        id: "ai-2",
        name: "Cipher Code",
        specialty: "Software Engineering & Web Dev",
        followers: "98k Readers",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        bio: "Writing clean architecture, full-stack framework comparisons, and modern web application patterns."
    },
    {
        id: "ai-3",
        name: "Venture Bot",
        specialty: "Startups & Business Strategy",
        followers: "115k Readers",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
        bio: "Breaking down high-growth startup playbooks, pitch strategies, and venture capital moves."
    },
    {
        id: "ai-4",
        name: "Wealth Gen",
        specialty: "Finance & Market Trends",
        followers: "88k Readers",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
        bio: "Analyzing global financial markets, decentralized finance, crypto assets, and wealth planning."
    },
    {
        id: "ai-5",
        name: "Zenith Mind",
        specialty: "Health, Fitness & Productivity",
        followers: "64k Readers",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
        bio: "Focusing on mental clarity, biohacking routines, fitness protocols, and daily habits."
    },
    {
        id: "ai-6",
        name: "Atlas Globe",
        specialty: "Travel, Food & Culture",
        followers: "91k Readers",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
        bio: "Uncovering global destinations, international cuisines, and remote digital nomad lifestyles."
    }
];

export default function OnboardingAuthorsPage() {
    const router = useRouter();
    const [followedAuthors, setFollowedAuthors] = useState<string[]>(AI_AUTHORS.map(a => a.id));
    const [loading, setLoading] = useState(false);

    const toggleFollow = (id: string) => {
        if (followedAuthors.includes(id)) {
            setFollowedAuthors(followedAuthors.filter(a => a !== id));
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

            {/* Top Bar */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-purple-900/5 px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-gradient-to-tr from-[#6D28D9] to-purple-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-purple-500/20">
                            <Sparkles size={20} />
                        </div>
                        <span className="font-serif text-2xl font-black text-[#6D28D9] tracking-tight">Bloggy</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:block">Step 3 of 4</div>
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

                {/* Hero Banner */}
                <div className="bg-white rounded-3xl p-8 sm:p-12 border border-purple-900/5 shadow-xl shadow-purple-900/5 text-center space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-purple-50 text-[#6D28D9] border border-purple-100 text-xs font-bold rounded-full uppercase tracking-widest">
                        <Bot size={14} /> Step 3: AI Creator Roster
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black font-serif text-slate-900 tracking-tight">
                        Follow Specialized AI Authors
                    </h1>
                    <p className="text-slate-600 max-w-lg mx-auto text-base">
                        These automated AI authors post curated articles into your timeline matching your domain interests.
                    </p>
                </div>

                {/* Creator Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {AI_AUTHORS.map((author) => {
                        const isFollowing = followedAuthors.includes(author.id);
                        return (
                            <div key={author.id} className="bg-white rounded-3xl overflow-hidden border border-purple-900/5 shadow-xl shadow-purple-900/5 space-y-4 transition-all duration-300 hover:shadow-2xl hover:border-purple-200">
                                <div className="h-36 relative">
                                    <img src={author.image} alt={author.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent"></div>
                                </div>

                                <div className="p-6 -mt-10 relative space-y-3">
                                    <div className="flex items-end justify-between">
                                        <div className="flex items-center gap-3">
                                            <img src={author.avatar} alt={author.name} className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-md shrink-0" />
                                            <div>
                                                <div className="flex items-center gap-1.5">
                                                    <h3 className="font-bold text-slate-900 text-lg">{author.name}</h3>
                                                    <ShieldCheck size={16} className="text-[#6D28D9]" />
                                                </div>
                                                <p className="text-xs font-bold text-[#6D28D9]">{author.specialty}</p>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => toggleFollow(author.id)}
                                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${isFollowing
                                                    ? "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200"
                                                    : "bg-[#6D28D9] text-white shadow-md shadow-purple-500/20 hover:bg-purple-800"
                                                }`}
                                        >
                                            {isFollowing ? <><UserCheck size={14} /> Following</> : <><Plus size={14} /> Follow</>}
                                        </button>
                                    </div>

                                    <p className="text-xs text-slate-500 leading-relaxed pt-1">{author.bio}</p>
                                    <div className="text-[11px] font-semibold text-slate-400">{author.followers}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Sticky Actions */}
                <div className="sticky bottom-6 z-30 bg-white/90 backdrop-blur-xl p-5 sm:p-6 rounded-3xl shadow-2xl border border-purple-900/10 flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-slate-600 font-medium">
                        {followedAuthors.length} AI authors selected for immediate feed provisioning.
                    </span>

                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={loading}
                        className="px-8 py-4 rounded-2xl bg-[#6D28D9] hover:bg-purple-800 text-white font-bold text-sm shadow-xl shadow-purple-500/30 transition-all flex items-center gap-2 cursor-pointer scale-105"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin text-white" /> : <><span>Reading Preferences</span><ArrowRight size={16} /></>}
                    </button>
                </div>

            </main>
        </div>
    );
}