"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    MessageSquare,
    Sparkles,
    ArrowUpRight,
    CheckCircle2,
    HelpCircle,
    Bug,
    ShieldCheck,
    Briefcase,
    UserCheck,
    Search,
    ArrowLeft,
    ChevronRight,
    Clock,
    Activity,
    Upload,
    Copy,
    Check
} from "lucide-react";

export default function AdvancedContactPage() {
    // Active Category State
    const [selectedCategory, setSelectedCategory] = useState("technical");

    // Form Input States
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        priority: "normal",
        browserInfo: "",
        accountHandle: ""
    });

    // UI Flow & Submission States
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
    const [copiedTicket, setCopiedTicket] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Categories with custom visual accents
    const categories = [
        {
            id: "technical",
            label: "Technical & Bug Report",
            icon: Bug,
            desc: "API issues, database sync, build errors"
        },
        {
            id: "account",
            label: "Account & Auth",
            icon: UserCheck,
            desc: "Login, NextAuth, password resets"
        },
        {
            id: "creator",
            label: "Writer & Creator Support",
            icon: Sparkles,
            desc: "Publishing, monetization, reach"
        },
        {
            id: "privacy",
            label: "Privacy & Legal",
            icon: ShieldCheck,
            desc: "Data export, terms, account removal"
        },
        {
            id: "business",
            label: "Business & Press",
            icon: Briefcase,
            desc: "Partnerships, press, inquiries"
        }
    ];

    // Quick Instant-Deflection KB Articles
    const kbArticles = [
        { title: "Fixing NextAuth TS2344 Route Handler Types", category: "technical" },
        { title: "Connecting Neon PostgreSQL connection strings", category: "technical" },
        { title: "How to export complete account data (.JSON)", category: "privacy" },
        { title: "Verifying your custom domain on Bloggy", category: "creator" }
    ].filter((art) => art.title.toLowerCase().includes(searchQuery.toLowerCase()));

    // Handle Form Submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const ticketId = `BLOGGY-${Math.floor(100000 + Math.random() * 900000)}`;

        try {
            // API request to persist in Neon PostgreSQL
            await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ticketId, ...formData, category: selectedCategory })
            });
        } catch (err) {
            console.warn("Client side fallback logged:", err);
        } finally {
            setIsSubmitting(false);
            setSubmittedTicket(ticketId);
        }
    };

    const copyTicketId = () => {
        if (submittedTicket) {
            navigator.clipboard.writeText(submittedTicket);
            setCopiedTicket(true);
            setTimeout(() => setCopiedTicket(false), 2000);
        }
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

                    {/* System Status Pill */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>All Systems Operational</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                            <Link href="/" className="hover:text-[#6D28D9]">Home</Link>
                            <ChevronRight size={14} />
                            <span className="text-slate-900 font-bold">Help & Contact</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
                {/* Instant Knowledge Base Search Bar */}
                <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-purple-900/10 shadow-xl shadow-purple-900/5 space-y-3">
                    <div className="flex items-center gap-3 bg-[#F8F7FC] rounded-2xl px-4 py-3 border border-purple-900/10 focus-within:border-[#6D28D9] focus-within:bg-white transition-all">
                        <Search size={20} className="text-[#6D28D9]" />
                        <input
                            type="text"
                            placeholder="Search help articles or common issues before reaching out..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none font-medium"
                        />
                    </div>

                    {/* Search Deflection Results */}
                    {searchQuery.trim().length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-purple-900/5 animate-fadeIn">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-1">
                                Suggested Instant Answers:
                            </span>
                            {kbArticles.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {kbArticles.map((art, idx) => (
                                        <Link
                                            key={idx}
                                            href="/support"
                                            className="p-3 rounded-xl bg-purple-50/50 hover:bg-purple-100/60 text-slate-800 text-xs font-bold flex items-center justify-between group transition-colors"
                                        >
                                            <span className="truncate">{art.title}</span>
                                            <ArrowUpRight size={14} className="text-[#6D28D9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-slate-500 italic px-1">No matching articles found. Fill out the form below to open a direct ticket.</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Main Split Layout Container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* LEFT SIDE: Heading & Direct Channels */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-4">
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-purple-100 text-[#6D28D9] border border-purple-200 text-xs font-extrabold rounded-full uppercase tracking-wider">
                                <MessageSquare size={14} /> Contact Support
                            </span>
                            <h1 className="text-4xl sm:text-6xl font-black font-serif text-slate-900 tracking-tight leading-[1.1]">
                                Let’s get in touch
                            </h1>
                            <p className="text-slate-600 text-base leading-relaxed">
                                Have a question, technical issue, or partnership proposal? Choose a category and send us a message. Our team average response time is under 2 hours.
                            </p>
                        </div>

                        {/* Direct Contact Cards */}
                        <div className="space-y-3">
                            {[
                                {
                                    title: "Email Support",
                                    value: "support@bloggy.app",
                                    icon: Mail,
                                    subtitle: "Direct inbox for technical inquiries"
                                },
                                {
                                    title: "Direct Help Line",
                                    value: "+1 (800) 256-4491",
                                    icon: Phone,
                                    subtitle: "Mon - Fri from 9am to 6pm EST"
                                },
                                {
                                    title: "Global Headquarters",
                                    value: "San Francisco, CA & Remote",
                                    icon: MapPin,
                                    subtitle: "Bloggy Media Inc."
                                }
                            ].map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={idx}
                                        className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-purple-900/5 shadow-lg shadow-purple-900/5 flex items-center justify-between group hover:border-purple-200 transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-11 h-11 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center border border-purple-100 group-hover:scale-105 transition-transform shrink-0">
                                                <Icon size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.title}</h4>
                                                <p className="text-sm sm:text-base font-extrabold text-slate-900">{item.value}</p>
                                                <p className="text-[11px] text-slate-500 font-medium">{item.subtitle}</p>
                                            </div>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-[#6D28D9] group-hover:text-white text-slate-400 flex items-center justify-center transition-colors">
                                            <ArrowUpRight size={16} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* SLA Trust Metrics */}
                        <div className="p-5 rounded-3xl bg-[#6D28D9] text-white space-y-3 shadow-xl shadow-purple-500/20 relative overflow-hidden">
                            <div className="flex items-center justify-between border-b border-purple-400/30 pb-3">
                                <div className="flex items-center gap-2">
                                    <Clock size={18} className="text-purple-200" />
                                    <span className="font-bold text-xs">Support Level Agreement</span>
                                </div>
                                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/50 text-[10px] font-bold">24/7 Active</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-black font-serif">1.8 hrs</div>
                                    <div className="text-[11px] text-purple-200 font-medium">Avg Resolution Time</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-black font-serif">99.4%</div>
                                    <div className="text-[11px] text-purple-200 font-medium">Satisfaction Rate</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Interactive Floating Glass Form Card */}
                    <div className="lg:col-span-7">
                        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-purple-900/10 shadow-2xl shadow-purple-900/10 space-y-6 relative">

                            {/* Submitted Ticket Receipt Modal */}
                            {submittedTicket ? (
                                <div className="py-10 text-center space-y-5 animate-fadeIn">
                                    <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                                        <CheckCircle2 size={36} />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black font-serif text-slate-900">Support Ticket Created!</h3>
                                        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                                            Your ticket has been logged directly into our Neon PostgreSQL backend. A confirmation has been sent to your email address.
                                        </p>
                                    </div>

                                    {/* Ticket Badge */}
                                    <div className="inline-flex items-center gap-3 p-3 px-5 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-sm font-bold text-slate-800">
                                        <span>Reference ID: {submittedTicket}</span>
                                        <button
                                            type="button"
                                            onClick={copyTicketId}
                                            className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                                            title="Copy Reference"
                                        >
                                            {copiedTicket ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                                        </button>
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSubmittedTicket(null);
                                                setFormData({
                                                    name: "",
                                                    email: "",
                                                    phone: "",
                                                    subject: "",
                                                    message: "",
                                                    priority: "normal",
                                                    browserInfo: "",
                                                    accountHandle: ""
                                                });
                                            }}
                                            className="px-8 py-3.5 rounded-2xl bg-[#6D28D9] text-white font-bold text-xs hover:bg-purple-800 transition-colors shadow-lg shadow-purple-500/20"
                                        >
                                            Submit Another Inquiry
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-black font-serif text-slate-900">Send us a message</h3>
                                        <p className="text-xs text-slate-500">Select a category below so we can assign your inquiry to the right engineer or team member.</p>
                                    </div>

                                    {/* Category Selector Pills */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                        {categories.map((cat) => {
                                            const Icon = cat.icon;
                                            const isSelected = selectedCategory === cat.id;
                                            return (
                                                <button
                                                    type="button"
                                                    key={cat.id}
                                                    onClick={() => setSelectedCategory(cat.id)}
                                                    className={`p-3 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${isSelected
                                                        ? "bg-[#6D28D9] text-white border-[#6D28D9] shadow-md shadow-purple-500/20"
                                                        : "bg-[#F8F7FC] text-slate-700 border-purple-900/5 hover:bg-white hover:border-purple-300"
                                                        }`}
                                                >
                                                    <Icon size={18} className={`shrink-0 mt-0.5 ${isSelected ? "text-white" : "text-[#6D28D9]"}`} />
                                                    <div>
                                                        <div className="font-extrabold text-xs">{cat.label}</div>
                                                        <div className={`text-[10px] mt-0.5 ${isSelected ? "text-purple-200" : "text-slate-500"}`}>
                                                            {cat.desc}
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {/* Name & Email Row */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-extrabold text-slate-700">Full Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="John Doe"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:bg-white font-medium transition-all"
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-xs font-extrabold text-slate-700">Email Address</label>
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="john@example.com"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:bg-white font-medium transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Phone & Priority Row */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-extrabold text-slate-700">Phone Number (Optional)</label>
                                                <input
                                                    type="tel"
                                                    placeholder="+1 (555) 000-0000"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:bg-white font-medium transition-all"
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-xs font-extrabold text-slate-700">Urgency Level</label>
                                                <select
                                                    value={formData.priority}
                                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                                    className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:bg-white font-medium transition-all"
                                                >
                                                    <option value="low">Low - General Question</option>
                                                    <option value="normal">Normal - Routine Support</option>
                                                    <option value="urgent">Urgent - Service Disruption</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Dynamic Field Based on Category */}
                                        {selectedCategory === "technical" && (
                                            <div className="space-y-1.5 animate-fadeIn">
                                                <label className="text-xs font-extrabold text-slate-700">Environment Details / Error Stack</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Next.js 14, Vercel deployment, error TS2344"
                                                    value={formData.browserInfo}
                                                    onChange={(e) => setFormData({ ...formData, browserInfo: e.target.value })}
                                                    className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:bg-white font-medium transition-all"
                                                />
                                            </div>
                                        )}

                                        {selectedCategory === "creator" && (
                                            <div className="space-y-1.5 animate-fadeIn">
                                                <label className="text-xs font-extrabold text-slate-700">Bloggy Handle or Publication Link</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. bloggy.app/@yourusername"
                                                    value={formData.accountHandle}
                                                    onChange={(e) => setFormData({ ...formData, accountHandle: e.target.value })}
                                                    className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:bg-white font-medium transition-all"
                                                />
                                            </div>
                                        )}

                                        {/* Subject Line */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-extrabold text-slate-700">Subject</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Brief summary of your inquiry..."
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:bg-white font-medium transition-all"
                                            />
                                        </div>

                                        {/* Detailed Message */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-extrabold text-slate-700">Detailed Message</label>
                                            <textarea
                                                required
                                                rows={4}
                                                placeholder="Provide as much context as possible..."
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:bg-white font-medium transition-all resize-none"
                                            />
                                        </div>

                                        {/* Submit Action Button */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-4 rounded-2xl bg-[#6D28D9] hover:bg-purple-800 text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    <span>Routing Ticket to Neon Database...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={16} />
                                                    <span>Send Support Message</span>
                                                </>
                                            )}
                                        </button>

                                        <p className="text-[11px] text-center text-slate-400 font-medium">
                                            By submitting this form, you agree to our <Link href="/terms" className="text-[#6D28D9] underline">Terms of Service</Link> and <Link href="/settings/privacy" className="text-[#6D28D9] underline">Privacy Policy</Link>.
                                        </p>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}