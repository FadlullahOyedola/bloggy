"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Cpu, Briefcase, DollarSign, Heart, Plane, Microscope,
    Palette, Tv, Trophy, Globe, Landmark, Smile, Compass,
    BookOpen, Sparkles, CheckCircle2, ArrowRight, Loader2, Search
} from "lucide-react";

const INTEREST_GROUPS = [
    {
        category: "Technology & Software",
        icon: Cpu,
        description: "AI, full-stack systems, cloud engineering, and modern web architectures",
        articles: "14.2k Articles",
        readers: "85k Readers",
        gradient: "from-purple-900/80 to-indigo-950/80",
        bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
        topics: [
            "Artificial Intelligence (AI)", "Machine Learning", "Generative AI",
            "Programming", "Web Development", "Mobile Development", "Game Development",
            "Cloud Computing", "Cybersecurity", "DevOps", "Data Science",
            "Data Analytics", "Blockchain", "Web3", "Internet of Things (IoT)",
            "Robotics", "Quantum Computing", "Software Engineering", "UI/UX Design", "Product Design"
        ]
    },
    {
        category: "Business & Career",
        icon: Briefcase,
        description: "Venture capital, startup growth, modern leadership, and corporate strategy",
        articles: "9.8k Articles",
        readers: "62k Readers",
        gradient: "from-blue-900/80 to-slate-950/80",
        bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
        topics: [
            "Entrepreneurship", "Startups", "Leadership", "Management",
            "Marketing", "Digital Marketing", "Branding", "Sales",
            "Freelancing", "Career Development", "Remote Work", "Human Resources",
            "Productivity", "Project Management", "Business Strategy", "Customer Success"
        ]
    },
    {
        category: "Finance & Wealth",
        icon: DollarSign,
        description: "Personal finance, global markets, decentralized economy, and real estate",
        articles: "11.5k Articles",
        readers: "74k Readers",
        gradient: "from-emerald-900/80 to-teal-950/80",
        bgImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop",
        topics: [
            "Personal Finance", "Investing", "Stock Market", "Cryptocurrency",
            "Real Estate", "Saving", "Budgeting", "Side Hustles",
            "Financial Planning", "Insurance", "Taxes", "Economics"
        ]
    },
    {
        category: "Education & Learning",
        icon: BookOpen,
        description: "Academic writing, pedagogical methods, online courses, and research",
        articles: "6.4k Articles",
        readers: "41k Readers",
        gradient: "from-amber-900/80 to-orange-950/80",
        bgImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200&auto=format&fit=crop",
        topics: [
            "Online Learning", "Study Tips", "Scholarships", "University Life",
            "Academic Writing", "Research", "Language Learning", "STEM",
            "Exams", "Teaching", "Educational Technology"
        ]
    },
    {
        category: "Health & Wellness",
        icon: Heart,
        description: "Mental clarity, cognitive science, fitness routines, and holistic living",
        articles: "8.1k Articles",
        readers: "53k Readers",
        gradient: "from-rose-900/80 to-pink-950/80",
        bgImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop",
        topics: [
            "Mental Health", "Fitness", "Nutrition", "Healthy Living",
            "Medicine", "Public Health", "Yoga", "Meditation",
            "Sleep", "Self Care"
        ]
    },
    {
        category: "Lifestyle & Living",
        icon: Smile,
        description: "Minimalism, contemporary fashion, relationship dynamics, and home design",
        articles: "7.9k Articles",
        readers: "48k Readers",
        gradient: "from-violet-900/80 to-purple-950/80",
        bgImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
        topics: [
            "Personal Development", "Minimalism", "Fashion", "Beauty",
            "Relationships", "Parenting", "Home Improvement", "Hobbies",
            "Gardening", "Pets"
        ]
    },
    {
        category: "Travel & Food",
        icon: Plane,
        description: "Global adventures, culinary arts, digital nomad culture, and coffee",
        articles: "12.8k Articles",
        readers: "91k Readers",
        gradient: "from-sky-900/80 to-blue-950/80",
        bgImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop",
        topics: [
            "Adventure Travel", "Budget Travel", "Luxury Travel", "Road Trips",
            "Solo Travel", "Family Travel", "Travel Tips", "Digital Nomad",
            "Hotels", "Food Travel", "Recipes", "Baking", "Healthy Recipes",
            "African Cuisine", "International Cuisine", "Street Food", "Coffee",
            "Restaurants", "Meal Prep", "Nutrition"
        ]
    },
    {
        category: "Arts & Creativity",
        icon: Palette,
        description: "Graphic design, visual arts, creative writing, architecture, and film",
        articles: "5.3k Articles",
        readers: "36k Readers",
        gradient: "from-fuchsia-900/80 to-pink-950/80",
        bgImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
        topics: [
            "Photography", "Graphic Design", "Illustration", "Painting",
            "Animation", "Music", "Film", "Architecture", "Interior Design", "Creative Writing"
        ]
    },
    {
        category: "Entertainment & Gaming",
        icon: Tv,
        description: "Pop culture, cinema reviews, anime, eSports, and interactive gaming",
        articles: "15.1k Articles",
        readers: "110k Readers",
        gradient: "from-purple-900/80 to-violet-950/80",
        bgImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200&auto=format&fit=crop",
        topics: [
            "Movies", "TV Shows", "Celebrities", "Anime", "Comics",
            "Gaming", "Streaming", "Pop Culture", "Books", "Podcasts"
        ]
    },
    {
        category: "Sports & Athletics",
        icon: Trophy,
        description: "Global football, Formula 1 racing, basketball, and athletic endurance",
        articles: "9.2k Articles",
        readers: "70k Readers",
        gradient: "from-emerald-900/80 to-green-950/80",
        bgImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop",
        topics: [
            "Football", "Basketball", "Tennis", "Athletics", "Formula 1",
            "Motorsport", "Cricket", "Golf", "Boxing", "eSports"
        ]
    },
    {
        category: "Science & Environment",
        icon: Microscope,
        description: "Astronomical discoveries, climate action, quantum physics, and nature",
        articles: "8.7k Articles",
        readers: "58k Readers",
        gradient: "from-teal-900/80 to-emerald-950/80",
        bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
        topics: [
            "Astronomy", "Biology", "Chemistry", "Physics", "Space Exploration",
            "Climate Science", "Environment", "Wildlife", "Marine Science",
            "Scientific Discoveries", "Sustainability", "Climate Change",
            "Renewable Energy", "Recycling", "Conservation", "Green Technology", "Agriculture", "Farming", "Nature"
        ]
    },
    {
        category: "News, Politics & Society",
        icon: Globe,
        description: "Global diplomacy, public policy, sociological studies, and current affairs",
        articles: "18.4k Articles",
        readers: "135k Readers",
        gradient: "from-slate-900/80 to-gray-950/80",
        bgImage: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop",
        topics: [
            "World News", "African News", "Nigerian News", "Politics",
            "Government", "Elections", "Diplomacy", "Law", "Human Rights",
            "Public Policy", "History", "Culture", "Languages", "Literature",
            "Anthropology", "Sociology", "Psychology", "Gender Studies", "Community Development"
        ]
    },
    {
        category: "Religion & Philosophy",
        icon: Landmark,
        description: "Ethics, spiritual growth, comparative theology, and ancient philosophy",
        articles: "4.1k Articles",
        readers: "29k Readers",
        gradient: "from-amber-900/80 to-yellow-950/80",
        bgImage: "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?q=80&w=1200&auto=format&fit=crop",
        topics: [
            "Islam", "Christianity", "Traditional Religions", "Philosophy",
            "Ethics", "Spiritual Growth", "Comparative Religion"
        ]
    },
    {
        category: "Digital Life & Tech Culture",
        icon: Cpu,
        description: "Social media dynamics, SEO, content creation, and hardware reviews",
        articles: "11.0k Articles",
        readers: "82k Readers",
        gradient: "from-indigo-900/80 to-purple-950/80",
        bgImage: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop",
        topics: [
            "Social Media", "Content Creation", "Influencer Marketing", "Blogging",
            "Podcasting", "YouTube", "Streaming", "Email Marketing", "SEO",
            "Product Reviews", "Gadgets", "Smartphones", "Laptops", "Smart Home",
            "Fashion Reviews", "Car Reviews", "Buying Guides"
        ]
    },
    {
        category: "Automotive & Family",
        icon: Compass,
        description: "Electric vehicles, automotive design, parenting, and family development",
        articles: "5.8k Articles",
        readers: "40k Readers",
        gradient: "from-blue-900/80 to-indigo-950/80",
        bgImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
        topics: [
            "Electric Vehicles", "Cars", "Motorcycles", "Car Maintenance",
            "Automotive Technology", "Parenting", "Child Development",
            "Family Finance", "Education for Kids", "Family Activities"
        ]
    }
];

