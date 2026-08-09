"use client";

import { useState } from "react";
import Link from "next/link";
import logo from "@/app/logo.png.webp";
import {
    FileText,
    ShieldAlert,
    UserCheck,
    Globe,
    Lock,
    ArrowLeft,
    Sparkles,
    ChevronRight,
    Scale,
    BookOpen,
    CheckCircle2,
    HelpCircle
} from "lucide-react";

export default function TermsOfServicePage() {
    const [activeSection, setActiveSection] = useState("acceptance");
    const logoSrc = typeof logo === "string" ? logo : logo.src;

    const sections = [
        { id: "acceptance", title: "1. Acceptance of Terms", icon: UserCheck },
        { id: "accounts", title: "2. Account Registration", icon: Lock },
        { id: "content", title: "3. User Content & Rights", icon: FileText },
        { id: "conduct", title: "4. Acceptable Conduct", icon: ShieldAlert },
        { id: "intellectual", title: "5. Intellectual Property", icon: BookOpen },
        { id: "termination", title: "6. Account Termination", icon: Scale },
        { id: "liability", title: "7. Limitation of Liability", icon: Globe }
    ];

    const scrollToSection = (id: string) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F7FC] text-slate-900 font-sans selection:bg-[#6D28D9] selection:text-white">
            {/* Top Navigation Header */}
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
                        <Link href="/" className="hover:text-[#6D28D9]">
                            Home
                        </Link>
                        <ChevronRight size={14} />
                        <span className="text-slate-900 font-bold">Terms of Service</span>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Editorial Hero Banner */}
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-purple-900/5 shadow-xl shadow-purple-900/5 space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />

                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-purple-50 text-[#6D28D9] border border-purple-100 text-xs font-bold rounded-full uppercase tracking-wider">
                        <Scale size={14} /> Legal Agreement
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black font-serif text-slate-900 tracking-tight">
                        Terms of Service
                    </h1>
                    <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
                        Please read these terms carefully before creating an account or publishing articles on the Bloggy platform. Last updated: August 2026.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Table of Contents Navigation Sidebar */}
                    <aside className="lg:col-span-4 sticky top-24 bg-white rounded-3xl p-6 border border-purple-900/5 shadow-xl shadow-purple-900/5 space-y-3 hidden lg:block">
                        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 px-2">
                            Table of Contents
                        </h3>
                        <nav className="space-y-1">
                            {sections.map((sec) => {
                                const Icon = sec.icon;
                                const isActive = activeSection === sec.id;
                                return (
                                    <button
                                        key={sec.id}
                                        onClick={() => scrollToSection(sec.id)}
                                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${isActive
                                            ? "bg-[#6D28D9] text-white shadow-md shadow-purple-500/20"
                                            : "text-slate-600 hover:bg-purple-50 hover:text-[#6D28D9]"
                                            }`}
                                    >
                                        <Icon size={16} className={isActive ? "text-white" : "text-[#6D28D9]"} />
                                        <span>{sec.title}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </aside>

                    {/* Main Terms Document Body */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* 1. Acceptance */}
                        <section
                            id="acceptance"
                            className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-900/5 shadow-xl shadow-purple-900/5 space-y-4"
                        >
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center border border-purple-100 shrink-0">
                                    <UserCheck size={20} />
                                </div>
                                <h2 className="text-xl font-extrabold text-slate-900 font-serif">
                                    1. Acceptance of Terms
                                </h2>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                By accessing, browsing, or registering an account on Bloggy (“the Platform”), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to all terms, you may not access or use our services.
                            </p>
                        </section>

                        {/* 2. Account Registration */}
                        <section
                            id="accounts"
                            className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-900/5 shadow-xl shadow-purple-900/5 space-y-4"
                        >
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center border border-purple-100 shrink-0">
                                    <Lock size={20} />
                                </div>
                                <h2 className="text-xl font-extrabold text-slate-900 font-serif">
                                    2. Account Registration & Credentials
                                </h2>
                            </div>
                            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                                <p>
                                    You are responsible for maintaining the confidentiality of your login credentials and authentication tokens associated with your Bloggy account.
                                </p>
                                <ul className="space-y-2 pl-2">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 size={16} className="text-[#6D28D9] shrink-0 mt-0.5" />
                                        <span>You must be at least 13 years of age to register an account.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 size={16} className="text-[#6D28D9] shrink-0 mt-0.5" />
                                        <span>You agree to provide accurate and updated information during onboarding.</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* 3. User Content */}
                        <section
                            id="content"
                            className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-900/5 shadow-xl shadow-purple-900/5 space-y-4"
                        >
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center border border-purple-100 shrink-0">
                                    <FileText size={20} />
                                </div>
                                <h2 className="text-xl font-extrabold text-slate-900 font-serif">
                                    3. Content Ownership & Licensing
                                </h2>
                            </div>
                            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                                <p>
                                    <strong>You retain complete ownership of all original content</strong> (articles, stories, thoughts, and media) that you publish on Bloggy.
                                </p>
                                <p>
                                    By submitting content to Bloggy, you grant us a worldwide, non-exclusive, royalty-free license to host, cache, display, and distribute your content across our platform services.
                                </p>
                            </div>
                        </section>

                        {/* 4. Acceptable Conduct */}
                        <section
                            id="conduct"
                            className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-900/5 shadow-xl shadow-purple-900/5 space-y-4"
                        >
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center border border-purple-100 shrink-0">
                                    <ShieldAlert size={20} />
                                </div>
                                <h2 className="text-xl font-extrabold text-slate-900 font-serif">
                                    4. Acceptable Conduct & Rules
                                </h2>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                To maintain a safe and creative space for writers, you agree not to engage in any of the following prohibited behaviors:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                {[
                                    "Spam, phishing, or automated bot scraping",
                                    "Hate speech, harassment, or abusive content",
                                    "Copyright infringement or uncredited plagiarism",
                                    "Attempting to exploit or bypass database security"
                                ].map((item, idx) => (
                                    <div key={idx} className="p-3.5 bg-[#F8F7FC] rounded-2xl border border-purple-900/5 text-xs font-semibold text-slate-700 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 5. Intellectual Property */}
                        <section
                            id="intellectual"
                            className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-900/5 shadow-xl shadow-purple-900/5 space-y-4"
                        >
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center border border-purple-100 shrink-0">
                                    <BookOpen size={20} />
                                </div>
                                <h2 className="text-xl font-extrabold text-slate-900 font-serif">
                                    5. Intellectual Property
                                </h2>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                The Bloggy brand name, logo, UI/UX visual layout, code architecture, and database infrastructure are protected under intellectual property laws. You may not reproduce our design elements without prior written consent.
                            </p>
                        </section>

                        {/* 6. Termination */}
                        <section
                            id="termination"
                            className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-900/5 shadow-xl shadow-purple-900/5 space-y-4"
                        >
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center border border-purple-100 shrink-0">
                                    <Scale size={20} />
                                </div>
                                <h2 className="text-xl font-extrabold text-slate-900 font-serif">
                                    6. Account Termination
                                </h2>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                We reserve the right to suspend or terminate accounts that violate our community conduct guidelines or engage in illegal activities. You can request account deletion at any time via your Account Settings.
                            </p>
                        </section>

                        {/* 7. Limitation of Liability */}
                        <section
                            id="liability"
                            className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-900/5 shadow-xl shadow-purple-900/5 space-y-4"
                        >
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center border border-purple-100 shrink-0">
                                    <Globe size={20} />
                                </div>
                                <h2 className="text-xl font-extrabold text-slate-900 font-serif">
                                    7. Limitation of Liability
                                </h2>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                Bloggy is provided on an “AS IS” and “AS AVAILABLE” basis. We do not guarantee uninterrupted uptime, though we strive for maximum service reliability.
                            </p>
                        </section>

                        {/* Need Help Footer Banner */}
                        <div className="bg-[#6D28D9] text-white rounded-3xl p-8 shadow-xl shadow-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="space-y-1 text-center sm:text-left">
                                <h3 className="font-extrabold text-lg">Have questions about our Terms?</h3>
                                <p className="text-purple-200 text-xs">Reach out to our legal support team for clarification.</p>
                            </div>
                            <Link
                                href="/support"
                                className="px-6 py-3 bg-white text-[#6D28D9] hover:bg-purple-50 rounded-2xl font-bold text-xs transition-colors shrink-0 flex items-center gap-2"
                            >
                                <HelpCircle size={16} /> Contact Legal Team
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}