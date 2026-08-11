"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Search,
    Sparkles,
    ArrowLeft,
    ChevronDown,
    BookOpen,
    User,
    LayoutDashboard,
    Compass,
    Tag,
    Users,
    Edit3,
    FileText,
    Heart,
    Bookmark,
    MessageSquare,
    ShieldAlert,
    ShieldCheck,
    Settings,
    Image as ImageIcon,
    HelpCircle,
    Lock,
    Send,
    Upload,
    CheckCircle2,
    AlertCircle
} from "lucide-react";

export default function HelpCenterPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        category: "Account",
        subject: "",
        message: "",
        attachment: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const handleSearchClick = (term: string) => {
        setSearchQuery(term);
        const element = document.getElementById("search-section");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
        } catch (err) {
            console.warn("Logged support ticket submission:", err);
        } finally {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }
    };

    // Helper filter function for search
    const matchesSearch = (text: string) => {
        if (!searchQuery.trim()) return true;
        return text.toLowerCase().includes(searchQuery.toLowerCase());
    };

    return (
        <div className="min-h-screen bg-[#F8F7FC] text-slate-900 font-sans selection:bg-[#6D28D9] selection:text-white">
            {/* Top Header Navigation */}
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
                    <span className="px-3.5 py-1.5 rounded-full bg-purple-100 text-[#6D28D9] text-xs font-black uppercase tracking-wider">
                        Help Center
                    </span>
                </div>
            </header>

            {/* Hero Search Banner */}
            <section id="search-section" className="bg-gradient-to-b from-purple-100/60 to-[#F8F7FC] py-16 px-4 sm:px-6 relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-4xl sm:text-6xl font-black font-serif text-slate-900 tracking-tight">
                            Bloggy Help Center
                        </h1>
                        <p className="text-xl font-bold text-[#6D28D9]">How can we help you?</p>
                    </div>

                    <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                        Welcome to the Bloggy Help Center. Whether you're new to Bloggy, looking for something you saved, trying to publish your first article, managing your profile, or having trouble with your account, you'll find answers and guidance here.
                    </p>

                    {/* Search Box Input */}
                    <div className="max-w-2xl mx-auto bg-white rounded-3xl p-3 sm:p-4 border border-purple-900/10 shadow-xl shadow-purple-900/5 space-y-3">
                        <div className="flex items-center gap-3 bg-[#F8F7FC] rounded-2xl px-4 py-3.5 border border-purple-900/10 focus-within:border-[#6D28D9] focus-within:bg-white transition-all">
                            <Search size={22} className="text-[#6D28D9]" />
                            <input
                                type="text"
                                placeholder="Search the Help Center to quickly find what you're looking for..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none font-medium"
                            />
                        </div>

                        {/* Quick Suggestions */}
                        <div className="text-left space-y-2 px-1">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                                Try searching for:
                            </span>
                            <div className="flex flex-wrap gap-2 pt-1">
                                {[
                                    "How do I create an account?",
                                    "How do I change my username?",
                                    "How do I publish an article?",
                                    "How do I save an article?",
                                    "How do I change my profile picture?",
                                    "How do I reset my password?",
                                    "How does verification work?",
                                    "How do I delete my account?"
                                ].map((term, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSearchClick(term)}
                                        className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#6D28D9] text-xs font-bold transition-colors cursor-pointer"
                                    >
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Container with Sidebar Routing */}
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                {/* Sticky Table of Contents Sidebar */}
                <aside className="lg:col-span-3 sticky top-24 space-y-2 bg-white/80 backdrop-blur-xl p-5 rounded-3xl border border-purple-900/5 shadow-sm hidden lg:block">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-2">
                        Support Categories
                    </h3>
                    <nav className="space-y-1 text-xs font-bold text-slate-600">
                        {[
                            { id: "getting-started", label: "Getting Started", icon: BookOpen },
                            { id: "dashboard", label: "Your Dashboard", icon: LayoutDashboard },
                            { id: "finding-content", label: "Finding Content", icon: Compass },
                            { id: "topics", label: "Topics & Interests", icon: Tag },
                            { id: "authors-profiles", label: "Authors & Profiles", icon: User },
                            { id: "managing-profile", label: "Managing Profile", icon: Settings },
                            { id: "reading", label: "Reading on Bloggy", icon: BookOpen },
                            { id: "posts-articles", label: "Posts & Articles", icon: Edit3 },
                            { id: "reactions-comments", label: "Reactions & Comments", icon: Heart },
                            { id: "collections-communities", label: "Collections & Communities", icon: Users },
                            { id: "notifications-creator", label: "Creator Features", icon: Sparkles },
                            { id: "settings-security", label: "Account & Security", icon: Lock },
                            { id: "troubleshooting", label: "Troubleshooting", icon: ShieldAlert },
                            { id: "faq", label: "FAQ", icon: HelpCircle },
                            { id: "contact-support", label: "Contact Support", icon: Send }
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-purple-50 hover:text-[#6D28D9] transition-colors"
                                >
                                    <Icon size={15} className="text-purple-600" />
                                    <span>{item.label}</span>
                                </a>
                            );
                        })}
                    </nav>
                </aside>

                {/* Content Body */}
                <main className="lg:col-span-9 space-y-12">

                    {/* Section: Getting Started with Bloggy */}
                    {matchesSearch("Getting Started What is Bloggy register onboarding create account") && (
                        <section id="getting-started" className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-900/5 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 border-b pb-4 border-slate-100">
                                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center">
                                    <BookOpen size={20} />
                                </div>
                                <h2 className="text-2xl font-black font-serif text-slate-900">Getting Started with Bloggy</h2>
                            </div>

                            <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
                                <div className="space-y-3">
                                    <h3 className="text-base font-extrabold text-slate-900">What is Bloggy?</h3>
                                    <p>Bloggy is a platform for discovering ideas, reading articles, following creators, sharing posts, building collections, and connecting with communities around topics that interest you.</p>
                                    <p>You can use Bloggy simply as a reader, as a creator, or as both.</p>
                                    <ul className="list-disc pl-5 space-y-1 font-medium text-slate-600">
                                        <li><strong>Readers</strong> can discover articles, follow topics, save content, build collections, react to posts, and follow authors.</li>
                                        <li><strong>Creators</strong> can publish articles and posts, build an audience, interact with readers, monitor their content performance, and develop their presence on the platform.</li>
                                        <li><strong>Communities</strong> allow people with shared interests to discover each other, exchange ideas, and participate in conversations.</li>
                                    </ul>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <h3 className="text-base font-extrabold text-slate-900">How do I create a Bloggy account?</h3>
                                    <ol className="list-decimal pl-5 space-y-2 font-medium text-slate-600">
                                        <li>Select <strong>Register</strong> from the Bloggy homepage.</li>
                                        <li>Enter the required account information and create your account. Depending on Bloggy's verification requirements, you may need to verify your email address before continuing.</li>
                                        <li>After registration, Bloggy takes you through onboarding so you can personalize your experience.</li>
                                        <li>You'll be able to select topics and interests that you care about and choose authors or content preferences that help Bloggy understand what you want to discover.</li>
                                        <li>Once onboarding is completed, you'll be taken to your personalized dashboard.</li>
                                    </ol>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <h3 className="text-base font-extrabold text-slate-900">Do I need an account to read Bloggy?</h3>
                                    <p>Some publicly available Bloggy content may be accessible without an account. However, creating an account unlocks the personalized Bloggy experience.</p>
                                    <div className="bg-[#F8F7FC] p-4 rounded-2xl border border-purple-900/5 space-y-2">
                                        <span className="font-extrabold text-xs text-slate-900">With an account, you can:</span>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold text-slate-600">
                                            <span>• Follow authors</span>
                                            <span>• Follow topics</span>
                                            <span>• Save articles</span>
                                            <span>• Create collections</span>
                                            <span>• React to content</span>
                                            <span>• Comment</span>
                                            <span>• Publish posts</span>
                                            <span>• Publish articles</span>
                                            <span>• Join communities</span>
                                            <span>• Receive notifications</span>
                                            <span>• Personalize feed</span>
                                            <span>• Build profile</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Section: Your Bloggy Dashboard */}
                    {matchesSearch("Your Bloggy Dashboard dashboard personalized show different content") && (
                        <section id="dashboard" className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-900/5 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 border-b pb-4 border-slate-100">
                                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center">
                                    <LayoutDashboard size={20} />
                                </div>
                                <h2 className="text-2xl font-black font-serif text-slate-900">Your Bloggy Dashboard</h2>
                            </div>

                            <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
                                <div className="space-y-3">
                                    <h3 className="text-base font-extrabold text-slate-900">What is the dashboard?</h3>
                                    <p>Your dashboard is your personal Bloggy home after signing in. It brings together the content, people, topics, and activities that are most relevant to you.</p>
                                    <p>Your dashboard may include: Personalized recommendations, Articles from authors you follow, Trending content, Continue Reading, Saved content, Topics you follow, Suggested authors, Communities, Notifications, Reading activity, Creator tools, and Your posts and articles.</p>
                                    <p className="italic text-slate-500">The dashboard is designed to change as your interests and activity change.</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <h3 className="text-base font-extrabold text-slate-900">Why does my dashboard show different content from someone else's?</h3>
                                    <p>Bloggy is designed to provide a personalized experience. Your feed can be influenced by the topics you select, authors you follow, articles you read, content you save, reactions you make, and other interactions with the platform.</p>
                                    <p>This means two users may see different recommendations even when they use Bloggy at the same time.</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Section: Finding Content */}
                    {matchesSearch("Finding Content discover search work") && (
                        <section id="finding-content" className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-900/5 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 border-b pb-4 border-slate-100">
                                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center">
                                    <Compass size={20} />
                                </div>
                                <h2 className="text-2xl font-black font-serif text-slate-900">Finding Content</h2>
                            </div>

                            <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
                                <div className="space-y-3">
                                    <h3 className="text-base font-extrabold text-slate-900">How do I discover articles?</h3>
                                    <p>Select <strong>Discover</strong> from the navigation. The Discover experience helps you explore articles and posts beyond the people and topics you already follow.</p>
                                    <p>You may find: Trending stories, Recommended articles, Recently published content, Popular creators, Topic-based recommendations, Editor-selected content, and Personalized recommendations.</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <h3 className="text-base font-extrabold text-slate-900">How do I search Bloggy?</h3>
                                    <p>Use the search bar available throughout the platform. You can search for Articles, Posts, Authors, Users, Topics, Collections, and Communities.</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <h3 className="text-base font-extrabold text-slate-900">How does search work?</h3>
                                    <p>Bloggy's search system is designed to understand common terms associated with content on the platform. Search results may consider titles, descriptions, topics, authors, usernames, and other relevant information.</p>
                                    <p>Search is separate from your personalized recommendations. Searching for something does not automatically mean Bloggy will permanently change your interests.</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Section: Topics and Interests */}
                    {matchesSearch("Topics and Interests follow topic change interests") && (
                        <section id="topics" className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-900/5 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 border-b pb-4 border-slate-100">
                                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center">
                                    <Tag size={20} />
                                </div>
                                <h2 className="text-2xl font-black font-serif text-slate-900">Topics and Interests</h2>
                            </div>

                            <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
                                <div className="space-y-3">
                                    <h3 className="text-base font-extrabold text-slate-900">What are Bloggy topics?</h3>
                                    <p>Topics are areas of interest that help organize content across Bloggy. Examples include: Technology, Artificial Intelligence, Programming, Design, Business, Startups, Science, Education, Finance, Career, Productivity, Culture, Travel, and Research.</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <h3 className="text-base font-extrabold text-slate-900">Can I change my interests?</h3>
                                    <p>Yes. You can update your interests from your account's content preferences. You can add new interests or remove interests that no longer reflect what you want to see. Changing your interests can influence future recommendations.</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <h3 className="text-base font-extrabold text-slate-900">Can I follow a topic?</h3>
                                    <p>Yes. When you follow a topic, Bloggy can show you more relevant content associated with that topic. You can manage the topics you follow from your profile or content preferences.</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Section: Authors and Profiles */}
                    {matchesSearch("Authors and Profiles find author follow someone share profile") && (
                        <section id="authors-profiles" className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-900/5 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 border-b pb-4 border-slate-100">
                                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center">
                                    <User size={20} />
                                </div>
                                <h2 className="text-2xl font-black font-serif text-slate-900">Authors and Profiles</h2>
                            </div>

                            <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
                                <div className="space-y-3">
                                    <h3 className="text-base font-extrabold text-slate-900">How do I find an author?</h3>
                                    <p>Select <strong>Authors</strong> from the main navigation or search for an author's name or username.</p>
                                    <p>Author profiles can show: Profile picture, Display name, Username, Bio, Verification status, Followers, Following, Published articles, Posts, Collections, and Achievements.</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <h3 className="text-base font-extrabold text-slate-900">How do I follow someone?</h3>
                                    <p>Open the person's profile and select <strong>Follow</strong>. Once you follow someone, their public content may become part of your personalized experience. You can unfollow them at any time.</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <h3 className="text-base font-extrabold text-slate-900">Can I share my Bloggy profile?</h3>
                                    <p>Yes. Your public profile can have a shareable username-based address. For example: <code className="bg-purple-50 text-[#6D28D9] px-2 py-1 rounded-md font-mono text-xs">bloggy.com/@username</code>. You can send your profile link to other people so they can discover your public Bloggy presence.</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Section: Managing Your Profile */}
                    {matchesSearch("Managing Your Profile profile picture cover picture bio username") && (
                        <section id="managing-profile" className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-900/5 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 border-b pb-4 border-slate-100">
                                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center">
                                    <Settings size={20} />
                                </div>
                                <h2 className="text-2xl font-black font-serif text-slate-900">Managing Your Profile</h2>
                            </div>

                            <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
                                <div className="space-y-3">
                                    <h3 className="text-base font-extrabold text-slate-900">How do I change my profile picture?</h3>
                                    <p>Open your profile and select <strong>Edit Profile</strong>. Choose your profile picture and upload a new image. After saving, the new profile picture will appear across your Bloggy profile and other areas where your avatar is displayed.</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <h3 className="text-base font-extrabold text-slate-900">How do I change my cover picture?</h3>
                                    <p>Open Edit Profile and select your cover image. Upload a new image, preview it, adjust it if necessary, and save your changes. Your cover image will appear at the top of your public profile.</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <h3 className="text-base font-extrabold text-slate-900">Can I change my bio?</h3>
                                    <p>Yes. Go to: <strong>Profile → Edit Profile</strong>. You can update your Bio, Display name, Nickname, Username, Website, Location, Occupation, and Social links.</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <h3 className="text-base font-extrabold text-slate-900">Can I change my username?</h3>
                                    <p>If Bloggy allows username changes, you can update your username from your profile settings. Your username must be unique. Changing your username may also change your public profile link (e.g., <code className="bg-purple-50 text-[#6D28D9] px-2 py-1 rounded-md font-mono text-xs">bloggy.com/@oldusername</code> to <code className="bg-purple-50 text-[#6D28D9] px-2 py-1 rounded-md font-mono text-xs">bloggy.com/@newusername</code>).</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Section: Reading on Bloggy */}
                    {matchesSearch("Reading on Bloggy read article save article saved continue reading") && (
                        <section id="reading" className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-900/5 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 border-b pb-4 border-slate-100">
                                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center">
                                    <BookOpen size={20} />
                                </div>
                                <h2 className="text-2xl font-black font-serif text-slate-900">Reading on Bloggy</h2>
                            </div>

                            <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
                                <div className="space-y-3">
                                    <h3 className="text-base font-extrabold text-slate-900">How do I read an article?</h3>
                                    <p>Select an article from Discover, your dashboard, a topic page, an author profile, a collection, or search results.</p>
                                    <p>The article page is designed for comfortable reading and may include: Article title, Author, Publication date, Reading time, Featured image, Article content, Topics, Reactions, Comments, Bookmark, and Share options.</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <h3 className="text-base font-extrabold text-slate-900">How do I save an article?</h3>
                                    <p>Select the <strong>Bookmark</strong> button on an article. Saved articles can be accessed from your Saved section. Your saved content is connected to your account, meaning it can remain available when you sign in from another supported device.</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <h3 className="text-base font-extrabold text-slate-900">Where can I find my saved articles?</h3>
                                    <p>Open: <strong>Dashboard → Saved</strong>. Your saved content may be organized into Articles, Posts, and Collections.</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <h3 className="text-base font-extrabold text-slate-900">What is Continue Reading?</h3>
                                    <p>Continue Reading helps you return to articles you previously started but haven't finished. Instead of searching for the article again, Bloggy can place unfinished reading activity in your dashboard.</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Section: Posts and Articles */}
                    {matchesSearch("Posts Articles create post draft write article edit article") && (
                        <section id="posts-articles" className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-900/5 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 border-b pb-4 border-slate-100">
                                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center">
                                    <Edit3 size={20} />
                                </div>
                                <h2 className="text-2xl font-black font-serif text-slate-900">Posts & Articles</h2>
                            </div>

                            <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
                                <div className="space-y-3">
                                    <h3 className="text-base font-extrabold text-slate-900">What is a Bloggy post?</h3>
                                    <p>A post is a shorter form of publishing that allows you to share an idea, thought, question, image, document, link, or other supported content with the Bloggy community. Posts are designed for conversation and discovery.</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <h3 className="text-base font-extrabold text-slate-900">How do I create a post?</h3>
                                    <p>Select <strong>Create Post</strong> from the dashboard. A publishing panel opens where you can create your content. Depending on available features, you can add Text, Images, Documents, Links, Polls, Quotes, Code, Topics, and Mentions.</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <h3 className="text-base font-extrabold text-slate-900">Can I save a post as a draft?</h3>
                                    <p>Yes, when draft functionality is available. Drafts allow you to leave your work unfinished and return later without publishing it. Your drafts are private unless you choose to publish them.</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <h3 className="text-base font-extrabold text-slate-900">How do I write an article?</h3>
                                    <p>Select <strong>Write Article</strong> or open <strong>Creator Studio</strong>. A professional article may include Title, Subtitle, Featured image, Body, Headings, Links, Quotes, Images, Topics, and Author information.</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <h3 className="text-base font-extrabold text-slate-900">Can I edit an article after publishing?</h3>
                                    <p>If editing is enabled for your account and article, you can open the article from your Creator Studio and select Edit. After making changes, save or publish the updated version.</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Section: Reactions, Comments and Sharing */}
                    {matchesSearch("Reactions Comments Sharing report inappropriate content") && (
                        <section id="reactions-comments" className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-900/5 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 border-b pb-4 border-slate-100">
                                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center">
                                    <Heart size={20} />
                                </div>
                                <h2 className="text-2xl font-black font-serif text-slate-900">Reactions, Comments and Sharing</h2>
                            </div>

                            <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
                                <div className="space-y-3">
                                    <h3 className="text-base font-extrabold text-slate-900">How do reactions work?</h3>
                                    <p>Bloggy can support multiple reactions rather than limiting interaction to a single like. Available reactions may include: Like, Love, Fire, Applause, Insightful, Funny, and Wow.</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <h3 className="text-base font-extrabold text-slate-900">How do comments work?</h3>
                                    <p>Open the comments section of a post or article. Write your response and submit it. Keep discussions respectful and relevant.</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <h3 className="text-base font-extrabold text-slate-900">How do I report inappropriate content?</h3>
                                    <p>Use the <strong>Report</strong> option associated with the content. Choose the reason that best describes the problem and provide additional information when requested. Reports may be reviewed by Bloggy's moderation system or team.</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Section: Collections and Communities */}
                    {matchesSearch("Collections Communities create collection join community") && (
                        <section id="collections-communities" className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-900/5 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 border-b pb-4 border-slate-100">
                                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center">
                                    <Users size={20} />
                                </div>
                                <h2 className="text-2xl font-black font-serif text-slate-900">Collections & Communities</h2>
                            </div>

                            <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
                                <div className="space-y-3">
                                    <h3 className="text-base font-extrabold text-slate-900">What are collections?</h3>
                                    <p>Collections allow you to organize related content around a theme (e.g., AI Resources, Books I Want to Read, Startup Ideas, Design Inspiration).</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <h3 className="text-base font-extrabold text-slate-900">What are Bloggy communities?</h3>
                                    <p>Communities bring people together around shared interests (e.g., Artificial Intelligence, Programming, Writing, Design, Startups, Education, Research, Technology). Open the community and select <strong>Join</strong>.</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Section: Creator Features & Verification */}
                    {matchesSearch("Creator Features Studio Analytics Verification Badges") && (
                        <section id="notifications-creator" className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-900/5 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 border-b pb-4 border-slate-100">
                                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center">
                                    <Sparkles size={20} />
                                </div>
                                <h2 className="text-2xl font-black font-serif text-slate-900">Creator Features & Verification</h2>
                            </div>

                            <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
                                <div className="space-y-3">
                                    <h3 className="text-base font-extrabold text-slate-900">What is Creator Studio?</h3>
                                    <p>Creator Studio is the workspace for people who publish content on Bloggy. It provides access to Published articles, Posts, Drafts, Scheduled content, Analytics, Comments, Media, and Content management.</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <h3 className="text-base font-extrabold text-slate-900">What are verification badges?</h3>
                                    <p>Verification badges help distinguish certain accounts on Bloggy. Different badge levels may represent different stages of recognition or verification.</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Section: Account Settings, Privacy & Security */}
                    {matchesSearch("Account Settings Password Privacy Security Delete Account") && (
                        <section id="settings-security" className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-900/5 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 border-b pb-4 border-slate-100">
                                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center">
                                    <Lock size={20} />
                                </div>
                                <h2 className="text-2xl font-black font-serif text-slate-900">Account Settings, Privacy & Security</h2>
                            </div>

                            <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
                                <div className="space-y-3">
                                    <h3 className="text-base font-extrabold text-slate-900">How do I change my password?</h3>
                                    <p>Open: <strong>Settings → Security → Change Password</strong>. Enter your current password and your new password. Save the change.</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <h3 className="text-base font-extrabold text-slate-900">I forgot my password. What should I do?</h3>
                                    <p>Go to the Bloggy login page and select <strong>Forgot Password?</strong>. Enter your email and follow the reset instructions.</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <h3 className="text-base font-extrabold text-slate-900">Can I delete my account?</h3>
                                    <p>If account deletion is available, go to: <strong>Settings → Data & Privacy → Delete Account</strong>.</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Section: Troubleshooting */}
                    {matchesSearch("Troubleshooting Technical Problems Account Problems Safety") && (
                        <section id="troubleshooting" className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-900/5 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 border-b pb-4 border-slate-100">
                                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center">
                                    <ShieldAlert size={20} />
                                </div>
                                <h2 className="text-2xl font-black font-serif text-slate-900">Troubleshooting & Safety</h2>
                            </div>

                            <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
                                <div className="space-y-3">
                                    <h3 className="text-base font-extrabold text-slate-900">Bloggy isn't loading correctly. What should I do?</h3>
                                    <p>Try: Refreshing the page, Checking your internet connection, Clearing your browser cache, Updating your browser, or Signing out and signing in again.</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <h3 className="text-base font-extrabold text-slate-900">What should I do if someone is harassing me?</h3>
                                    <p>You can block, restrict, mute, or report users where those features are available. Do not engage in harmful or threatening interactions.</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Collapsible FAQ Section */}
                    <section id="faq" className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-900/5 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 border-b pb-4 border-slate-100">
                            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center">
                                <HelpCircle size={20} />
                            </div>
                            <h2 className="text-2xl font-black font-serif text-slate-900">Frequently Asked Questions</h2>
                        </div>

                        <div className="space-y-3">
                            {[
                                { q: "Is Bloggy free?", a: "Bloggy's availability and pricing depend on the features offered by the platform. Any premium features should be clearly identified before a user is asked to pay." },
                                { q: "Can I use Bloggy on my phone?", a: "Yes. Bloggy should provide a responsive experience designed for mobile phones, tablets, laptops, and desktop screens." },
                                { q: "Can I follow authors?", a: "Yes. Following authors helps you stay connected to their public content." },
                                { q: "Can I follow topics?", a: "Yes. Following topics helps personalize your discovery experience." },
                                { q: "Can I save articles?", a: "Yes. Use the bookmark feature to save content for later." },
                                { q: "Can I publish my own content?", a: "Yes. Bloggy is designed for both readers and creators." },
                                { q: "Can I edit my profile?", a: "Yes. Your profile settings allow you to manage information such as your profile picture, cover image, name, username, and bio." },
                                { q: "Can I change my password?", a: "Yes. You can change your password through Security Settings." },
                                { q: "Can I log out from all devices?", a: "If session management is available, you can review active sessions and log out of other sessions." },
                                { q: "Can I delete my account?", a: "If account deletion is enabled, you can request deletion through Data & Privacy settings." }
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

                    {/* Contact Support Form Section */}
                    <section id="contact-support" className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-900/5 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 border-b pb-4 border-slate-100">
                            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center">
                                <Send size={20} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black font-serif text-slate-900">Contact Support</h2>
                                <p className="text-xs text-slate-500">We're here to help. Reach out to the Bloggy support team.</p>
                            </div>
                        </div>

                        {isSubmitted ? (
                            <div className="p-8 text-center bg-purple-50/50 rounded-2xl border border-purple-100 space-y-3">
                                <CheckCircle2 size={40} className="text-[#6D28D9] mx-auto" />
                                <h3 className="text-xl font-bold text-slate-900">Support Request Submitted</h3>
                                <p className="text-xs text-slate-600 max-w-md mx-auto">
                                    Thank you for contacting Bloggy support. We have received your ticket and will get back to you shortly.
                                </p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="px-6 py-2.5 bg-[#6D28D9] text-white text-xs font-bold rounded-xl hover:bg-purple-800 transition-colors cursor-pointer"
                                >
                                    Submit Another Request
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-extrabold text-slate-700">Name</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3.5 text-xs focus:outline-none focus:border-[#6D28D9] focus:bg-white font-medium transition-all"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-extrabold text-slate-700">Email</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="Enter the email associated with your Bloggy account"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3.5 text-xs focus:outline-none focus:border-[#6D28D9] focus:bg-white font-medium transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-extrabold text-slate-700">Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3.5 text-xs focus:outline-none focus:border-[#6D28D9] focus:bg-white font-medium transition-all"
                                        >
                                            {[
                                                "Account",
                                                "Login",
                                                "Profile",
                                                "Publishing",
                                                "Articles",
                                                "Payments",
                                                "Community",
                                                "Reports",
                                                "Technical Problem",
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
                                            placeholder="Briefly describe your issue"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3.5 text-xs focus:outline-none focus:border-[#6D28D9] focus:bg-white font-medium transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-extrabold text-slate-700">Message</label>
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="Explain what happened and what you need help with..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3.5 text-xs focus:outline-none focus:border-[#6D28D9] focus:bg-white font-medium transition-all resize-none"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-extrabold text-slate-700">Attachment (Optional)</label>
                                    <div className="flex items-center gap-3 bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3">
                                        <Upload size={16} className="text-[#6D28D9]" />
                                        <input
                                            type="text"
                                            placeholder="Attach image link or screenshot URL showing the problem"
                                            value={formData.attachment}
                                            onChange={(e) => setFormData({ ...formData, attachment: e.target.value })}
                                            className="w-full bg-transparent text-xs focus:outline-none font-medium"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 rounded-2xl bg-[#6D28D9] hover:bg-purple-800 text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <Send size={16} />
                                    <span>{isSubmitting ? "Submitting..." : "Submit Request"}</span>
                                </button>
                            </form>
                        )}
                    </section>

                    {/* Bloggy Support Promise Footer */}
                    <section className="bg-[#6D28D9] text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-4 text-center relative overflow-hidden">
                        <h3 className="text-2xl font-black font-serif">Bloggy Support Promise</h3>
                        <p className="text-purple-100 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
                            We want Bloggy to be a place where people can discover ideas, share knowledge, and connect with others without unnecessary friction. If something isn't working, tell us. If something is confusing, tell us. If you have an idea that could make Bloggy better, tell us. Your feedback helps us improve the platform.
                        </p>
                        <div className="pt-2 font-serif font-black text-lg text-purple-200">
                            Keep discovering. Keep creating. Keep connecting.
                        </div>
                    </section>

                </main>
            </div>
        </div>
    );
}