export default function OnboardingPage() {
    const router = useRouter();
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const toggleInterest = (topic: string) => {
        if (selectedInterests.includes(topic)) {
            setSelectedInterests(selectedInterests.filter((t) => t !== topic));
        } else {
            setSelectedInterests([...selectedInterests, topic]);
        }
    };

    const isReady = selectedInterests.length >= 10;
    const remaining = Math.max(0, 10 - selectedInterests.length);

    const handleContinue = async () => {
        if (!isReady) {
            setError(`Please select at least 10 interests to proceed (${selectedInterests.length}/10 chosen).`);
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const res = await fetch("/api/onboarding", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ interests: selectedInterests }),
            });

            if (!res.ok) {
                console.warn("API route not found, performing client navigation.");
            }
        } catch (err: any) {
            console.warn("Continuing via fallback client router:", err.message);
        } finally {
            router.push("/onboarding/topics");
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F7FC] text-slate-900 selection:bg-[#6D28D9] selection:text-white font-sans">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-purple-900/5 px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-gradient-to-tr from-[#6D28D9] to-purple-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-purple-500/20">
                            <Sparkles size={20} />
                        </div>
                        <span className="font-serif text-2xl font-black text-[#6D28D9] tracking-tight">Bloggy</span>
                    </div>

                    {/* Step Progress Pill */}
                    <div className="flex items-center gap-3">
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:block">Step 1 of 4</div>
                        <div className="flex gap-1.5">
                            <div className="w-8 h-2 bg-[#6D28D9] rounded-full transition-all"></div>
                            <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
                            <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
                            <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-10">
                {/* Editorial Hero Header */}
                <div className="bg-white rounded-3xl p-8 sm:p-12 border border-purple-900/5 shadow-xl shadow-purple-900/5 text-center space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-gradient-to-b from-purple-100/60 to-transparent blur-2xl pointer-events-none"></div>

                    <div className="space-y-3 relative z-10">
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-purple-50 text-[#6D28D9] border border-purple-100 text-xs font-bold rounded-full uppercase tracking-widest">
                            <Sparkles size={14} /> Curated Discovery
                        </span>
                        <h1 className="text-3xl sm:text-5xl font-black font-serif text-slate-900 tracking-tight leading-tight">
                            Personalize Your Feed
                        </h1>
                        <p className="text-slate-600 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
                            Select <strong className="text-[#6D28D9] font-bold">at least 10 topics</strong> to tune our AI engine to your personal interests.
                        </p>
                    </div>

                    {/* Instant Search Bar */}
                    <div className="max-w-md mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search over 100+ topics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-purple-500/20 transition-all shadow-inner"
                        />
                    </div>

                    {/* Dynamic Status Counter */}
                    <div className="pt-2 flex justify-center">
                        <div
                            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all shadow-sm ${isReady
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-purple-50 text-[#6D28D9] border border-purple-100"
                                }`}
                        >
                            {isReady ? (
                                <>
                                    <CheckCircle2 size={18} className="text-emerald-600" />
                                    <span>Goal Achieved! ({selectedInterests.length} selected)</span>
                                </>
                            ) : (
                                <>
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#6D28D9] animate-pulse"></span>
                                    <span>
                                        Select {remaining} more interest{remaining === 1 ? "" : "s"} ({selectedInterests.length}/10)
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

                {/* Interest Groups Grid */}
                <div className="space-y-8">
                    {INTEREST_GROUPS.map((group, idx) => {
                        const IconComponent = group.icon;
                        const matchingTopics = group.topics.filter((t) =>
                            t.toLowerCase().includes(searchQuery.toLowerCase())
                        );

                        if (searchQuery && matchingTopics.length === 0) return null;

                        return (
                            <div
                                key={idx}
                                className="relative rounded-3xl p-6 sm:p-8 overflow-hidden shadow-xl shadow-purple-900/5 space-y-6 group/card"
                            >
                                {/* Visual Category Background Image */}
                                <img
                                    src={group.bgImage}
                                    alt={group.category}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                                />

                                {/* Dark Gradient Overlay to ensure maximum legibility */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${group.gradient} backdrop-blur-[2px]`}
                                />
                                <div className="absolute inset-0 bg-slate-950/40" />

                                {/* Section Content */}
                                <div className="relative z-10 text-white space-y-6">
                                    {/* Section Header */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/20 pb-5 gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md text-purple-300 flex items-center justify-center border border-white/20 shadow-inner">
                                                <IconComponent size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-extrabold text-white tracking-tight drop-shadow-md">
                                                    {group.category}
                                                </h3>
                                                <p className="text-xs text-purple-200/90 drop-shadow">{group.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs font-semibold text-purple-200/80">
                                            <span>{group.articles}</span>
                                            <span>•</span>
                                            <span>{group.readers}</span>
                                        </div>
                                    </div>

                                    {/* Interactive Card Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                        {(searchQuery ? matchingTopics : group.topics).map((topic) => {
                                            const selected = selectedInterests.includes(topic);
                                            return (
                                                <button
                                                    type="button"
                                                    key={topic}
                                                    onClick={() => toggleInterest(topic)}
                                                    className={`p-4 rounded-2xl text-xs sm:text-sm font-medium text-left transition-all duration-300 flex items-center justify-between border cursor-pointer backdrop-blur-md ${selected
                                                            ? "bg-[#6D28D9] text-white border-purple-400 shadow-lg shadow-purple-900/50 scale-[1.02]"
                                                            : "bg-white/15 text-white border-white/20 hover:bg-white/25 hover:border-white/40 hover:scale-[1.01]"
                                                        }`}
                                                >
                                                    <span className="truncate pr-1 drop-shadow-sm">{topic}</span>
                                                    <div
                                                        className={`w-5 h-5 rounded-full flex items-center shrink-0 justify-center transition-all ${selected
                                                                ? "bg-white/20 text-white"
                                                                : "opacity-0 group-hover:opacity-60 text-white/60"
                                                            }`}
                                                    >
                                                        <CheckCircle2 size={14} />
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Floating Bottom Bar */}
                <div className="sticky bottom-6 z-30 bg-white/90 backdrop-blur-xl p-5 sm:p-6 rounded-3xl shadow-2xl border border-purple-900/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs sm:text-sm text-slate-600 font-medium text-center sm:text-left">
                        {!isReady ? (
                            <span>
                                Select <strong className="text-[#6D28D9]">{remaining}</strong> more topics to unlock step 2.
                            </span>
                        ) : (
                            <span className="text-emerald-700 font-semibold flex items-center gap-1.5 justify-center sm:justify-start">
                                <CheckCircle2 size={16} /> Ready to refine your niche topics.
                            </span>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={handleContinue}
                        disabled={!isReady || loading}
                        className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm shadow-xl transition-all duration-300 flex items-center justify-center gap-2 ${isReady
                                ? "bg-[#6D28D9] hover:bg-purple-800 text-white shadow-purple-500/30 cursor-pointer scale-105"
                                : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none"
                            }`}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={18} className="animate-spin text-white" />
                                <span>Saving Interests...</span>
                            </>
                        ) : (
                            <>
                                <span>Continue to Refine Topics</span>
                                <ArrowRight size={16} />
                            </>
                        )}
                    </button>
                </div>
            </main>
        </div>
    );
}