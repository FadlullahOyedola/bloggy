"use client";

import { useState, useEffect } from "react";
import {
    LayoutDashboard, PlusSquare, FileText, Wallet, BarChart3,
    Headphones, Search, Filter, Grid, Star, Eye, ShoppingCart, Heart, Bell,
    Sparkles, ChevronDown, Plus, ThumbsUp, Flame, MessageSquare, Bookmark,
    UserPlus, TrendingUp, Target, Clock, ShieldCheck, Zap, BookOpen, Compass,
    Gift, Calendar, Trophy, Bot, CloudSun, Send, Layers, History, Award, CheckCircle2,
    MessageCircle, Share2, MoreHorizontal
} from "lucide-react";
import CreatePostModal from "@/components/CreatePostModal";

export default function DashboardPage() {
    const [greeting, setGreeting] = useState("Good Morning");
    const [currentTime, setCurrentTime] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [activeFeedTab, setActiveFeedTab] = useState("Personalized");
    const [showAiAssistant, setShowAiAssistant] = useState(false);
    const [aiQuery, setAiQuery] = useState("");
    const [aiResponse, setAiResponse] = useState<string | null>(null);

    // 02. Daily Greeting & Live Clock Setup
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const hrs = now.getHours();

            if (hrs < 12) setGreeting("Good Morning");
            else if (hrs < 17) setGreeting("Good Afternoon");
            else setGreeting("Good Evening");

            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            setCurrentDate(now.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }));
        };
        updateClock();
        const timer = setInterval(updateClock, 1000);
        return () => clearInterval(timer);
    }, []);

    // 03 & 05. Logged-in User Context
    const loggedInUser = {
        displayName: "Mayokun",
        username: "mayokun",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
        verification: "PURPLE" as const,
        creatorLevel: "Creator (Lvl 4)",
        xpPoints: 2450,
        nextLevelXp: 3000,
        streakDays: 12,
        articlesRead: 48,
        hoursSpent: 18.5,
        balance: "$551.44",
        unreadNotifications: 3,
        unreadMessages: 2,
    };

    // Database Mock Feed Items
    const [articles, setArticles] = useState([
        {
            id: "1",
            title: "JavaScript & React.js Best Practices 2026",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
            rating: "4.9",
            views: "2.5k",
            author: "Nova AI",
            authorAvatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop",
            isTrending: true,
            isSaved: true
        },
        {
            id: "2",
            title: "PHP OOP Best Practices & Clean Architecture",
            category: "Backend",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
            rating: "4.6",
            views: "1.8k",
            author: "Cipher Code",
            authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
            isTrending: true,
            isSaved: false
        },
        {
            id: "3",
            title: "Next.js Best Practices + Full Stack AI App",
            category: "WebDev",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
            rating: "5.0",
            views: "4.2k",
            author: "Venture Bot",
            authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
            isTrending: true,
            isSaved: true
        },
        {
            id: "4",
            title: "TypeScript & React.js Design Patterns",
            category: "Frontend",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
            rating: "4.8",
            views: "3.1k",
            author: "Nova AI",
            authorAvatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop",
            isTrending: false,
            isSaved: false
        }
    ]);

    // 13. Stories Data
    const stories = [
        { id: "s1", name: "Your Story", avatar: loggedInUser.avatar, isUser: true },
        { id: "s2", name: "Nova AI", avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop", active: true },
        { id: "s3", name: "Cipher", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop", active: true },
        { id: "s4", name: "Venture", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop", active: true },
        { id: "s5", name: "Zenith", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop", active: false }
    ];

    // 18. AI Assistant Query Handler
    const handleAiQuery = () => {
        if (!aiQuery.trim()) return;
        setAiResponse(`Bloggy AI: Analyzing articles related to "${aiQuery}" for ${loggedInUser.displayName}... Recommended reading time: 4 mins.`);
    };

    return (
        <div className="min-h-screen bg-[#F4F6FB] text-slate-800 font-sans selection:bg-[#6D28D9] selection:text-white pb-12">

            {/* TOP BAR / NAVIGATION */}
            <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200 px-6 py-3.5 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

                    {/* Brand Logo & Name */}
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#6D28D9] rounded-2xl flex items-center justify-center text-white shadow-md shadow-purple-500/20">
                            <Sparkles size={20} />
                        </div>
                        <span className="font-serif text-2xl font-black text-[#6D28D9] tracking-tight">Bloggy</span>
                    </div>

                    {/* Search Bar */}
                    <div className="hidden md:flex items-center max-w-md w-full relative">
                        <Search size={16} className="absolute left-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="31. Explore topics, authors, articles..."
                            className="w-full bg-[#F8F7FC] border border-slate-200 rounded-2xl pl-11 pr-4 py-2 text-xs font-medium focus:outline-none focus:border-[#6D28D9]"
                        />
                    </div>

                    {/* 27, 28, 29 & User Actions Bar */}
                    <div className="flex items-center gap-3">

                        {/* 32. Weather Widget (Optional) */}
                        <div className="hidden lg:flex items-center gap-1.5 bg-[#F8F7FC] border border-purple-900/5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600">
                            <CloudSun size={15} className="text-amber-500" />
                            <span>24°C Lagos</span>
                        </div>

                        {/* 29. Rewards / Balance */}
                        <div className="bg-[#6D28D9] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-md shadow-purple-500/20 flex items-center gap-1.5">
                            <Gift size={14} />
                            <span>{loggedInUser.balance}</span>
                        </div>

                        {/* 28. Messages Icon */}
                        <button className="relative w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:text-[#6D28D9] transition-colors shadow-sm">
                            <MessageCircle size={16} />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#6D28D9] text-white rounded-full text-[9px] font-bold flex items-center justify-center">{loggedInUser.unreadMessages}</span>
                        </button>

                        {/* 27. Notifications Icon */}
                        <button className="relative w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:text-[#6D28D9] transition-colors shadow-sm">
                            <Bell size={16} />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">{loggedInUser.unreadNotifications}</span>
                        </button>

                        {/* 03. Profile Summary Top Avatar */}
                        <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
                            <img src={loggedInUser.avatar} alt={loggedInUser.displayName} className="w-8 h-8 rounded-xl object-cover border border-purple-200" />
                            <span className="text-xs font-bold text-slate-900 hidden sm:inline">{loggedInUser.displayName}</span>
                        </div>
                    </div>

                </div>
            </header>

            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">

                {/* 01. WELCOME BANNER & 02. DAILY GREETING */}
                <section className="bg-gradient-to-r from-purple-900 via-[#6D28D9] to-purple-700 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-2 relative z-10">
                        <div className="flex items-center gap-2 text-purple-200 text-xs font-bold uppercase tracking-wider">
                            <Clock size={14} /> {currentDate} • {currentTime}
                        </div>

                        {/* Personalized User Dashboard Name */}
                        <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight">
                            {greeting}, {loggedInUser.displayName}! 👋
                        </h1>
                        <p className="text-purple-100 text-sm max-w-lg">
                            Welcome to <strong>{loggedInUser.displayName}'s Dashboard</strong>. Your daily articles and AI insights are ready.
                        </p>
                    </div>

                    {/* 30. QUICK ACTIONS & CREATOR STATS */}
                    <div className="flex flex-wrap items-center gap-3 relative z-10">
                        {/* 12. Create Post Button */}
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="px-5 py-3 bg-white text-[#6D28D9] rounded-2xl font-bold text-xs shadow-lg hover:bg-purple-50 transition-all flex items-center gap-2 cursor-pointer"
                        >
                            <Plus size={16} /> <span>12. Create Post</span>
                        </button>

                        {/* 18. AI Reading Assistant Toggle */}
                        <button
                            onClick={() => setShowAiAssistant(!showAiAssistant)}
                            className="px-5 py-3 bg-purple-800/80 hover:bg-purple-800 text-white border border-purple-400/30 rounded-2xl font-bold text-xs transition-all flex items-center gap-2"
                        >
                            <Bot size={16} /> <span>18. AI Assistant</span>
                        </button>
                    </div>
                </section>

                {/* 18. AI READING ASSISTANT DRAWER PANEL */}
                {showAiAssistant && (
                    <section className="bg-white rounded-3xl p-6 border border-purple-200 shadow-xl space-y-4 animate-fadeIn">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                <Bot size={18} className="text-[#6D28D9]" /> 18. Bloggy AI Reading Assistant
                            </h3>
                            <button onClick={() => setShowAiAssistant(false)} className="text-xs text-slate-400 hover:text-slate-600">Close</button>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Ask AI to summarize an article, suggest topics, or outline ideas..."
                                value={aiQuery}
                                onChange={(e) => setAiQuery(e.target.value)}
                                className="flex-1 bg-[#F8F7FC] border border-slate-200 rounded-2xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#6D28D9]"
                            />
                            <button onClick={handleAiQuery} className="px-5 py-2.5 bg-[#6D28D9] text-white rounded-2xl text-xs font-bold flex items-center gap-1">
                                <Send size={14} /> Ask
                            </button>
                        </div>
                        {aiResponse && <p className="text-xs text-[#6D28D9] bg-purple-50 p-3 rounded-xl border border-purple-100 font-medium">{aiResponse}</p>}
                    </section>
                )}

                {/* 13. STORIES ROW */}
                <section className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">13. Community Stories</h3>
                    <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
                        {stories.map((s) => (
                            <div key={s.id} className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer">
                                <div className={`w-14 h-14 rounded-2xl p-0.5 ${s.active ? "bg-gradient-to-tr from-amber-500 to-[#6D28D9]" : "bg-slate-200"}`}>
                                    <img src={s.avatar} alt={s.name} className="w-full h-full rounded-[14px] object-cover border-2 border-white" />
                                </div>
                                <span className="text-[11px] font-bold text-slate-700">{s.name}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* MAIN GRID CONTAINING ALL DASHBOARD SECTIONS */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT / CENTER COLUMN (2 COLS) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* 04 & 05. READING STATS, XP & CREATOR LEVEL BAR */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

                            {/* 04. Reading Stats */}
                            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
                                <div className="text-[10px] font-bold text-slate-400 uppercase">04. Articles Read</div>
                                <div className="text-xl font-black text-slate-900">{loggedInUser.articlesRead}</div>
                                <div className="text-[10px] text-emerald-600 font-semibold">+12% this week</div>
                            </div>

                            {/* 04. Reading Time */}
                            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
                                <div className="text-[10px] font-bold text-slate-400 uppercase">04. Hours Spent</div>
                                <div className="text-xl font-black text-slate-900">{loggedInUser.hoursSpent} hrs</div>
                                <div className="text-[10px] text-[#6D28D9] font-semibold">Active Reader</div>
                            </div>

                            {/* 05. XP & Level */}
                            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
                                <div className="text-[10px] font-bold text-slate-400 uppercase">05. Creator Level</div>
                                <div className="text-sm font-black text-[#6D28D9]">{loggedInUser.creatorLevel}</div>
                                <div className="text-[10px] text-slate-500 font-medium">{loggedInUser.xpPoints} / {loggedInUser.nextLevelXp} XP</div>
                            </div>

                            {/* 22. Achievements Preview */}
                            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
                                <div className="text-[10px] font-bold text-slate-400 uppercase">22. Achievements</div>
                                <div className="text-xl font-black text-amber-500 flex items-center gap-1">
                                    <Trophy size={18} /> 8 Unlocked
                                </div>
                                <div className="text-[10px] text-slate-400">Top 5% Writer</div>
                            </div>
                        </div>

                        {/* 06. CONTINUE READING */}
                        <section className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                            <h2 className="text-base font-bold font-serif text-slate-900 flex items-center gap-2">
                                <BookOpen size={18} className="text-[#6D28D9]" /> 06. Continue Reading
                            </h2>
                            <div className="bg-[#F8F7FC] rounded-2xl p-4 border border-purple-900/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-[#6D28D9] uppercase tracking-wider">65% Progress</span>
                                    <h3 className="font-bold text-slate-900 text-sm">Critical Discourse Analysis & Socio-Cognitive Frameworks</h3>
                                    <p className="text-xs text-slate-500">4 mins remaining in chapter 3</p>
                                </div>
                                <button className="px-4 py-2 bg-[#6D28D9] text-white text-xs font-bold rounded-xl shadow-md hover:bg-purple-800 transition-all shrink-0">
                                    Resume
                                </button>
                            </div>
                        </section>

                        {/* FEEDS NAVIGATION BAR (07, 08, 09, 10, 11) */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
                                {[
                                    "Personalized", // 07
                                    "Trending",     // 08
                                    "Latest",       // 09
                                    "Following",    // 10
                                    "Communities"   // 11
                                ].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveFeedTab(tab)}
                                        className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${activeFeedTab === tab
                                                ? "bg-[#6D28D9] text-white shadow-md shadow-purple-500/20"
                                                : "text-slate-600 hover:bg-slate-100"
                                            }`}
                                    >
                                        {tab} Feed
                                    </button>
                                ))}
                            </div>

                            {/* ARTICLE CARDS GRID */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {articles.map((art) => (
                                    <div key={art.id} className="bg-white rounded-3xl p-4 border border-slate-200/70 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 flex flex-col justify-between group">
                                        <div className="space-y-3">
                                            <div className="h-40 rounded-2xl overflow-hidden bg-slate-100 relative">
                                                <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-bold text-[#6D28D9]">
                                                    {art.category}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-[#6D28D9] transition-colors">
                                                {art.title}
                                            </h3>
                                        </div>

                                        <div className="pt-3 space-y-3 border-t border-slate-100 mt-3">
                                            <div className="flex items-center justify-between text-xs font-bold">
                                                <div className="flex items-center gap-1 text-amber-500">
                                                    <Star size={13} className="fill-amber-400 text-amber-400" />
                                                    <span>{art.rating}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-slate-400 font-medium text-[11px]">
                                                    <Eye size={13} />
                                                    <span>{art.views}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <img src={art.authorAvatar} alt={art.author} className="w-6 h-6 rounded-full object-cover" />
                                                    <span className="text-xs font-semibold text-slate-600">{art.author}</span>
                                                </div>
                                                <button className="text-slate-400 hover:text-[#6D28D9]">
                                                    <Bookmark size={15} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 14. READING COLLECTIONS & 16. SAVED ITEMS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            {/* 14. Reading Collections */}
                            <section className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-3">
                                <h3 className="text-sm font-bold font-serif text-slate-900 flex items-center gap-2">
                                    <Layers size={16} className="text-[#6D28D9]" /> 14. Reading Collections
                                </h3>
                                <div className="space-y-2 text-xs">
                                    <div className="p-3 bg-[#F8F7FC] rounded-2xl flex justify-between items-center">
                                        <span className="font-bold text-slate-800">UI/UX Design Systems</span>
                                        <span className="text-slate-400">12 items</span>
                                    </div>
                                    <div className="p-3 bg-[#F8F7FC] rounded-2xl flex justify-between items-center">
                                        <span className="font-bold text-slate-800">Backend Systems & Databases</span>
                                        <span className="text-slate-400">8 items</span>
                                    </div>
                                </div>
                            </section>

                            {/* 15. DRAFTS & 16. SAVED ITEMS */}
                            <section className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-3">
                                <h3 className="text-sm font-bold font-serif text-slate-900 flex items-center gap-2">
                                    <Bookmark size={16} className="text-[#6D28D9]" /> 15. Drafts & 16. Saved Items
                                </h3>
                                <div className="space-y-2 text-xs">
                                    <div className="p-3 bg-purple-50 text-[#6D28D9] rounded-2xl flex justify-between items-center font-bold">
                                        <span>Draft: Advanced Next.js Server Actions</span>
                                        <span className="text-[10px] uppercase">Draft</span>
                                    </div>
                                    <div className="p-3 bg-[#F8F7FC] rounded-2xl flex justify-between items-center">
                                        <span className="text-slate-800 font-medium">Saved: Microservices in Go</span>
                                        <span className="text-slate-400">Saved</span>
                                    </div>
                                </div>
                            </section>

                        </div>

                    </div>

                    {/* RIGHT SIDEBAR WIDGETS COLUMN */}
                    <div className="space-y-6">

                        {/* 17. AI RECOMMENDATIONS */}
                        <section className="bg-white rounded-3xl p-5 border border-purple-200 shadow-sm space-y-3">
                            <h3 className="text-xs font-bold text-[#6D28D9] uppercase tracking-wider flex items-center gap-1.5">
                                <Sparkles size={14} /> 17. AI Recommendations
                            </h3>
                            <div className="space-y-2">
                                <h4 className="text-xs font-bold text-slate-900 hover:underline cursor-pointer">
                                    Why Socio-Cognitive Linguistics Matters in Modern Web Content
                                </h4>
                                <p className="text-[11px] text-slate-500">Based on your interests in English language & WebDev.</p>
                            </div>
                        </section>

                        {/* 19. LEARNING PATHS */}
                        <section className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-3">
                            <h3 className="text-sm font-bold font-serif text-slate-900 flex items-center gap-2">
                                <Zap size={16} className="text-[#6D28D9]" /> 19. Learning Paths
                            </h3>
                            <div className="space-y-2">
                                <div className="text-xs font-bold text-slate-800">Full-Stack System Architecture</div>
                                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                    <div className="bg-[#6D28D9] h-full w-[45%]"></div>
                                </div>
                                <span className="text-[10px] text-slate-400 font-medium">Step 3 of 7 Modules Completed</span>
                            </div>
                        </section>

                        {/* 20. EVENTS & 21. DAILY CHALLENGE */}
                        <section className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-3">
                            <h3 className="text-sm font-bold font-serif text-slate-900 flex items-center gap-2">
                                <Calendar size={16} className="text-[#6D28D9]" /> 20. Events & 21. Challenge
                            </h3>
                            <div className="p-3 bg-[#F8F7FC] rounded-2xl text-xs space-y-1">
                                <div className="font-bold text-slate-900">21. Daily Challenge: Read 2 Articles</div>
                                <div className="text-[11px] text-emerald-600 font-semibold">+50 XP Reward</div>
                            </div>
                        </section>

                        {/* 23. ANALYTICS & 24. LEADERBOARD */}
                        <section className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-3">
                            <h3 className="text-sm font-bold font-serif text-slate-900 flex items-center gap-2">
                                <BarChart3 size={16} className="text-[#6D28D9]" /> 23. Analytics & 24. Leaderboard
                            </h3>
                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between font-bold">
                                    <span className="text-slate-600">Weekly Leaderboard Rank</span>
                                    <span className="text-[#6D28D9]">#4 Top Creator</span>
                                </div>
                                <div className="flex justify-between text-slate-500 text-[11px]">
                                    <span>Total Views This Week</span>
                                    <span>12.4k views</span>
                                </div>
                            </div>
                        </section>

                        {/* 25. SUGGESTED AUTHORS & 26. SUGGESTED TOPICS */}
                        <section className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-3">
                            <h3 className="text-sm font-bold font-serif text-slate-900 flex items-center gap-2">
                                <UserPlus size={16} className="text-[#6D28D9]" /> 25. Authors & 26. Topics
                            </h3>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {["#AI", "#React", "#Nextjs", "#UIUX", "#Tailwind"].map(t => (
                                    <span key={t} className="px-2.5 py-1 bg-[#F8F7FC] text-[#6D28D9] rounded-xl text-[11px] font-bold">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </section>

                    </div>

                </div>

                {/* 33. DASHBOARD FOOTER */}
                <footer className="pt-8 border-t border-slate-200 text-center space-y-2">
                    <p className="text-xs text-slate-500">
                        © 2026 Bloggy Editorial Platform. Logged in as <strong>{loggedInUser.displayName}</strong>. All selections and posts saved to Neon database.
                    </p>
                </footer>

            </main>

            {/* Modal Handler for 12. Create Post */}
            <CreatePostModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                user={{
                    displayName: loggedInUser.displayName,
                    username: loggedInUser.username,
                    avatar: loggedInUser.avatar,
                    verification: loggedInUser.verification
                }}
            />

        </div>
    );
}