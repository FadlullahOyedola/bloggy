"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Sparkles,
    ArrowLeft,
    ChevronRight,
    Compass,
    BookOpen,
    PenTool,
    Users,
    Sliders,
    CheckCircle2,
    ArrowRight,
    Heart,
    Bookmark,
    Share2,
    TrendingUp,
    MessageSquare,
    Globe,
    Zap,
    ShieldCheck,
    Lock,
    Cpu,
    Feather,
    Layers,
    Search,
    Eye,
    Bell,
    Star,
    Check,
    Plus,
    Terminal,
    Database,
    Code2,
    Server,
    Workflow,
    BarChart3,
    Award,
    Clock,
    Layout,
    FileText,
    Activity,
    Smile,
    ZapOff,
    Flame,
    HelpCircle,
    Hash
} from "lucide-react";

export default function ExpandedAboutPage() {
    // State for Audience Switcher
    const [activeAudience, setActiveAudience] = useState<"readers" | "creators" | "communities">("readers");

    // State for Core Values Tab
    const [activeValueTab, setActiveValueTab] = useState<number>(0);

    // State for Interactive Topic Filter Preview
    const [selectedTopicTag, setSelectedTopicTag] = useState<string>("All");

    // State for FAQ Accordion
    const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

    // Topics for Discovery Grid
    const topicsList = [
        { name: "Artificial Intelligence", category: "Tech", articles: "1,240+", icon: Cpu },
        { name: "Web Development", category: "Code", articles: "3,890+", icon: Code2 },
        { name: "Product Design", category: "Design", articles: "2,150+", icon: Layout },
        { name: "Modern Culture", category: "Society", articles: "980+", icon: Globe },
        { name: "Data Engineering", category: "Tech", articles: "1,420+", icon: Database },
        { name: "Financial Freedom", category: "Finance", articles: "2,600+", icon: BarChart3 }
    ];

    // Core Values Data
    const coreValues = [
        {
            title: "Clutter-Free Reader Sanctuary",
            subtitle: "Focus over friction",
            description: "We strictly reject intrusive full-screen popups, autoplay video ads, paywall traps, and cookie banners that obscure content. Great writing deserves pristine digital typography and room to breathe.",
            icon: Eye,
            highlights: [
                "Zero tracking popups or takeover banner ads",
                "Optimized typographic line-lengths for reduced eye strain",
                "Clean dark and light mode rendering engines"
            ]
        },
        {
            title: "Complete Creator Autonomy",
            subtitle: "You own your words and audience",
            description: "Creators on Bloggy own 100% of their intellectual property, custom domain configurations, subscriber lists, and database portability rights. No platform lock-ins, ever.",
            icon: ShieldCheck,
            highlights: [
                "One-click complete account export (.JSON format)",
                "Direct RSS feed support and custom domain mapping",
                "Transparent real-time engagement and readership metrics"
            ]
        },
        {
            title: "Algorithmic Transparency & Control",
            subtitle: "You direct the recommendation engine",
            description: "Instead of black-box algorithms designed to keep you addicted, Bloggy puts the steering wheel in your hands. You define what you see through explicit onboarding signals, author follows, and topic subscriptions.",
            icon: Sliders,
            highlights: [
                "Explicit topic weightings updated in real time",
                "Chronological feed toggle options for followed authors",
                "Instant mute or hide keywords and topics"
            ]
        },
        {
            title: "Engineering Excellence & Speed",
            subtitle: "Sub-second global performance",
            description: "Built on Next.js App Router, Tailwind CSS, NextAuth, and Neon PostgreSQL, Bloggy offers instant page transitions and real-time draft synchronization with sub-second latency worldwide.",
            icon: Zap,
            highlights: [
                "Edge-cached article distribution across global CDNs",
                "Sub-millisecond database queries via Neon serverless Postgres",
                "Instant local draft auto-saving with background sync"
            ]
        }
    ];

    // Platform Feature Comparison Table Matrix
    const comparisonMatrix = [
        { feature: "Distraction-Free Reading UI", bloggy: true, traditional: false, social: false },
        { feature: "Full Data Ownership & .JSON Export", bloggy: true, traditional: false, social: false },
        { feature: "Zero Intrusive Popups & Takeover Ads", bloggy: true, traditional: false, social: false },
        { feature: "Sub-Second Next.js & Neon Edge Speed", bloggy: true, traditional: false, social: true },
        { feature: "Explicit Topic Signal Customization", bloggy: true, traditional: false, social: false },
        { feature: "Real-time Writer Analytics Dashboard", bloggy: true, traditional: true, social: false }
    ];

    // Frequently Asked Questions
    const aboutFaqs = [
        {
            q: "What makes Bloggy different from traditional blogging platforms?",
            a: "Traditional platforms often prioritize advertising clickbait, intrusive popups, and algorithmic outrage to maximize screen time. Bloggy is engineered ground-up for speed, editorial dignity, and explicit user control over recommendations."
        },
        {
            q: "Is Bloggy free for writers and creators?",
            a: "Yes! Bloggy offers complete publishing capabilities, Markdown editor access, custom profile customization, and audience building tools at zero cost. We offer premium tier upgrades for custom domain connections and advanced telemetry."
        },
        {
            q: "How does Bloggy handle privacy and personal data?",
            a: "We adhere strictly to privacy-first standards. Your personal data is never sold to third-party ad brokers, and you can manage or completely purge your account data from our Neon PostgreSQL database at any time."
        },
        {
            q: "Can I export my articles and subscriber list if I decide to leave?",
            a: "Absolutely. Under Settings > Privacy, you can trigger a full .JSON data package export containing every article draft, published post, interaction history, and profile metric with a single click."
        }
    ];

    return (
        <div className="min-h-screen bg-[#F3F0FF] text-slate-900 font-sans selection:bg-[#6D28D9] selection:text-white relative overflow-hidden">

            {/* Background Decorative Ambient Blur Gradients */}
            <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-purple-200/50 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute top-2/3 left-1/4 w-[600px] h-[600px] bg-purple-300/30 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute -bottom-40 right-10 w-[700px] h-[700px] bg-indigo-300/30 rounded-full blur-[150px] pointer-events-none" />

            {/* Top Navigation Header */}
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

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500">
                            <Link href="/" className="hover:text-[#6D28D9]">Home</Link>
                            <ChevronRight size={14} />
                            <span className="text-slate-900 font-bold">About Platform</span>
                        </div>

                        <Link
                            href="/onboarding"
                            className="px-5 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-purple-800 text-white font-bold text-xs shadow-lg shadow-purple-500/20 transition-all flex items-center gap-1.5"
                        >
                            <span>Get Started</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10 space-y-28">

                {/* SECTION 1: HERO MANIFESTO & STATS TICKER */}
                <section className="space-y-12 pt-4">
                    <div className="text-center max-w-4xl mx-auto space-y-6">
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-purple-100 text-[#6D28D9] border border-purple-200 text-xs font-extrabold rounded-full uppercase tracking-wider shadow-sm">
                            <Sparkles size={14} /> Reimagining Web Publishing
                        </span>
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-serif text-slate-900 tracking-tight leading-[1.08]">
                            Discover ideas. Share your voice. <br />
                            <span className="text-[#6D28D9] bg-clip-text">Find your people.</span>
                        </h1>
                        <p className="text-slate-600 text-base sm:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
                            Bloggy is a modern platform built for people who love to discover ideas, read meaningful stories, share what they know, and connect with others who share their interests.
                        </p>

                        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                            <Link
                                href="/onboarding"
                                className="px-8 py-4 rounded-2xl bg-[#6D28D9] hover:bg-purple-800 text-white font-bold text-sm shadow-xl shadow-purple-500/25 transition-all flex items-center gap-2 group cursor-pointer"
                            >
                                <span>Start Your Journey</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/dashboard"
                                className="px-8 py-4 rounded-2xl bg-white hover:bg-purple-50 text-slate-800 font-bold text-sm border border-purple-900/10 transition-all shadow-md flex items-center gap-2 cursor-pointer"
                            >
                                <Compass size={18} className="text-[#6D28D9]" />
                                <span>Explore Live Topics</span>
                            </Link>
                        </div>
                    </div>

                    {/* Key Platform Performance Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                        {[
                            { label: "Active Platform Readers", value: "250K+", sub: "Global monthly reach", icon: Users },
                            { label: "Articles Published", value: "1.2M+", sub: "Clean markdown posts", icon: FileText },
                            { label: "Global Read Uptime", value: "99.99%", sub: "Edge CDN distribution", icon: Activity },
                            { label: "Average Load Latency", value: "< 120ms", sub: "Powered by Next.js & Neon", icon: Zap }
                        ].map((stat, idx) => {
                            const Icon = stat.icon;
                            return (
                                <div key={idx} className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-purple-900/10 shadow-xl shadow-purple-900/5 space-y-2 text-center group hover:border-purple-300 transition-all">
                                    <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center mx-auto border border-purple-100 group-hover:scale-110 transition-transform">
                                        <Icon size={20} />
                                    </div>
                                    <div className="text-2xl sm:text-3xl font-black font-serif text-slate-900">{stat.value}</div>
                                    <div className="text-xs font-bold text-slate-800">{stat.label}</div>
                                    <div className="text-[11px] text-slate-500 font-medium">{stat.sub}</div>
                                </div>
                            );
                        })}
                    </div>
                </section>


                {/* SECTION 2: WHY BLOGGY EXISTS (THE PROBLEM & SOLUTION) */}
                <section className="bg-white/90 backdrop-blur-2xl rounded-3xl p-8 sm:p-14 border border-purple-900/10 shadow-2xl shadow-purple-900/5 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />

                    <div className="lg:col-span-7 space-y-6">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-purple-50 text-[#6D28D9] border border-purple-100 text-xs font-extrabold rounded-full uppercase tracking-wider">
                            <Compass size={14} /> The Bloggy Difference
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-black font-serif text-slate-900 tracking-tight leading-[1.15]">
                            A better way to bring discovery, reading, & community into one place
                        </h2>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                            The internet is filled with information, but finding content that genuinely matters to you can be difficult. Bloggy brings discovery, reading, publishing, and community into one place—so you can spend less time searching and more time exploring what interests you.
                        </p>

                        <div className="space-y-3 pt-2">
                            {[
                                { title: "No Algorithmic Manipulation", desc: "You decide what topics and writers fill your daily feed." },
                                { title: "Pristine Reading Canvas", desc: "No intrusive ads, cookie popups, or auto-playing videos." },
                                { title: "Instant Publishing Pipeline", desc: "Write in raw Markdown or rich text with instant live previews." }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-purple-100 text-[#6D28D9] flex items-center justify-center shrink-0 mt-0.5">
                                        <Check size={14} className="stroke-[3]" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">{item.title}</h4>
                                        <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { title: "Fast Discovery", desc: "No algorithmic clutter", icon: Zap },
                            { title: "Clean Reading", desc: "Distraction-free focus", icon: BookOpen },
                            { title: "Writer First", desc: "Build your true audience", icon: PenTool },
                            { title: "Real Community", desc: "Shared ideas & discussions", icon: Users }
                        ].map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div key={idx} className="p-5 rounded-2xl bg-[#F8F7FC] border border-purple-900/5 space-y-2 hover:bg-white hover:border-purple-200 transition-all shadow-sm">
                                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#6D28D9] flex items-center justify-center">
                                        <Icon size={20} />
                                    </div>
                                    <h4 className="font-extrabold text-sm text-slate-900">{item.title}</h4>
                                    <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>


                {/* SECTION 3: DISCOVER, READ, SHARE, COMMUNITY (4 CORE PILLARS GRID) */}
                <section className="space-y-10">
                    <div className="text-center space-y-3 max-w-2xl mx-auto">
                        <span className="text-[#6D28D9] font-extrabold text-xs uppercase tracking-wider">Four Pillars of Experience</span>
                        <h2 className="text-3xl sm:text-5xl font-black font-serif text-slate-900">Everything you need in one place</h2>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium">Designed for meaningful engagement, editorial precision, and high-quality storytelling.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Pillar 1: Discover */}
                        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 border border-purple-900/10 shadow-xl shadow-purple-900/5 space-y-5 relative overflow-hidden flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center border border-purple-100 shadow-sm">
                                    <Compass size={28} />
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-black font-serif text-slate-900">A Better Way to Discover</h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                    Bloggy helps you discover content based on the topics, authors, communities, and ideas you care about. From technology and artificial intelligence to business, design, programming, education, science, culture, finance, and countless other interests, you can shape your experience around what matters to you.
                                </p>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-slate-100">
                                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Popular Topics On Bloggy:</span>
                                <div className="flex flex-wrap gap-2">
                                    {["Tech & AI", "Design Systems", "Culture & Society", "Full-Stack Dev", "Economics"].map((tag, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-[#F8F7FC] border border-purple-900/5 rounded-full text-xs font-extrabold text-slate-700 hover:bg-purple-50 hover:text-[#6D28D9] transition-colors">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Pillar 2: Read */}
                        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 border border-purple-900/10 shadow-xl shadow-purple-900/5 space-y-5 relative overflow-hidden flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center border border-purple-100 shadow-sm">
                                    <BookOpen size={28} />
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-black font-serif text-slate-900">Read Something Worth Your Time</h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                    Great content deserves a great reading experience. Bloggy is designed around clean, comfortable, distraction-free reading. Discover articles, explore different perspectives, save content for later, and build collections of ideas you want to return to.
                                </p>
                            </div>

                            <div className="p-4 bg-[#F8F7FC] rounded-2xl border border-purple-900/5 flex items-center justify-between text-xs text-slate-600 font-medium">
                                <div className="flex items-center gap-2">
                                    <Bookmark size={16} className="text-[#6D28D9]" />
                                    <span>Personalized Reading Lists & Save for Later</span>
                                </div>
                                <span className="font-extrabold text-[#6D28D9]">Synced to Neon DB</span>
                            </div>
                        </div>

                        {/* Pillar 3: Share */}
                        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 border border-purple-900/10 shadow-xl shadow-purple-900/5 space-y-5 relative overflow-hidden flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center border border-purple-100 shadow-sm">
                                    <PenTool size={28} />
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-black font-serif text-slate-900">Share What You Know</h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                    Bloggy isn't only for readers. It is a place for writers, creators, researchers, developers, thinkers, and everyday people to share their ideas. Create posts, publish articles, share images and documents, start conversations, create collections, and build an audience.
                                </p>
                            </div>

                            <div className="p-4 bg-[#F8F7FC] rounded-2xl border border-purple-900/5 flex items-center justify-between text-xs text-slate-600 font-medium">
                                <div className="flex items-center gap-2">
                                    <BarChart3 size={16} className="text-[#6D28D9]" />
                                    <span>Real-time Article Telemetry & Readership Analytics</span>
                                </div>
                                <span className="font-extrabold text-[#6D28D9]">Live Dashboard</span>
                            </div>
                        </div>

                        {/* Pillar 4: Community */}
                        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 border border-purple-900/10 shadow-xl shadow-purple-900/5 space-y-5 relative overflow-hidden flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center border border-purple-100 shadow-sm">
                                    <Users size={28} />
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-black font-serif text-slate-900">Find Your Community</h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                    Ideas become more valuable when people can discuss them together. Bloggy brings people together through topics, communities, authors, posts, comments, reactions, and conversations. Follow people whose work inspires you and join discussions.
                                </p>
                            </div>

                            <div className="p-4 bg-[#F8F7FC] rounded-2xl border border-purple-900/5 flex items-center justify-between text-xs text-slate-600 font-medium">
                                <div className="flex items-center gap-2">
                                    <MessageSquare size={16} className="text-[#6D28D9]" />
                                    <span>Threaded Discussions & Verified Creator Comments</span>
                                </div>
                                <span className="font-extrabold text-[#6D28D9]">Active Forums</span>
                            </div>
                        </div>

                    </div>
                </section>


                {/* SECTION 4: INTERACTIVE AUDIENCE MATRIX (READERS, CREATORS, COMMUNITIES) */}
                <section className="bg-white/90 backdrop-blur-2xl rounded-3xl p-8 sm:p-14 border border-purple-900/10 shadow-2xl shadow-purple-900/5 space-y-10">
                    <div className="text-center space-y-3 max-w-2xl mx-auto">
                        <span className="text-[#6D28D9] font-extrabold text-xs uppercase tracking-wider">Tailored Ecosystems</span>
                        <h2 className="text-3xl sm:text-5xl font-black font-serif text-slate-900">
                            For Readers. For Creators. For Communities.
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium">Bloggy brings three core experiences together into one seamless platform.</p>
                    </div>

                    {/* Audience Selection Tabs */}
                    <div className="flex justify-center p-1.5 bg-[#F8F7FC] rounded-2xl max-w-lg mx-auto border border-purple-900/5">
                        {[
                            { id: "readers", label: "For Readers", icon: BookOpen },
                            { id: "creators", label: "For Creators", icon: PenTool },
                            { id: "communities", label: "For Communities", icon: Users }
                        ].map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeAudience === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveAudience(tab.id as any)}
                                    className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${isActive
                                            ? "bg-[#6D28D9] text-white shadow-lg shadow-purple-500/20"
                                            : "text-slate-600 hover:text-[#6D28D9]"
                                        }`}
                                >
                                    <Icon size={16} />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Dynamic Content Panel */}
                    <div className="max-w-4xl mx-auto p-8 bg-[#F8F7FC] rounded-3xl border border-purple-900/5 space-y-6">
                        {activeAudience === "readers" && (
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-fadeIn">
                                <div className="md:col-span-7 space-y-4">
                                    <div className="flex items-center gap-3 text-[#6D28D9] font-extrabold text-xl font-serif">
                                        <BookOpen size={24} />
                                        <h3>A Sanctuary for Avid Readers</h3>
                                    </div>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                        Discover stories, explore topics, follow authors, save articles, and build your personal library of ideas. Enjoy comfortable typography designed for long reads without distracting paywalls or aggressive popups.
                                    </p>
                                    <ul className="space-y-2 text-xs font-bold text-slate-700">
                                        <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#6D28D9]" /> Offline reading collection sync</li>
                                        <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#6D28D9]" /> Custom font size & dark mode themes</li>
                                        <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#6D28D9]" /> Export bookmarks to Markdown or JSON</li>
                                    </ul>
                                </div>
                                <div className="md:col-span-5 bg-white p-6 rounded-2xl border border-purple-900/5 shadow-md space-y-3">
                                    <span className="text-[10px] font-extrabold text-[#6D28D9] uppercase tracking-wider">Reader Perk</span>
                                    <h4 className="font-extrabold text-sm text-slate-900">Distraction-Free Focus</h4>
                                    <p className="text-xs text-slate-500">Read uninterrupted articles formatted explicitly for clarity and speed across any desktop or mobile viewport.</p>
                                </div>
                            </div>
                        )}

                        {activeAudience === "creators" && (
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-fadeIn">
                                <div className="md:col-span-7 space-y-4">
                                    <div className="flex items-center gap-3 text-[#6D28D9] font-extrabold text-xl font-serif">
                                        <PenTool size={24} />
                                        <h3>Enterprise Tools for Modern Writers</h3>
                                    </div>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                        Publish your thoughts, grow your audience, build your profile, understand your analytics, and connect directly with engaged readers worldwide.
                                    </p>
                                    <ul className="space-y-2 text-xs font-bold text-slate-700">
                                        <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#6D28D9]" /> Raw Markdown & WYSIWYG editor options</li>
                                        <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#6D28D9]" /> Custom canonical URLs for SEO protection</li>
                                        <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#6D28D9]" /> Detailed readership & referral telemetry</li>
                                    </ul>
                                </div>
                                <div className="md:col-span-5 bg-white p-6 rounded-2xl border border-purple-900/5 shadow-md space-y-3">
                                    <span className="text-[10px] font-extrabold text-[#6D28D9] uppercase tracking-wider">Creator Perk</span>
                                    <h4 className="font-extrabold text-sm text-slate-900">Direct Audience Reach</h4>
                                    <p className="text-xs text-slate-500">Build a dedicated subscriber base without relying on social network algorithms to distribute your articles.</p>
                                </div>
                            </div>
                        )}

                        {activeAudience === "communities" && (
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-fadeIn">
                                <div className="md:col-span-7 space-y-4">
                                    <div className="flex items-center gap-3 text-[#6D28D9] font-extrabold text-xl font-serif">
                                        <Users size={24} />
                                        <h3>Hubs for Intellectual Discussion</h3>
                                    </div>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                        Bring people with shared interests together to discuss ideas, exchange knowledge, and discover new perspectives in moderated topic spaces.
                                    </p>
                                    <ul className="space-y-2 text-xs font-bold text-slate-700">
                                        <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#6D28D9]" /> Topic-based discussion hubs</li>
                                        <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#6D28D9]" /> Threaded comment moderation tools</li>
                                        <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#6D28D9]" /> Collaborative publication collections</li>
                                    </ul>
                                </div>
                                <div className="md:col-span-5 bg-white p-6 rounded-2xl border border-purple-900/5 shadow-md space-y-3">
                                    <span className="text-[10px] font-extrabold text-[#6D28D9] uppercase tracking-wider">Community Perk</span>
                                    <h4 className="font-extrabold text-sm text-slate-900">Thoughtful Exchanges</h4>
                                    <p className="text-xs text-slate-500">Constructive feedback loops and verified author replies keep discussions insightful and productive.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>


                {/* SECTION 5: DEEP CORE VALUES INTERACTIVE SHOWCASE */}
                <section className="space-y-10">
                    <div className="text-center space-y-3 max-w-2xl mx-auto">
                        <span className="text-[#6D28D9] font-extrabold text-xs uppercase tracking-wider">Our Architectural Principles</span>
                        <h2 className="text-3xl sm:text-5xl font-black font-serif text-slate-900">What drives Bloggy</h2>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium">Built on core values that place user trust, privacy, and speed above all else.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left Value Tabs Navigation */}
                        <div className="lg:col-span-5 space-y-3">
                            {coreValues.map((val, idx) => {
                                const Icon = val.icon;
                                const isActive = activeValueTab === idx;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveValueTab(idx)}
                                        className={`w-full p-5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${isActive
                                                ? "bg-[#6D28D9] text-white border-[#6D28D9] shadow-xl shadow-purple-500/20"
                                                : "bg-white/90 backdrop-blur-xl text-slate-800 border-purple-900/5 hover:border-purple-200"
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? "bg-purple-800 text-white" : "bg-purple-50 text-[#6D28D9]"}`}>
                                                <Icon size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-extrabold text-sm">{val.title}</h4>
                                                <p className={`text-xs ${isActive ? "text-purple-200" : "text-slate-500"}`}>{val.subtitle}</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={18} className={isActive ? "text-white" : "text-slate-400"} />
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right Active Value Detailed Display */}
                        <div className="lg:col-span-7 bg-white/95 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 border border-purple-900/10 shadow-2xl shadow-purple-900/5 space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center border border-purple-100">
                                    {(() => {
                                        const Icon = coreValues[activeValueTab].icon;
                                        return <Icon size={24} />;
                                    })()}
                                </div>
                                <div>
                                    <h3 className="text-xl font-black font-serif text-slate-900">{coreValues[activeValueTab].title}</h3>
                                    <span className="text-xs font-bold text-[#6D28D9]">{coreValues[activeValueTab].subtitle}</span>
                                </div>
                            </div>

                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                {coreValues[activeValueTab].description}
                            </p>

                            <div className="space-y-2 pt-2">
                                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Key Commitments:</span>
                                <div className="space-y-2">
                                    {coreValues[activeValueTab].highlights.map((h, i) => (
                                        <div key={i} className="p-3 bg-[#F8F7FC] rounded-xl border border-purple-900/5 text-xs font-bold text-slate-800 flex items-center gap-2">
                                            <CheckCircle2 size={16} className="text-[#6D28D9] shrink-0" />
                                            <span>{h}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* SECTION 6: PLATFORM FEATURE COMPARISON MATRIX TABLE */}
                <section className="bg-white/90 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 border border-purple-900/10 shadow-2xl shadow-purple-900/5 space-y-8">
                    <div className="text-center space-y-2 max-w-2xl mx-auto">
                        <span className="text-[#6D28D9] font-extrabold text-xs uppercase tracking-wider">Transparent Comparison</span>
                        <h2 className="text-3xl font-black font-serif text-slate-900">How Bloggy stacks up</h2>
                        <p className="text-xs sm:text-sm text-slate-500">See how our reader-centric model compares to legacy blogging networks and social platforms.</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="border-b border-purple-900/10 text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                                    <th className="py-4 px-4">Feature / Guarantee</th>
                                    <th className="py-4 px-4 text-center text-[#6D28D9] bg-purple-50/50 rounded-t-2xl">Bloggy</th>
                                    <th className="py-4 px-4 text-center">Legacy Ad Platforms</th>
                                    <th className="py-4 px-4 text-center">Social Networks</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-purple-900/5 text-xs sm:text-sm">
                                {comparisonMatrix.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-purple-50/30 transition-colors">
                                        <td className="py-4 px-4 font-bold text-slate-800">{row.feature}</td>
                                        <td className="py-4 px-4 text-center bg-purple-50/30 font-bold text-[#6D28D9]">
                                            {row.bloggy ? <CheckCircle2 size={18} className="mx-auto text-[#6D28D9]" /> : <ZapOff size={18} className="mx-auto text-slate-300" />}
                                        </td>
                                        <td className="py-4 px-4 text-center text-slate-400">
                                            {row.traditional ? <CheckCircle2 size={18} className="mx-auto text-emerald-500" /> : <ZapOff size={18} className="mx-auto text-slate-300" />}
                                        </td>
                                        <td className="py-4 px-4 text-center text-slate-400">
                                            {row.social ? <CheckCircle2 size={18} className="mx-auto text-emerald-500" /> : <ZapOff size={18} className="mx-auto text-slate-300" />}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>


                {/* SECTION 7: BUILT AROUND YOU (PERSONALIZATION HERO BANNER) */}
                <section className="bg-gradient-to-br from-[#6D28D9] via-purple-900 to-purple-950 text-white rounded-3xl p-8 sm:p-14 shadow-2xl shadow-purple-500/20 space-y-8 relative overflow-hidden">
                    <div className="max-w-2xl space-y-4 relative z-10">
                        <span className="px-3.5 py-1 rounded-full bg-purple-500/30 text-purple-200 text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5 border border-purple-400/20">
                            <Sliders size={14} /> Built Around You
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-black font-serif tracking-tight leading-[1.1]">
                            Designed to become more personal over time
                        </h2>
                        <p className="text-purple-100 text-xs sm:text-base leading-relaxed">
                            Your Bloggy experience is designed to become more personal over time. Choose your interests during onboarding, follow topics and authors, save articles, build collections, and interact with the content you enjoy. You remain in full control of what you follow, what you save, and how you experience the platform.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 relative z-10 text-xs font-bold text-purple-100">
                        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3">
                            <CheckCircle2 size={18} className="text-purple-300 shrink-0" />
                            <span>Full onboarding interest picker</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3">
                            <CheckCircle2 size={18} className="text-purple-300 shrink-0" />
                            <span>Zero hidden tracking algorithms</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3">
                            <CheckCircle2 size={18} className="text-purple-300 shrink-0" />
                            <span>Complete data export privacy</span>
                        </div>
                    </div>
                </section>


                {/* SECTION 8: TECH STACK SHOWCASE */}
                <section className="space-y-8">
                    <div className="text-center space-y-2 max-w-2xl mx-auto">
                        <span className="text-[#6D28D9] font-extrabold text-xs uppercase tracking-wider">Engineering Foundations</span>
                        <h2 className="text-3xl font-black font-serif text-slate-900">Powered by the modern web</h2>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium">Built with cutting-edge open technology for maximum reliability and speed.</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {[
                            { name: "Next.js App Router", role: "Framework", icon: Terminal },
                            { name: "Neon PostgreSQL", role: "Serverless DB", icon: Database },
                            { name: "Tailwind CSS", role: "Styling Engine", icon: Layout },
                            { name: "NextAuth v4", role: "Secure Auth", icon: Lock }
                        ].map((tech, i) => {
                            const Icon = tech.icon;
                            return (
                                <div key={i} className="p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-purple-900/10 shadow-lg shadow-purple-900/5 text-center space-y-2">
                                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#6D28D9] flex items-center justify-center mx-auto border border-purple-100">
                                        <Icon size={20} />
                                    </div>
                                    <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">{tech.name}</h4>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{tech.role}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>


                {/* SECTION 9: OUR VISION */}
                <section className="text-center max-w-3xl mx-auto space-y-4 py-4">
                    <span className="text-[#6D28D9] font-extrabold text-xs uppercase tracking-wider">Our Long-Term Commitment</span>
                    <h2 className="text-3xl sm:text-5xl font-black font-serif text-slate-900">Our Vision</h2>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        We believe the internet should make it easier for people to discover meaningful ideas and find communities where they belong. Bloggy's vision is to create a place where knowledge is easier to discover, creativity is easier to share, and conversations can happen around the things people genuinely care about. We're building a platform where every reader can discover something new, every creator can find an audience, and every idea has an opportunity to travel further.
                    </p>
                </section>


                {/* SECTION 10: FREQUENTLY ASKED QUESTIONS */}
                <section className="bg-white/90 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 border border-purple-900/10 shadow-2xl shadow-purple-900/5 space-y-8">
                    <div className="text-center space-y-2 max-w-2xl mx-auto">
                        <span className="text-[#6D28D9] font-extrabold text-xs uppercase tracking-wider font-sans">Common Questions</span>
                        <h2 className="text-3xl font-black font-serif text-slate-900">About Bloggy FAQs</h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-3">
                        {aboutFaqs.map((faq, idx) => {
                            const isExpanded = expandedFaq === idx;
                            return (
                                <div key={idx} className="border border-purple-900/5 rounded-2xl overflow-hidden bg-[#F8F7FC]">
                                    <button
                                        type="button"
                                        onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                                        className="w-full p-5 text-left font-extrabold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-purple-50/50 transition-colors"
                                    >
                                        <span className="flex items-center gap-2">
                                            <HelpCircle size={16} className="text-[#6D28D9] shrink-0" />
                                            {faq.q}
                                        </span>
                                        <ChevronRight size={18} className={`text-slate-400 shrink-0 transition-transform ${isExpanded ? "rotate-90 text-[#6D28D9]" : ""}`} />
                                    </button>

                                    {isExpanded && (
                                        <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-purple-900/5 bg-white">
                                            <p className="pt-3">{faq.a}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>


                {/* SECTION 11: FINAL CALL TO ACTION BANNER */}
                <section className="bg-[#6D28D9] text-white rounded-3xl p-8 sm:p-14 shadow-2xl shadow-purple-500/25 text-center space-y-6 relative overflow-hidden">
                    <div className="w-16 h-16 rounded-3xl bg-white/10 text-white flex items-center justify-center mx-auto border border-white/20 shadow-inner">
                        <Globe size={32} />
                    </div>
                    <div className="space-y-3 max-w-xl mx-auto">
                        <h2 className="text-3xl sm:text-5xl font-black font-serif tracking-tight">Join Bloggy Today</h2>
                        <p className="text-purple-100 text-xs sm:text-base">
                            Whether you're here to read, write, discover, or connect, there's something waiting for you. Discover something worth your time.
                        </p>
                    </div>
                    <div className="pt-2">
                        <Link
                            href="/onboarding"
                            className="inline-flex items-center gap-2 px-9 py-4 rounded-2xl bg-white text-[#6D28D9] hover:bg-purple-50 font-bold text-xs sm:text-sm shadow-xl transition-all cursor-pointer"
                        >
                            <span>Start Your Bloggy Journey</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </section>

            </main>
        </div>
    );
}