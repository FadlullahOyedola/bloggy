"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Search,
    Sparkles,
    ArrowLeft,
    ChevronDown,
    User,
    Shield,
    Edit3,
    Compass,
    Users,
    Wrench,
    HelpCircle,
    Send,
    Upload,
    CheckCircle2,
    AlertCircle,
    Clock,
    MessageSquare,
    ShieldAlert,
    Flag,
    Lock,
    Lightbulb,
    Activity,
    RefreshCw,
    ArrowUpRight,
    FileText
} from "lucide-react";

export default function BloggySupportPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [activeFormTab, setActiveFormTab] = useState<"ticket" | "bug" | "feature">("ticket");

    // Ticket Form State
    const [ticketData, setTicketData] = useState({
        name: "",
        email: "",
        category: "Account & Profile",
        subject: "",
        message: "",
        attachment: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [ticketSubmitted, setTicketSubmitted] = useState<string | null>(null);

    // Conversation Reply State
    const [replyText, setReplyText] = useState("");
    const [messages, setMessages] = useState([
        {
            sender: "Bloggy Support",
            time: "2 hours ago",
            text: "Thanks for contacting us. We've received your request and are looking into the problem."
        },
        {
            sender: "You",
            time: "1 hour ago",
            text: "I've tried uploading my profile picture several times, but the upload doesn't complete."
        },
        {
            sender: "Bloggy Support",
            time: "30 mins ago",
            text: "Thanks for the additional information. We've identified the issue and are working on a fix."
        }
    ]);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const handleTicketSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const newTicketId = `BG-${Math.floor(10000 + Math.random() * 90000)}`;

        try {
            await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...ticketData, ticketId: newTicketId })
            });
        } catch (err) {
            console.warn("Logged support submission:", err);
        } finally {
            setIsSubmitting(false);
            setTicketSubmitted(newTicketId);
        }
    };

    const handleSendReply = (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyText.trim()) return;
        setMessages([
            ...messages,
            { sender: "You", time: "Just now", text: replyText }
        ]);
        setReplyText("");
    };

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-[#F8F7FC] text-slate-900 font-sans selection:bg-[#6D28D9] selection:text-white">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-purple-900/5 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/dashboard"
                            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-purple-50 text-slate-600 hover:text-[#6D28D9] transition-colors"
                        >
                            <ArrowLeft size={18} />
                        </Link>
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-[#6D28D9] rounded-2xl flex items-center justify-center text-white shadow-md shadow-purple-500/30">
                                <Sparkles size={18} />
                            </div>
                            <span className="font-serif text-2xl font-black text-[#6D28D9]">
                                Bloggy
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/help"
                            className="px-4 py-2 rounded-xl bg-purple-50 text-[#6D28D9] text-xs font-bold hover:bg-purple-100 transition-colors"
                        >
                            Help Center
                        </Link>
                        <span className="px-3.5 py-1.5 rounded-full bg-purple-100 text-[#6D28D9] text-xs font-black uppercase tracking-wider">
                            Bloggy Support
                        </span>
                    </div>
                </div>
            </header>

            {/* Hero Banner */}
            <section className="bg-gradient-to-b from-purple-100/60 to-[#F8F7FC] py-16 px-4 sm:px-6 relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-4xl sm:text-6xl font-black font-serif text-slate-900 tracking-tight">
                            Bloggy Support
                        </h1>
                        <p className="text-xl font-bold text-[#6D28D9]">We're here to help.</p>
                    </div>

                    <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                        Something not working the way it should? Whether you're having trouble signing in, publishing an article, uploading an image, managing your profile, joining a community, or simply don't know what to do next, the Bloggy Support team is here to help. Tell us what happened, and we'll help you work through it.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 pt-2">
                        <button
                            onClick={() => scrollToSection("contact-form")}
                            className="px-6 py-3 bg-[#6D28D9] text-white font-bold text-xs rounded-2xl hover:bg-purple-800 shadow-lg shadow-purple-500/20 transition-all cursor-pointer"
                        >
                            Contact Support
                        </button>
                        <Link
                            href="/help"
                            className="px-6 py-3 bg-white border border-purple-900/10 text-slate-800 font-bold text-xs rounded-2xl hover:bg-purple-50 transition-colors"
                        >
                            Visit Help Center
                        </Link>
                    </div>
                </div>
            </section>

            {/* Main Container */}
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-16">

                {/* How can we help? - 6 Area Cards */}
                <section className="space-y-6">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-black font-serif text-slate-900">How can we help?</h2>
                        <p className="text-xs text-slate-500">Choose the area that best describes your problem.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Account & Profile",
                                desc: "Having trouble with your Bloggy account? Get help with registration, login, email verification, usernames, profile information, profile pictures, cover images, and account settings.",
                                icon: User,
                                linkText: "Get help with Account & Profile →",
                                cat: "Account & Profile"
                            },
                            {
                                title: "Security & Access",
                                desc: "Think something is wrong with your account or having trouble accessing it? Get assistance with password problems, suspicious activity, active sessions, account security, and privacy concerns.",
                                icon: Shield,
                                linkText: "Get help with Security →",
                                cat: "Security"
                            },
                            {
                                title: "Publishing & Creator Studio",
                                desc: "Having trouble creating or publishing content? Get help with posts, articles, drafts, images, documents, publishing, editing, Creator Studio, and creator features.",
                                icon: Edit3,
                                linkText: "Get help with Publishing →",
                                cat: "Publishing"
                            },
                            {
                                title: "Content & Discovery",
                                desc: "Can't find something or something isn't appearing correctly? Get help with Discover, search, topics, recommendations, articles, posts, bookmarks, collections, and your personalized feed.",
                                icon: Compass,
                                linkText: "Get help with Content →",
                                cat: "Search & Discovery"
                            },
                            {
                                title: "Community",
                                desc: "Need help with something happening in a Bloggy community? You can get assistance with community participation, comments, discussions, reports, blocking, harassment, spam, and other community concerns.",
                                icon: Users,
                                linkText: "Get help with Community →",
                                cat: "Communities"
                            },
                            {
                                title: "Technical Problems",
                                desc: "Encountered a bug or something isn't working correctly? Tell us about broken buttons, pages that won't load, failed uploads, search problems, notification issues, unexpected errors, or other technical problems.",
                                icon: Wrench,
                                linkText: "Report a Technical Problem →",
                                cat: "Technical Problem"
                            }
                        ].map((card, i) => {
                            const Icon = card.icon;
                            return (
                                <div
                                    key={i}
                                    className="bg-white p-6 rounded-3xl border border-purple-900/5 shadow-sm hover:shadow-md hover:border-purple-200 transition-all space-y-4 flex flex-col justify-between"
                                >
                                    <div className="space-y-3">
                                        <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center">
                                            <Icon size={24} />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
                                        <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setTicketData({ ...ticketData, category: card.cat });
                                            scrollToSection("contact-form");
                                        }}
                                        className="text-xs font-extrabold text-[#6D28D9] hover:underline text-left cursor-pointer pt-2"
                                    >
                                        {card.linkText}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Search the Help Center Section */}
                <section className="bg-white rounded-3xl p-8 sm:p-10 border border-purple-900/5 shadow-sm text-center space-y-4 max-w-4xl mx-auto">
                    <Search size={32} className="text-[#6D28D9] mx-auto" />
                    <h2 className="text-2xl font-black font-serif text-slate-900">Search the Help Center</h2>
                    <p className="text-xs text-slate-600 max-w-lg mx-auto">
                        Before contacting support, you may find a quick answer in the Bloggy Help Center. Search guides and answers about accounts, publishing, profiles, communities, settings, security, and more.
                    </p>
                    <div className="pt-2">
                        <Link
                            href="/help"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#6D28D9] text-white font-bold text-xs rounded-2xl hover:bg-purple-800 transition-colors"
                        >
                            <Search size={14} /> Search Help Center
                        </Link>
                    </div>

                    <div className="pt-6 border-t border-slate-100 text-left space-y-3">
                        <span className="text-xs font-extrabold uppercase text-slate-400">Popular questions:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-[#6D28D9]">
                            <Link href="/help" className="hover:underline">• How do I reset my password?</Link>
                            <Link href="/help" className="hover:underline">• How do I change my username?</Link>
                            <Link href="/help" className="hover:underline">• How do I upload a profile picture?</Link>
                            <Link href="/help" className="hover:underline">• How do I publish an article?</Link>
                            <Link href="/help" className="hover:underline">• How do I save an article?</Link>
                            <Link href="/help" className="hover:underline">• How do I change my interests?</Link>
                            <Link href="/help" className="hover:underline">• How do I report a user or post?</Link>
                            <Link href="/help" className="hover:underline">• How do I delete my account?</Link>
                        </div>
                    </div>
                </section>

                {/* Contact Bloggy Support Form & Tabs */}
                <section id="contact-form" className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-900/5 shadow-sm space-y-8">
                    <div className="space-y-2 border-b pb-4 border-slate-100">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-black font-serif text-slate-900">Contact Bloggy Support</h2>
                                <p className="text-xs text-slate-500">Tell us what happened. Send us a support request.</p>
                            </div>

                            {/* Form Switcher Tabs */}
                            <div className="flex items-center gap-1 bg-[#F8F7FC] p-1.5 rounded-2xl border border-purple-900/5">
                                {[
                                    { id: "ticket", label: "Support Ticket" },
                                    { id: "bug", label: "Report Problem" },
                                    { id: "feature", label: "Feature Request" }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveFormTab(tab.id as any)}
                                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeFormTab === tab.id
                                            ? "bg-[#6D28D9] text-white shadow-sm"
                                            : "text-slate-600 hover:text-slate-900"
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tab 1: Standard Support Ticket Form */}
                    {activeFormTab === "ticket" && (
                        ticketSubmitted ? (
                            <div className="py-10 text-center space-y-4">
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto">
                                    <CheckCircle2 size={36} />
                                </div>
                                <h3 className="text-2xl font-black font-serif text-slate-900">Support Request Sent!</h3>
                                <p className="text-xs text-slate-600 max-w-md mx-auto">
                                    Your ticket has been opened under reference ID <strong className="font-mono text-[#6D28D9]">{ticketSubmitted}</strong>. You can track its status below.
                                </p>
                                <button
                                    onClick={() => setTicketSubmitted(null)}
                                    className="px-6 py-2.5 bg-[#6D28D9] text-white text-xs font-bold rounded-xl hover:bg-purple-800 transition-colors cursor-pointer"
                                >
                                    Submit Another Request
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleTicketSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-extrabold text-slate-700">Name</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Enter your name"
                                            value={ticketData.name}
                                            onChange={(e) => setTicketData({ ...ticketData, name: e.target.value })}
                                            className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:bg-white font-medium transition-all"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-extrabold text-slate-700">Email</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="Enter the email associated with your Bloggy account"
                                            value={ticketData.email}
                                            onChange={(e) => setTicketData({ ...ticketData, email: e.target.value })}
                                            className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:bg-white font-medium transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-extrabold text-slate-700">What do you need help with?</label>
                                        <select
                                            value={ticketData.category}
                                            onChange={(e) => setTicketData({ ...ticketData, category: e.target.value })}
                                            className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:bg-white font-medium transition-all"
                                        >
                                            {[
                                                "Account & Profile",
                                                "Login & Password",
                                                "Security",
                                                "Publishing",
                                                "Articles",
                                                "Posts",
                                                "Communities",
                                                "Search & Discovery",
                                                "Notifications",
                                                "Media Uploads",
                                                "Technical Problem",
                                                "Report Content",
                                                "Report User",
                                                "Other"
                                            ].map((cat) => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-extrabold text-slate-700">Subject</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Short, descriptive title e.g. My profile picture won't upload"
                                            value={ticketData.subject}
                                            onChange={(e) => setTicketData({ ...ticketData, subject: e.target.value })}
                                            className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:bg-white font-medium transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-extrabold text-slate-700">Describe the problem</label>
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="Tell us: What were you trying to do? What happened? What did you expect to happen? Did you see an error message? When did the problem begin?"
                                        value={ticketData.message}
                                        onChange={(e) => setTicketData({ ...ticketData, message: e.target.value })}
                                        className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:bg-white font-medium transition-all resize-none"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-extrabold text-slate-700">Attachments (Optional)</label>
                                    <div className="flex items-center gap-3 bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3">
                                        <Upload size={16} className="text-[#6D28D9]" />
                                        <input
                                            type="text"
                                            placeholder="Paste image URL or screenshot link (Never include passwords)"
                                            value={ticketData.attachment}
                                            onChange={(e) => setTicketData({ ...ticketData, attachment: e.target.value })}
                                            className="w-full bg-transparent text-xs focus:outline-none font-medium text-slate-900"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 rounded-2xl bg-[#6D28D9] hover:bg-purple-800 text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <Send size={16} />
                                    <span>{isSubmitting ? "Sending Request..." : "Send Support Request"}</span>
                                </button>
                            </form>
                        )
                    )}

                    {/* Tab 2: Report Problem Form */}
                    {activeFormTab === "bug" && (
                        <form onSubmit={handleTicketSubmit} className="space-y-4">
                            <div className="p-4 bg-purple-50 rounded-2xl text-xs font-medium text-purple-900 border border-purple-100">
                                Found something that isn't working? Report bugs, broken buttons, failed image uploads, search problems, or display glitches here.
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input type="text" required placeholder="Page URL where problem happened" className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3.5 text-xs focus:outline-none" />
                                <input type="text" required placeholder="Browser & Device (e.g. Chrome on iPhone)" className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3.5 text-xs focus:outline-none" />
                            </div>
                            <textarea rows={4} required placeholder="What were you doing immediately before it occurred?" className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3.5 text-xs focus:outline-none" />
                            <button type="submit" className="w-full py-4 rounded-2xl bg-[#6D28D9] text-white font-bold text-xs">Report Problem</button>
                        </form>
                    )}

                    {/* Tab 3: Feature Request Form */}
                    {activeFormTab === "feature" && (
                        <form onSubmit={handleTicketSubmit} className="space-y-4">
                            <div className="p-4 bg-purple-50 rounded-2xl text-xs font-medium text-purple-900 border border-purple-100">
                                Have an idea for Bloggy? Tell us what you'd like Bloggy to add and why it would be useful!
                            </div>
                            <input type="text" required placeholder="Feature title (Short name)" className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3.5 text-xs focus:outline-none" />
                            <textarea rows={3} required placeholder="Describe the feature..." className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3.5 text-xs focus:outline-none" />
                            <textarea rows={2} required placeholder="Why would this be useful? What problem does it solve?" className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3.5 text-xs focus:outline-none" />
                            <button type="submit" className="w-full py-4 rounded-2xl bg-[#6D28D9] text-white font-bold text-xs">Submit Feature Request</button>
                        </form>
                    )}
                </section>

                {/* Your Support Requests & Live Conversation Tracker */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Support Ticket Dashboard */}
                    <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-purple-900/5 shadow-sm space-y-4">
                        <div className="space-y-1 border-b pb-3 border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900">Your Support Requests</h3>
                            <p className="text-xs text-slate-500">Keep track of your conversations and open tickets.</p>
                        </div>

                        {/* Ticket Card Example */}
                        <div className="p-4 rounded-2xl border border-[#6D28D9] bg-purple-50/40 space-y-2">
                            <div className="flex items-center justify-between text-xs font-bold">
                                <span className="font-mono text-[#6D28D9]">BG-10482</span>
                                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] uppercase font-black">
                                    In Progress
                                </span>
                            </div>
                            <h4 className="font-extrabold text-sm text-slate-900">Profile picture won't upload</h4>
                            <p className="text-[11px] text-slate-500">Last updated: 2 hours ago</p>
                        </div>

                        {/* Support Request Statuses Breakdown */}
                        <div className="pt-2 space-y-2">
                            <span className="text-[11px] font-extrabold uppercase text-slate-400">Support request statuses:</span>
                            <div className="space-y-1.5 text-xs text-slate-600">
                                <div className="flex items-start gap-2"><span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px]">Open</span> Request received and waiting to be reviewed.</div>
                                <div className="flex items-start gap-2"><span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold text-[10px]">In Progress</span> Support team is actively working on it.</div>
                                <div className="flex items-start gap-2"><span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold text-[10px]">Waiting for You</span> Need additional info from you.</div>
                                <div className="flex items-start gap-2"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">Resolved</span> Solution provided.</div>
                                <div className="flex items-start gap-2"><span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px]">Closed</span> Support conversation completed.</div>
                            </div>
                        </div>
                    </div>

                    {/* Live Support Conversation Display */}
                    <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-purple-900/5 shadow-sm space-y-4">
                        <div className="border-b pb-3 border-slate-100 flex items-center justify-between">
                            <div>
                                <span className="text-xs font-bold font-mono text-[#6D28D9]">Ticket #BG-10482</span>
                                <h3 className="text-lg font-bold text-slate-900">Your Support Conversation</h3>
                            </div>
                            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 font-bold text-xs">In Progress</span>
                        </div>

                        {/* Conversation Stream */}
                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`p-3.5 rounded-2xl text-xs space-y-1 ${msg.sender === "You"
                                        ? "bg-[#6D28D9] text-white ml-8"
                                        : "bg-[#F8F7FC] text-slate-800 mr-8 border border-purple-900/5"
                                        }`}
                                >
                                    <div className="flex items-center justify-between font-extrabold text-[10px] opacity-80">
                                        <span>{msg.sender}</span>
                                        <span>{msg.time}</span>
                                    </div>
                                    <p className="leading-relaxed font-normal">{msg.text}</p>
                                </div>
                            ))}
                        </div>

                        {/* Reply Input */}
                        <form onSubmit={handleSendReply} className="flex gap-2 pt-2 border-t border-slate-100">
                            <input
                                type="text"
                                placeholder="Reply to Bloggy Support..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-xl p-3 text-xs focus:outline-none text-slate-900 font-medium"
                            />
                            <button
                                type="submit"
                                className="px-4 py-3 bg-[#6D28D9] text-white rounded-xl text-xs font-bold hover:bg-purple-800 transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                            >
                                <Send size={14} /> Reply
                            </button>
                        </form>
                    </div>

                </section>

                {/* Account Security Banner */}
                <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 space-y-4 relative overflow-hidden">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                            <Lock size={20} />
                        </div>
                        <h2 className="text-2xl font-black font-serif">Account Security</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                        Think someone accessed your account? Take action immediately. Start by changing your password. Then review your active sessions from <strong>Settings → Security → Sessions</strong> and sign out of sessions you don't recognize.
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                        <Link
                            href="/settings/security"
                            className="px-6 py-3 bg-white text-slate-900 font-bold text-xs rounded-2xl hover:bg-slate-100 transition-colors"
                        >
                            Secure My Account
                        </Link>
                        <span className="text-[11px] text-amber-400 font-medium">
                            Note: Bloggy Support will never ask you for your password or authentication codes.
                        </span>
                    </div>
                </section>

                {/* System Status Banner */}
                <section className="bg-white rounded-3xl p-8 border border-purple-900/5 shadow-sm space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 border-slate-100">
                        <div>
                            <h2 className="text-xl font-black font-serif text-slate-900">Bloggy System Status</h2>
                            <p className="text-xs text-slate-500">Before contacting support about a widespread problem, check platform health.</p>
                        </div>
                        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-extrabold">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>● All systems operational</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        {[
                            "Website", "Authentication", "Publishing", "Search & Discovery",
                            "Notifications", "Media Uploads", "Communities"
                        ].map((service) => (
                            <div key={service} className="p-3 bg-[#F8F7FC] rounded-2xl flex items-center justify-between border border-purple-900/5">
                                <span className="font-bold text-slate-800">{service}</span>
                                <span className="text-emerald-600 font-extrabold text-[10px]">Operational</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Collapsible FAQ Section */}
                <section className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-900/5 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 border-b pb-4 border-slate-100">
                        <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center">
                            <HelpCircle size={20} />
                        </div>
                        <h2 className="text-2xl font-black font-serif text-slate-900">Frequently Asked Support Questions</h2>
                    </div>

                    <div className="space-y-3">
                        {[
                            { q: "I can't log in. What should I do?", a: "First check your email address and password. If you don't remember your password, use the password reset option on the Login page. If you still can't access your account, contact Support and explain what happens when you try to sign in." },
                            { q: "My password reset email hasn't arrived.", a: "Check your spam or junk folder and make sure you're using the email address connected to your Bloggy account. If the message still doesn't arrive, contact Support." },
                            { q: "My profile picture won't upload.", a: "Check that the image uses a supported format and doesn't exceed the upload limit. If the problem continues, try another image or browser and then contact Support." },
                            { q: "My article won't publish.", a: "Check that all required fields are complete and that your internet connection is stable. If Bloggy displays an error, include the exact error message when contacting Support." },
                            { q: "I found inappropriate content. What should I do?", a: "Use the Report option associated with the content and select the most appropriate reason. If you're unable to report it through the platform, contact Support." },
                            { q: "Can I delete my account?", a: "Account deletion can be managed through the Data & Privacy section of Settings when the feature is available. Read the deletion information carefully before confirming." }
                        ].map((faq, index) => (
                            <div key={index} className="border border-purple-900/5 rounded-2xl overflow-hidden">
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full p-4 text-left font-bold text-slate-900 bg-[#F8F7FC] hover:bg-purple-50 transition-colors flex items-center justify-between text-sm cursor-pointer"
                                >
                                    <span>{faq.q}</span>
                                    <ChevronDown size={18} className={`text-[#6D28D9] transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                                </button>
                                {openFaq === index && (
                                    <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-purple-900/5">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* We're Listening Statement */}
                <section className="bg-[#6D28D9] text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-4 text-center relative overflow-hidden">
                    <h3 className="text-2xl font-black font-serif">We're Listening</h3>
                    <p className="text-purple-100 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
                        Bloggy is built with its community. Every report helps us identify problems. Every support request helps us understand where users need better guidance. Every feature suggestion gives us another perspective on how Bloggy can improve.
                    </p>
                    <div className="pt-2 font-serif font-black text-lg text-purple-200">
                        Need help? We're here.
                    </div>
                </section>

            </div>

            {/* Comprehensive Footer */}
            <footer className="bg-white border-t border-purple-900/5 pt-12 pb-8 px-6 text-xs text-slate-600">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 pb-8 border-b border-slate-100">
                    <div className="col-span-2 space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 bg-[#6D28D9] rounded-xl flex items-center justify-center text-white">
                                <Sparkles size={14} />
                            </div>
                            <span className="font-serif text-xl font-black text-[#6D28D9]">Bloggy</span>
                        </div>
                        <p className="text-slate-500 leading-relaxed">Discover ideas. Share your voice. Find your people.</p>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px]">Support</h4>
                        <div className="flex flex-col gap-1.5">
                            <Link href="/help" className="hover:text-[#6D28D9]">Help Center</Link>
                            <Link href="/support" className="hover:text-[#6D28D9]">Contact Support</Link>
                            <Link href="/support" className="hover:text-[#6D28D9]">Report a Problem</Link>
                            <Link href="/support" className="hover:text-[#6D28D9]">Feature Requests</Link>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px]">Account</h4>
                        <div className="flex flex-col gap-1.5">
                            <Link href="/profile" className="hover:text-[#6D28D9]">Profile</Link>
                            <Link href="/settings" className="hover:text-[#6D28D9]">Settings</Link>
                            <Link href="/settings/security" className="hover:text-[#6D28D9]">Security</Link>
                            <Link href="/settings/privacy" className="hover:text-[#6D28D9]">Privacy</Link>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px]">Legal</h4>
                        <div className="flex flex-col gap-1.5">
                            <Link href="/terms" className="hover:text-[#6D28D9]">Terms of Service</Link>
                            <Link href="/settings/privacy" className="hover:text-[#6D28D9]">Privacy Policy</Link>
                            <Link href="/help" className="hover:text-[#6D28D9]">Community Guidelines</Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400">
                    <p>© {new Date().getFullYear()} Bloggy. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}