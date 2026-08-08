"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
    Tag,
    Sparkles,
    CheckCircle2,
    ArrowRight,
    Loader2,
    Search,
    SlidersHorizontal,
    RefreshCw
} from "lucide-react";

// Full topic categories matching your interest architecture
const TOPIC_COLLECTIONS = [
    {
        name: "Technology & Software",
        items: [
            "Artificial Intelligence (AI)",
            "Machine Learning",
            "Generative AI",
            "Programming",
            "Web Development",
            "Mobile Development",
            "Game Development",
            "Cloud Computing",
            "Cybersecurity",
            "DevOps",
            "Data Science",
            "Data Analytics",
            "Blockchain",
            "Web3",
            "Internet of Things (IoT)",
            "Robotics",
            "Quantum Computing",
            "Software Engineering",
            "UI/UX Design",
            "Product Design"
        ]
    },
    {
        name: "Business & Career",
        items: [
            "Entrepreneurship",
            "Startups",
            "Leadership",
            "Management",
            "Marketing",
            "Digital Marketing",
            "Branding",
            "Sales",
            "Freelancing",
            "Career Development",
            "Remote Work",
            "Human Resources",
            "Productivity",
            "Project Management",
            "Business Strategy",
            "Customer Success"
        ]
    },
    {
        name: "Finance & Wealth",
        items: [
            "Personal Finance",
            "Investing",
            "Stock Market",
            "Cryptocurrency",
            "Real Estate",
            "Saving",
            "Budgeting",
            "Side Hustles",
            "Financial Planning",
            "Insurance",
            "Taxes",
            "Economics"
        ]
    },
    {
        name: "Education & Learning",
        items: [
            "Online Learning",
            "Study Tips",
            "Scholarships",
            "University Life",
            "Academic Writing",
            "Research",
            "Language Learning",
            "STEM",
            "Exams",
            "Teaching",
            "Educational Technology"
        ]
    },
    {
        name: "Health & Wellness",
        items: [
            "Mental Health",
            "Fitness",
            "Nutrition",
            "Healthy Living",
            "Medicine",
            "Public Health",
            "Yoga",
            "Meditation",
            "Sleep",
            "Self Care"
        ]
    },
    {
        name: "Arts, Lifestyle & Media",
        items: [
            "Photography",
            "Graphic Design",
            "Illustration",
            "Painting",
            "Animation",
            "Music",
            "Film",
            "Architecture",
            "Interior Design",
            "Creative Writing",
            "Personal Development",
            "Minimalism",
            "Fashion",
            "Beauty",
            "Relationships"
        ]
    }
];

