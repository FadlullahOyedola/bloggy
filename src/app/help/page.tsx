"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Search,
    BookOpen,
    Sparkles,
    HelpCircle,
    ArrowLeft,
    ChevronRight,
    ChevronDown,
    ShieldCheck,
    KeyRound,
    Database,
    PenTool,
    UserCheck,
    MessageSquare,
    ThumbsUp,
    ThumbsDown,
    ExternalLink,
    LifeBuoy,
    Check
} from "lucide-react";

export default function HelpCenterPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
    const [feedbackGiven, setFeedbackGiven] = useState<{ [key: number]: string }>({});

    // Topic Categories
    const topics = [
        {
            id: "getting-started",
            label: "Getting Started",
            icon: BookOpen,
            count: "6 articles",
            description: "Account creation, onboarding preferences, and platform navigation."
        },
        {
            id: "auth-security",
            label: "Auth & Security",
            icon: KeyRound,
            count: "8 articles",
            description: "NextAuth v4 setup, session persistence, and password management."
        },
        {
            id: "database-sync",
            label: "Neon & Database",
            icon: Database,
            count: "5 articles",
            description: "Prisma ORM models, connection pooling, and data exports."
        },
        {
            id: "editor-publishing",
            label: "Editor & Writing",
            icon: PenTool,
            count: "10 articles",
            description: "Markdown editing, image uploads, drafts, and publishing rules."
        },
        {
            id: "privacy-terms",
            label: "Privacy & Control",
            icon: ShieldCheck,
            count: "4 articles",
            description: "Cookie preferences, profile visibility, and account deletion."
        }
    ];

    // Knowledge Base Articles & FAQs
    const faqList = [
        {
            id: 1,
            topic: "auth-security",
            question: "How do I fix NextAuth TS2344 type errors on Vercel builds?",
            answer: "In Next.js App Router, ensure your app/api/auth/[...nextauth]/route.ts file explicitly exports the handler as `export { handler as GET, handler as POST };` and includes `export const dynamic = 'force-dynamic';` at the top."
        },
        {
            id: 2,
            topic: "database-sync",
            question: "Are user credentials and preferences saved directly to Neon PostgreSQL?",
            answer: "Yes. All user attributes, authentication tokens, followed authors, and onboarding selections are saved directly to your Neon PostgreSQL instance via Prisma ORM."
        },
        {
            id: 3,
            topic: "editor-publishing",
            question: "Can I upload raw image files directly to the database?",
            answer: "We recommend uploading image files to dedicated media storage services like Uploadthing, Cloudinary, or AWS S3, and storing only the public HTTPS reference URL string in PostgreSQL to maintain optimal database speed."
        },
        {
            id: 4,
            topic: "getting-started",
            question: "How do I update my reading preferences and topics?",
            answer: "Navigate to Dashboard > Settings > Personalization to re-select your preferred reading topics, article lengths, and AI author follow lists."
        },
        {
            id: 5,
            topic: "privacy-terms",
            question: "How do I request a full export of my personal data?",
            answer: "Go to Settings > Privacy & Security, scroll down to Data Portability, and click 'Export Personal Data (.JSON)' to request your complete account package."
        }
    ];

    // Filter Articles
    const filteredFaqs = faqList.filter((item) => {
        const matchesSearch =
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTopic = selectedTopic ? item.topic === selectedTopic : true;
        return matchesSearch && matchesTopic;
    });

    const handleFeedback = (faqId: number, type: string) => {
        setFeedbackGiven((prev) => ({ ...prev, [faqId]: type }));
    };

    return (
        <div className="min-h-screen bg-[#F3F0FF] text-slate-900 font-sans selection:bg-[#6D28D9] selection:text-white relative overflow-hidden">
            {/* Background Decorative Ambient Gradients */}
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-200/50 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[140px] pointer-events-none" />

            {/* Top Header Navigation */}
            <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-purple-900/5 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/dashboard"
                            className="p-2 rounded-xl bg-slate-100 hover:bg-purple-50 text-slate-600 hover:text-[#6D28D9] transition-colors"
                        >
                            <ArrowLeft size={18} />
                        </Link>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#6D28D9] rounded-xl flex items-center justify-center text-white shadow-md shadow-purple-500/30">
                                <Sparkles size={18} />
                            </div>
                            <span className="font-serif text-2xl font-black text-[#6D28D9]">
                                Bloggy
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <Link href="/" className="hover:text-[#6D28D9]">
                            Home
                        </Link>
                        <ChevronRight size={14} />
                        <span className="text-slate-900 font-bold">Help Center</span>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
                {/* Editorial Hero Banner */}
                <div className="bg-white/90 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 border border-purple-900/10 shadow-2xl shadow-purple-900/5 space-y-6 text-center max-w-4xl mx-auto relative overflow-hidden">
                    <div className="space-y-3">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-purple-100 text-[#6D28D9] border border-purple-200 text-xs font-extrabold rounded-full uppercase tracking-wider">
                            <LifeBuoy size={14} /> Knowledge Base & Support
                        </span>
                        <h1 className="text-3xl sm:text-5xl font-black font-serif text-slate-900 tracking-tight">
                            How can we help you today?
                        </h1>
                        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
                            Search our documentation, browse setup guides, or resolve technical questions instantly.
                        </p>
                    </div>

                    {/* Interactive Search Bar */}
                    <div className="max-w-2xl mx-auto bg-[#F8F7FC] rounded-2xl px-4 py-3 border border-purple-900/10 focus-within:border-[#6D28D9] focus-within:bg-white transition-all flex items-center gap-3">
                        <Search size={20} className="text-[#6D28D9]" />
                        <input
                            type="text"
                            placeholder="Search for articles, Prisma models, NextAuth setups..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none font-medium"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                className="text-xs font-bold text-slate-400 hover:text-slate-600 px-2"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* Knowledge Topic Grid */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-black font-serif text-slate-900">Explore Documentation Topics</h2>
                        {selectedTopic && (
                            <button
                                type="button"
                                onClick={() => setSelectedTopic(null)}
                                className="text-xs font-bold text-[#6D28D9] hover:underline"
                            >
                                View All Topics
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {topics.map((topic) => {
                            const Icon = topic.icon;
                            const isSelected = selectedTopic === topic.id;
                            return (
                                <button
                                    type="button"
                                    key={topic.id}
                                    onClick={() => setSelectedTopic(isSelected ? null : topic.id)}
                                    className={`p-6 rounded-3xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-4 ${isSelected
                                            ? "bg-[#6D28D9] text-white border-[#6D28D9] shadow-xl shadow-purple-500/20"
                                            : "bg-white/90 backdrop-blur-xl border-purple-900/5 hover:border-purple-200 shadow-lg shadow-purple-900/5"
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div
                                            className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${isSelected
                                                    ? "bg-purple-700/50 border-purple-400/30 text-white"
                                                    : "bg-purple-50 border-purple-100 text-[#6D28D9]"
                                                }`}
                                        >
                                            <Icon size={22} />
                                        </div>
                                        <span
                                            className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${isSelected ? "bg-purple-800 text-purple-200" : "bg-purple-50 text-[#6D28D9]"
                                                }`}
                                        >
                                            {topic.count}
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className={`font-extrabold text-base ${isSelected ? "text-white" : "text-slate-900"}`}>
                                            {topic.label}
                                        </h3>
                                        <p className={`text-xs mt-1 ${isSelected ? "text-purple-200" : "text-slate-500"}`}>
                                            {topic.description}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Accordion FAQ & Article List */}
                <div className="bg-white/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-purple-900/10 shadow-xl shadow-purple-900/5 space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                        <div>
                            <h3 className="text-xl font-black font-serif text-slate-900">
                                {selectedTopic
                                    ? `${topics.find((t) => t.id === selectedTopic)?.label} Articles`
                                    : "Frequently Answered Questions"}
                            </h3>
                            <p className="text-xs text-slate-500">
                                Showing {filteredFaqs.length} solution{filteredFaqs.length === 1 ? "" : "s"}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((faq) => {
                                const isExpanded = expandedFaq === faq.id;
                                const feedback = feedbackGiven[faq.id];

                                return (
                                    <div
                                        key={faq.id}
                                        className="border border-purple-900/5 rounded-2xl overflow-hidden bg-[#F8F7FC] transition-colors"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                                            className="w-full p-4 sm:p-5 text-left font-extrabold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-purple-50/50"
                                        >
                                            <span className="flex items-center gap-2">
                                                <HelpCircle size={16} className="text-[#6D28D9] shrink-0" />
                                                {faq.question}
                                            </span>
                                            <ChevronDown
                                                size={18}
                                                className={`text-slate-400 shrink-0 transition-transform ${isExpanded ? "rotate-180 text-[#6D28D9]" : ""
                                                    }`}
                                            />
                                        </button>

                                        {isExpanded && (
                                            <div className="p-4 sm:p-5 pt-0 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-purple-900/5 bg-white">
                                                <p className="pt-3">{faq.answer}</p>

                                                {/* Article Helpfulness Feedback */}
                                                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                                    <span>Was this answer helpful?</span>
                                                    {feedback ? (
                                                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                                                            <Check size={14} /> Thank you for your feedback!
                                                        </span>
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleFeedback(faq.id, "yes")}
                                                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-purple-50 hover:text-[#6D28D9] transition-colors"
                                                            >
                                                                <ThumbsUp size={14} />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleFeedback(faq.id, "no")}
                                                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                                                            >
                                                                <ThumbsDown size={14} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="py-8 text-center text-xs text-slate-500 italic">
                                No matching articles found for your query. Try searching with different keywords or contact support directly.
                            </div>
                        )}
                    </div>
                </div>

                {/* Still Need Help Footer Card */}
                <div className="bg-[#6D28D9] text-white rounded-3xl p-8 sm:p-10 shadow-2xl shadow-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="space-y-1 text-center sm:text-left">
                        <h3 className="font-extrabold text-xl font-serif">Still couldn’t find what you’re looking for?</h3>
                        <p className="text-purple-200 text-xs sm:text-sm">
                            Our support team is available 24/7 to resolve technical issues and ticket inquiries.
                        </p>
                    </div>

                    <Link
                        href="/contact"
                        className="px-8 py-3.5 bg-white text-[#6D28D9] hover:bg-purple-50 rounded-2xl font-bold text-xs transition-colors shrink-0 flex items-center gap-2 shadow-lg"
                    >
                        <MessageSquare size={16} /> Open Support Ticket
                    </Link>
                </div>
            </main>
        </div>
    );
}