export default function OnboardingTopicsPage() {
    const router = useRouter();
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<string>("All");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const toggleTopic = (topic: string) => {
        if (selectedTopics.includes(topic)) {
            setSelectedTopics(selectedTopics.filter((t) => t !== topic));
        } else {
            setSelectedTopics([...selectedTopics, topic]);
        }
    };

    const selectAllVisible = (items: string[]) => {
        const combined = Array.from(new Set([...selectedTopics, ...items]));
        setSelectedTopics(combined);
    };

    const clearAll = () => setSelectedTopics([]);

    const filteredCollections = useMemo(() => {
        return TOPIC_COLLECTIONS.map((collection) => {
            if (activeTab !== "All" && collection.name !== activeTab) return null;

            const matchingItems = collection.items.filter((item) =>
                item.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (searchQuery && matchingItems.length === 0) return null;

            return {
                ...collection,
                items: searchQuery ? matchingItems : collection.items
            };
        }).filter(Boolean);
    }, [searchQuery, activeTab]);

    const isReady = selectedTopics.length >= 5;
    const remaining = Math.max(0, 5 - selectedTopics.length);

    const handleNext = async () => {
        if (!isReady) {
            setError(
                `Please select at least 5 specific topic tags (${selectedTopics.length}/5 selected).`
            );
            return;
        }

        setError(null);
        setLoading(true);

        try {
            await fetch("/api/onboarding/topics", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topics: selectedTopics }),
            });
        } catch (err: any) {
            console.warn("Continuing via fallback client router:", err.message);
        } finally {
            router.push("/onboarding/authors");
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

                    <div className="flex items-center gap-3">
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:block">
                            Step 2 of 4
                        </div>
                        <div className="flex gap-1.5">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                            <div className="w-8 h-2 bg-[#6D28D9] rounded-full transition-all" />
                            <div className="w-2 h-2 bg-slate-200 rounded-full" />
                            <div className="w-2 h-2 bg-slate-200 rounded-full" />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Editorial Hero Banner */}
                <div className="bg-white rounded-3xl p-8 sm:p-12 border border-purple-900/5 shadow-xl shadow-purple-900/5 text-center space-y-5 relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-gradient-to-b from-purple-100/60 to-transparent blur-2xl pointer-events-none" />

                    <div className="space-y-3 relative z-10">
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-purple-50 text-[#6D28D9] border border-purple-100 text-xs font-bold rounded-full uppercase tracking-widest">
                            <Tag size={14} /> Step 2: Granular Niche Selection
                        </span>
                        <h1 className="text-3xl sm:text-5xl font-black font-serif text-slate-900 tracking-tight leading-tight">
                            Lock In Your Core Focus
                        </h1>
                        <p className="text-slate-600 max-w-lg mx-auto text-base sm:text-lg leading-relaxed">
                            Select <strong className="text-[#6D28D9] font-bold">at least 5 specific topic tags</strong> to tune your personal AI recommendation engine.
                        </p>
                    </div>

                    {/* Search & Bulk Actions Bar */}
                    <div className="max-w-md mx-auto pt-2 space-y-3 relative z-10">
                        <div className="relative">
                            <Search
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                size={18}
                            />
                            <input
                                type="text"
                                placeholder="Search specific topic tags..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-purple-500/20 transition-all shadow-inner"
                            />
                        </div>

                        {selectedTopics.length > 0 && (
                            <button
                                onClick={clearAll}
                                type="button"
                                className="text-xs text-slate-500 hover:text-rose-600 font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                            >
                                <RefreshCw size={12} /> Clear all tags ({selectedTopics.length})
                            </button>
                        )}
                    </div>

                    {/* Live Dynamic Threshold Counter */}
                    <div className="pt-2 flex justify-center relative z-10">
                        <div
                            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all shadow-sm ${isReady
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-purple-50 text-[#6D28D9] border border-purple-100"
                                }`}
                        >
                            {isReady ? (
                                <>
                                    <CheckCircle2 size={18} className="text-emerald-600" />
                                    <span>
                                        Target Achieved! ({selectedTopics.length} tags selected)
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#6D28D9] animate-pulse" />
                                    <span>
                                        Select {remaining} more tag{remaining === 1 ? "" : "s"} ({selectedTopics.length}/5)
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-sm font-semibold text-center animate-shake">
                        {error}
                    </div>
                )}

                {/* Horizontal Category Navigation Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-semibold">
                    <button
                        type="button"
                        onClick={() => setActiveTab("All")}
                        className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all border cursor-pointer ${activeTab === "All"
                                ? "bg-[#6D28D9] text-white border-[#6D28D9] shadow-md shadow-purple-500/20"
                                : "bg-white text-slate-600 border-purple-900/5 hover:bg-purple-50 hover:text-[#6D28D9]"
                            }`}
                    >
                        All Categories
                    </button>
                    {TOPIC_COLLECTIONS.map((col) => (
                        <button
                            key={col.name}
                            type="button"
                            onClick={() => setActiveTab(col.name)}
                            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all border cursor-pointer ${activeTab === col.name
                                    ? "bg-[#6D28D9] text-white border-[#6D28D9] shadow-md shadow-purple-500/20"
                                    : "bg-white text-slate-600 border-purple-900/5 hover:bg-purple-50 hover:text-[#6D28D9]"
                                }`}
                        >
                            {col.name}
                        </button>
                    ))}
                </div>

                {/* Topic Tag Pill Groups */}
                <div className="space-y-6">
                    {filteredCollections.map((col: any, idx: number) => (
                        <div
                            key={idx}
                            className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-900/5 shadow-xl shadow-purple-900/5 space-y-4"
                        >
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                                    <SlidersHorizontal size={18} className="text-[#6D28D9]" />
                                    {col.name}
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => selectAllVisible(col.items)}
                                    className="text-xs text-[#6D28D9] hover:underline font-bold transition-colors cursor-pointer"
                                >
                                    + Select All in Category
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2.5 pt-2">
                                {col.items.map((item: string) => {
                                    const selected = selectedTopics.includes(item);
                                    return (
                                        <button
                                            type="button"
                                            key={item}
                                            onClick={() => toggleTopic(item)}
                                            className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 border cursor-pointer ${selected
                                                    ? "bg-[#6D28D9] text-white border-[#6D28D9] shadow-md shadow-purple-500/20 scale-105"
                                                    : "bg-[#F8F7FC] text-slate-700 border-purple-900/5 hover:bg-white hover:border-purple-300 hover:text-slate-900"
                                                }`}
                                        >
                                            <span>{item}</span>
                                            {selected && (
                                                <CheckCircle2 size={14} className="text-white shrink-0" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Floating Bottom Control Bar */}
                <div className="sticky bottom-6 z-30 bg-white/90 backdrop-blur-xl p-5 sm:p-6 rounded-3xl shadow-2xl border border-purple-900/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs sm:text-sm text-slate-600 font-medium text-center sm:text-left">
                        {!isReady ? (
                            <span>
                                Select <strong className="text-[#6D28D9]">{remaining}</strong> more tag{remaining === 1 ? "" : "s"} to unlock author setup.
                            </span>
                        ) : (
                            <span className="text-emerald-700 font-semibold flex items-center justify-center sm:justify-start gap-1.5">
                                <CheckCircle2 size={16} /> Minimum threshold achieved ({selectedTopics.length} selected).
                            </span>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={!isReady || loading}
                        className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm shadow-xl transition-all duration-300 flex items-center justify-center gap-2 ${isReady
                                ? "bg-[#6D28D9] hover:bg-purple-800 text-white shadow-purple-500/30 cursor-pointer scale-105"
                                : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none"
                            }`}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={18} className="animate-spin text-white" />
                                <span>Saving Topics...</span>
                            </>
                        ) : (
                            <>
                                <span>Next: AI Authors</span>
                                <ArrowRight size={16} />
                            </>
                        )}
                    </button>
                </div>
            </main>
        </div>
    );
}