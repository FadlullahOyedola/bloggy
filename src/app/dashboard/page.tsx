"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Sparkles,
    Search,
    Bell,
    ChevronDown,
    Home,
    Compass,
    Rss,
    Tag,
    Users,
    Bookmark,
    PlusSquare,
    PenTool,
    BarChart3,
    User,
    Settings,
    LogOut,
    Image as ImageIcon,
    Link as LinkIcon,
    FileText,
    RefreshCw,
    Flame,
    CheckCircle2,
    Share2,
    Heart,
    MessageCircle,
    MoreHorizontal,
    X,
    ShieldCheck,
    Menu,
    Edit3
} from "lucide-react";

interface Post {
    id: string;
    authorName: string;
    authorHandle: string;
    authorAvatar: string;
    isVerified: boolean;
    content: string;
    mediaUrl?: string;
    mediaType?: "image" | "link" | "document";
    timestamp: string;
    likes: number;
    comments: number;
    isLiked?: boolean;
}

export default function BloggyDashboardPage() {
    // User Session & Dynamic Name/Avatar States
    const [userName, setUserName] = useState("Fadlullah");
    const [userEmail, setUserEmail] = useState("fadlullahoyedola@gmail.com");
    const [userAvatar, setUserAvatar] = useState(
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
    );

    // Default Stats for New Online Users (0 Friends/Followers)
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

    // UI Interactive States
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Articles");
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Profile Edit Form Input States
    const [editNameInput, setEditNameInput] = useState(userName);
    const [editAvatarInput, setEditAvatarInput] = useState(userAvatar);

    // Post Creator Form States
    const [postContent, setPostContent] = useState("");
    const [mediaType, setMediaType] = useState<"image" | "link" | "document" | null>(null);
    const [mediaUrlInput, setMediaUrlInput] = useState("");
    const [showMediaInput, setShowMediaInput] = useState(false);

    // Feed State
    const [posts, setPosts] = useState<Post[]>([
        {
            id: "post-1",
            authorName: "Cipher Code",
            authorHandle: "@ciphercode",
            authorAvatar:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
            isVerified: true,
            content:
                "Just released our architectural deep dive into Next.js 15 Server Actions & Prisma performance optimizations on Neon PostgreSQL! Check out the benchmarks below. 🚀",
            mediaUrl:
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
            mediaType: "image",
            timestamp: "12m ago",
            likes: 14,
            comments: 3,
            isLiked: false
        }
    ]);

    // System Notifications
    const [notifications] = useState([
        {
            id: "notif-1",
            title: "Welcome to Bloggy 🎉",
            message: "Your onboarding setup is complete. Customize your profile and create your first post!",
            time: "Just now",
            read: false
        }
    ]);

    // Extract initial user info on load from dynamic registration/onboarding
    useEffect(() => {
        const storedName = localStorage.getItem("bloggy_user_name");
        const storedEmail = localStorage.getItem("bloggy_user_email");
        const storedAvatar = localStorage.getItem("bloggy_user_avatar");
        const storedFollowers = localStorage.getItem("bloggy_user_followers");
        const storedFollowing = localStorage.getItem("bloggy_user_following");

        if (storedName) {
            setUserName(storedName);
            setEditNameInput(storedName);
        }
        if (storedEmail) setUserEmail(storedEmail);
        if (storedAvatar) {
            setUserAvatar(storedAvatar);
            setEditAvatarInput(storedAvatar);
        }
        if (storedFollowers) setFollowersCount(parseInt(storedFollowers, 10));
        if (storedFollowing) setFollowingCount(parseInt(storedFollowing, 10));
    }, []);

    // Save updated Profile Name & Picture
    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editNameInput.trim()) return;

        setUserName(editNameInput);
        setUserAvatar(editAvatarInput);

        localStorage.setItem("bloggy_user_name", editNameInput);
        localStorage.setItem("bloggy_user_avatar", editAvatarInput);

        setIsEditProfileOpen(false);
    };

    // Time-based Greeting Helper
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    // Logout Handler (Invalidates local session + redirects)
    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
        } catch (e) {
            console.warn("Client fallback logout execution");
        } finally {
            localStorage.clear();
            window.location.href = "/";
        }
    };

    // Create Post Handler
    const handleCreatePost = (e: React.FormEvent) => {
        e.preventDefault();
        if (!postContent.trim()) return;

        const newPost: Post = {
            id: `post-${Date.now()}`,
            authorName: userName,
            authorHandle: `@${userName.toLowerCase().replace(/\s+/g, "")}`,
            authorAvatar: userAvatar,
            isVerified: true,
            content: postContent,
            mediaUrl: mediaUrlInput || undefined,
            mediaType: mediaType || undefined,
            timestamp: "Just now",
            likes: 0,
            comments: 0,
            isLiked: false
        };

        setPosts([newPost, ...posts]);
        setPostContent("");
        setMediaUrlInput("");
        setMediaType(null);
        setShowMediaInput(false);
    };

    // Refresh Feed Simulation
    const handleRefreshFeed = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
        }, 800);
    };

    // Like Toggle
    const toggleLike = (id: string) => {
        setPosts(
            posts.map((p) => {
                if (p.id === id) {
                    return {
                        ...p,
                        likes: p.isLiked ? p.likes - 1 : p.likes + 1,
                        isLiked: !p.isLiked
                    };
                }
                return p;
            })
        );
    };

    return (
        <div className="min-h-screen bg-[#F8F7FC] text-slate-900 font-sans selection:bg-[#6D28D9] selection:text-white flex flex-col relative">
            {/* ─────────────────────────────────────────────────────────────
          1. TOP NAVIGATION BAR (WITH HAMBURGER FOR SMALL SCREENS)
          ───────────────────────────────────────────────────────────── */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-purple-900/5 px-4 sm:px-8 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Mobile Hamburger Drawer Trigger */}
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-[#6D28D9] lg:hidden cursor-pointer"
                        aria-label="Open Navigation Menu"
                    >
                        <Menu size={20} />
                    </button>

                    {/* Bloggy Logo -> Redirects strictly to public home '/' */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 group transition-transform duration-200 hover:scale-105"
                    >
                        <div className="w-9 h-9 bg-gradient-to-tr from-[#6D28D9] to-purple-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-purple-500/20">
                            <Sparkles size={20} />
                        </div>
                        <span className="font-serif text-2xl font-black text-[#6D28D9] tracking-tight">
                            Bloggy
                        </span>
                    </Link>
                </div>

                {/* Global Search Bar (Desktop) */}
                <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
                    <Search className="absolute left-4 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search articles, creators, tags..."
                        className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-purple-500/10 transition-all"
                    />
                </div>

                {/* Top Right Quick Controls */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Streak Indicator */}
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-full text-xs font-bold">
                        <Flame size={14} className="text-amber-500 fill-amber-500" />
                        <span>1 Day Streak</span>
                    </div>

                    {/* System Notifications Popover Launcher */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                            className="p-2.5 rounded-xl bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-[#6D28D9] transition-colors relative cursor-pointer"
                        >
                            <Bell size={18} />
                            {notifications.some((n) => !n.read) && (
                                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
                            )}
                        </button>

                        {/* Notifications Modal Panel */}
                        {isNotificationsOpen && (
                            <div className="absolute right-0 mt-3 w-72 sm:w-80 bg-white rounded-3xl shadow-2xl border border-purple-900/10 p-5 z-50 space-y-4">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                    <h4 className="font-bold text-slate-900 text-sm">Notifications</h4>
                                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-purple-50 text-[#6D28D9] rounded-full">
                                        System Updates
                                    </span>
                                </div>
                                <div className="space-y-3 max-h-80 overflow-y-auto">
                                    {notifications.map((n) => (
                                        <div
                                            key={n.id}
                                            className="p-3 rounded-2xl text-xs space-y-1 bg-purple-50/60 border border-purple-100"
                                        >
                                            <div className="flex items-center justify-between font-bold text-slate-900">
                                                <span>{n.title}</span>
                                                <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                                            </div>
                                            <p className="text-slate-600 leading-relaxed">{n.message}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Profile Popover Trigger Button */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                            className="flex items-center gap-2 p-1.5 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                            <img
                                src={userAvatar}
                                alt={userName}
                                className="w-8 h-8 rounded-xl object-cover border border-purple-200"
                            />
                            <span className="text-xs font-bold text-slate-900 hidden sm:inline-block">
                                {userName}
                            </span>
                            <ChevronDown size={14} className="text-slate-500" />
                        </button>

                        {/* Profile Dropdown */}
                        {isProfileMenuOpen && (
                            <div className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-purple-900/10 p-4 z-50 space-y-3">
                                <div className="flex items-center gap-3 p-2 bg-[#F8F7FC] rounded-2xl">
                                    <img
                                        src={userAvatar}
                                        alt={userName}
                                        className="w-10 h-10 rounded-xl object-cover"
                                    />
                                    <div className="overflow-hidden">
                                        <h5 className="font-bold text-slate-900 text-xs truncate">{userName}</h5>
                                        <p className="text-[11px] text-slate-500 truncate">{userEmail}</p>
                                    </div>
                                </div>

                                <div className="space-y-1 pt-1 text-xs font-semibold text-slate-700">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsProfileMenuOpen(false);
                                            setIsEditProfileOpen(true);
                                        }}
                                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-purple-50 hover:text-[#6D28D9] transition-colors text-left cursor-pointer"
                                    >
                                        <Edit3 size={16} /> Edit Name & Picture
                                    </button>
                                    <Link
                                        href="/settings/security"
                                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-purple-50 hover:text-[#6D28D9] transition-colors"
                                    >
                                        <ShieldCheck size={16} /> Active Sessions
                                    </Link>
                                    <Link
                                        href="/saved"
                                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-purple-50 hover:text-[#6D28D9] transition-colors"
                                    >
                                        <Bookmark size={16} /> Saved Bookmarks
                                    </Link>
                                </div>

                                <div className="pt-2 border-t border-slate-100">
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold text-xs transition-colors cursor-pointer"
                                    >
                                        <LogOut size={16} /> Logout & Destroy Session
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* ─────────────────────────────────────────────────────────────
          2. SLIDE-OUT MOBILE HAMBURGER DRAWER (MOBILE NAVIGATION)
          ───────────────────────────────────────────────────────────── */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden flex">
                    <div
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    <aside className="relative w-72 max-w-[80%] bg-white h-full p-6 space-y-6 shadow-2xl flex flex-col z-10 overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#6D28D9] rounded-xl flex items-center justify-center text-white">
                                    <Sparkles size={18} />
                                </div>
                                <span className="font-serif text-xl font-black text-[#6D28D9]">
                                    Bloggy Navigation
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Mobile Sidebar Links */}
                        <nav className="space-y-6 flex-1 text-xs font-semibold text-slate-600">
                            <div className="space-y-1">
                                <span className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                                    Main Menu
                                </span>
                                <Link
                                    href="/dashboard"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-[#6D28D9] text-white font-bold"
                                >
                                    <Home size={16} /> Dashboard
                                </Link>
                                <Link
                                    href="/discover"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-purple-50 hover:text-[#6D28D9]"
                                >
                                    <Compass size={16} /> Discover
                                </Link>
                                <Link
                                    href="/my-feed"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-purple-50 hover:text-[#6D28D9]"
                                >
                                    <Rss size={16} /> My Feed
                                </Link>
                                <Link
                                    href="/onboarding/topics"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-purple-50 hover:text-[#6D28D9]"
                                >
                                    <Tag size={16} /> Topics & Niches
                                </Link>
                                <Link
                                    href="/onboarding/authors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-purple-50 hover:text-[#6D28D9]"
                                >
                                    <Users size={16} /> AI Authors
                                </Link>
                                <Link
                                    href="/saved"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-purple-50 hover:text-[#6D28D9]"
                                >
                                    <Bookmark size={16} /> Saved Collections
                                </Link>
                            </div>

                            <div className="space-y-1 pt-3 border-t border-slate-100">
                                <span className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                                    Creator Studio
                                </span>
                                <Link
                                    href="/creator/post"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-purple-50 hover:text-[#6D28D9]"
                                >
                                    <PlusSquare size={16} /> Quick Post
                                </Link>
                                <Link
                                    href="/creator/article"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-purple-50 hover:text-[#6D28D9]"
                                >
                                    <PenTool size={16} /> Write Article
                                </Link>
                                <Link
                                    href="/creator/analytics"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-purple-50 hover:text-[#6D28D9]"
                                >
                                    <BarChart3 size={16} /> Analytics & Reach
                                </Link>
                            </div>
                        </nav>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-rose-50 text-rose-600 font-bold text-xs"
                        >
                            <LogOut size={16} /> Logout
                        </button>
                    </aside>
                </div>
            )}

            {/* ─────────────────────────────────────────────────────────────
          3. EDIT PROFILE MODAL (NAME AND PICTURE MODIFICATION)
          ───────────────────────────────────────────────────────────── */}
            {isEditProfileOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-purple-900/10 space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                                <Edit3 size={18} className="text-[#6D28D9]" /> Edit Profile Info
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsEditProfileOpen(false)}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs font-semibold">
                            <div className="space-y-1">
                                <label className="text-slate-600">Display Name</label>
                                <input
                                    type="text"
                                    value={editNameInput}
                                    onChange={(e) => setEditNameInput(e.target.value)}
                                    className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3 text-slate-900 focus:outline-none focus:border-[#6D28D9]"
                                    placeholder="Enter full name"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-slate-600">Avatar Image URL</label>
                                <input
                                    type="url"
                                    value={editAvatarInput}
                                    onChange={(e) => setEditAvatarInput(e.target.value)}
                                    className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl p-3 text-slate-900 focus:outline-none focus:border-[#6D28D9]"
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="pt-2 flex items-center justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsEditProfileOpen(false)}
                                    className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-purple-800 text-white font-bold shadow-md shadow-purple-500/20"
                                >
                                    Save Profile Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ─────────────────────────────────────────────────────────────
          4. MAIN DESKTOP GRID LAYOUT
          ───────────────────────────────────────────────────────────── */}
            <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* DESKTOP SIDEBAR (HIDDEN ON MOBILE, ACCESS VIA HAMBURGER) */}
                <aside className="hidden lg:block lg:col-span-3 space-y-6">
                    <div className="bg-white rounded-3xl p-5 border border-purple-900/5 shadow-xl shadow-purple-900/5 flex items-center gap-3">
                        <img
                            src={userAvatar}
                            alt={userName}
                            className="w-12 h-12 rounded-2xl object-cover border-2 border-purple-100 shadow-sm"
                        />
                        <div>
                            <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
                                {getGreeting()}
                            </span>
                            <h3 className="font-black text-slate-900 text-base flex items-center gap-1">
                                {userName} 👋
                            </h3>
                        </div>
                    </div>

                    <nav className="bg-white rounded-3xl p-4 border border-purple-900/5 shadow-xl shadow-purple-900/5 space-y-6">
                        <div className="space-y-1">
                            <span className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                                Main Menu
                            </span>
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-[#6D28D9] text-white font-bold text-xs shadow-md shadow-purple-500/20"
                            >
                                <Home size={16} /> Dashboard
                            </Link>
                            <Link
                                href="/discover"
                                className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-slate-600 hover:bg-purple-50 hover:text-[#6D28D9] font-semibold text-xs transition-colors"
                            >
                                <Compass size={16} /> Discover
                            </Link>
                            <Link
                                href="/my-feed"
                                className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-slate-600 hover:bg-purple-50 hover:text-[#6D28D9] font-semibold text-xs transition-colors"
                            >
                                <Rss size={16} /> My Feed
                            </Link>
                            <Link
                                href="/onboarding/topics"
                                className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-slate-600 hover:bg-purple-50 hover:text-[#6D28D9] font-semibold text-xs transition-colors"
                            >
                                <Tag size={16} /> Topics & Niches
                            </Link>
                            <Link
                                href="/onboarding/authors"
                                className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-slate-600 hover:bg-purple-50 hover:text-[#6D28D9] font-semibold text-xs transition-colors"
                            >
                                <Users size={16} /> AI Authors
                            </Link>
                            <Link
                                href="/saved"
                                className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-slate-600 hover:bg-purple-50 hover:text-[#6D28D9] font-semibold text-xs transition-colors"
                            >
                                <Bookmark size={16} /> Saved Collections
                            </Link>
                        </div>

                        <div className="space-y-1 pt-3 border-t border-slate-100">
                            <span className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                                Creator Studio
                            </span>
                            <Link
                                href="/creator/post"
                                className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-slate-600 hover:bg-purple-50 hover:text-[#6D28D9] font-semibold text-xs transition-colors"
                            >
                                <PlusSquare size={16} /> Quick Post
                            </Link>
                            <Link
                                href="/creator/article"
                                className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-slate-600 hover:bg-purple-50 hover:text-[#6D28D9] font-semibold text-xs transition-colors"
                            >
                                <PenTool size={16} /> Write Article
                            </Link>
                            <Link
                                href="/creator/analytics"
                                className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-slate-600 hover:bg-purple-50 hover:text-[#6D28D9] font-semibold text-xs transition-colors"
                            >
                                <BarChart3 size={16} /> Analytics & Reach
                            </Link>
                        </div>

                        <div className="space-y-1 pt-3 border-t border-slate-100">
                            <span className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                                Account
                            </span>
                            <button
                                type="button"
                                onClick={() => setIsEditProfileOpen(true)}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-slate-600 hover:bg-purple-50 hover:text-[#6D28D9] font-semibold text-xs transition-colors text-left cursor-pointer"
                            >
                                <Settings size={16} /> Edit Profile & Media
                            </button>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-rose-600 hover:bg-rose-50 font-bold text-xs transition-colors cursor-pointer"
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    </nav>
                </aside>

                {/* FEED COMPOSER & POST STREAM */}
                <main className="lg:col-span-6 space-y-6">
                    <div className="bg-white rounded-3xl p-5 border border-purple-900/5 shadow-xl shadow-purple-900/5 space-y-4">
                        <div className="flex items-center gap-3">
                            <img
                                src={userAvatar}
                                alt={userName}
                                className="w-10 h-10 rounded-2xl object-cover shrink-0"
                            />
                            <input
                                type="text"
                                placeholder={`What's on your mind, ${userName}? Share insights or links...`}
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
                                className="w-full bg-[#F8F7FC] border border-purple-900/10 rounded-2xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6D28D9] transition-all"
                            />
                        </div>

                        {showMediaInput && (
                            <div className="p-3 bg-purple-50/50 rounded-2xl border border-purple-100 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-bold text-[#6D28D9] capitalize">
                                        Attach {mediaType} URL
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowMediaInput(false);
                                            setMediaType(null);
                                        }}
                                        className="text-slate-400 hover:text-rose-600"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                                <input
                                    type="url"
                                    placeholder={`Paste ${mediaType} URL here...`}
                                    value={mediaUrlInput}
                                    onChange={(e) => setMediaUrlInput(e.target.value)}
                                    className="w-full bg-white border border-purple-900/10 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#6D28D9]"
                                />
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                            <div className="flex items-center gap-1 sm:gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMediaType("image");
                                        setShowMediaInput(true);
                                    }}
                                    className="px-3 py-2 rounded-xl text-slate-600 hover:bg-purple-50 hover:text-[#6D28D9] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                    <ImageIcon size={16} className="text-emerald-500" />
                                    <span className="hidden sm:inline">Image</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMediaType("link");
                                        setShowMediaInput(true);
                                    }}
                                    className="px-3 py-2 rounded-xl text-slate-600 hover:bg-purple-50 hover:text-[#6D28D9] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                    <LinkIcon size={16} className="text-blue-500" />
                                    <span className="hidden sm:inline">Link</span>
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={handleCreatePost}
                                disabled={!postContent.trim()}
                                className={`px-5 py-2 rounded-xl font-bold text-xs transition-all shadow-md ${postContent.trim()
                                        ? "bg-[#6D28D9] hover:bg-purple-800 text-white shadow-purple-500/20 cursor-pointer"
                                        : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                                    }`}
                            >
                                Post
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {["Articles", "Posts", "Collections"].map((tab) => (
                                <button
                                    key={tab}
                                    type="button"
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${activeTab === tab
                                            ? "bg-[#6D28D9] text-white shadow-md shadow-purple-500/20"
                                            : "bg-white text-slate-600 hover:bg-purple-50 border border-purple-900/5"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={handleRefreshFeed}
                            className="p-2 rounded-xl bg-white border border-purple-900/5 text-slate-600 hover:text-[#6D28D9] transition-all cursor-pointer"
                        >
                            <RefreshCw size={16} className={isRefreshing ? "animate-spin text-[#6D28D9]" : ""} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {posts.map((post) => (
                            <article
                                key={post.id}
                                className="bg-white rounded-3xl p-6 border border-purple-900/5 shadow-xl shadow-purple-900/5 space-y-4"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={post.authorAvatar}
                                            alt={post.authorName}
                                            className="w-10 h-10 rounded-2xl object-cover border border-purple-100"
                                        />
                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <h4 className="font-extrabold text-slate-900 text-sm">{post.authorName}</h4>
                                                {post.isVerified && (
                                                    <CheckCircle2 size={14} className="text-[#6D28D9] fill-purple-100" />
                                                )}
                                            </div>
                                            <span className="text-[11px] text-slate-400 font-medium">
                                                {post.authorHandle} · {post.timestamp}
                                            </span>
                                        </div>
                                    </div>
                                    <button type="button" className="text-slate-400 hover:text-slate-600">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </div>

                                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                                    {post.content}
                                </p>

                                {post.mediaUrl && (
                                    <div className="rounded-2xl overflow-hidden border border-slate-100 max-h-72">
                                        {post.mediaType === "image" && (
                                            <img
                                                src={post.mediaUrl}
                                                alt="Post attachment"
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                )}

                                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-slate-500 text-xs font-semibold">
                                    <button
                                        type="button"
                                        onClick={() => toggleLike(post.id)}
                                        className={`flex items-center gap-1.5 transition-colors cursor-pointer ${post.isLiked ? "text-rose-600" : "hover:text-rose-600"
                                            }`}
                                    >
                                        <Heart size={16} className={post.isLiked ? "fill-rose-600" : ""} />
                                        <span>{post.likes}</span>
                                    </button>
                                    <button type="button" className="flex items-center gap-1.5 hover:text-[#6D28D9]">
                                        <MessageCircle size={16} />
                                        <span>{post.comments}</span>
                                    </button>
                                    <button type="button" className="flex items-center gap-1.5 hover:text-[#6D28D9]">
                                        <Share2 size={16} />
                                        <span>Share</span>
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </main>

                {/* RIGHT PANEL - FRESH START USER PROFILE CARD */}
                <aside className="hidden lg:block lg:col-span-3 space-y-6">
                    <div className="bg-white rounded-3xl p-6 border border-purple-900/5 shadow-xl shadow-purple-900/5 text-center space-y-4 relative overflow-hidden">
                        <div className="w-20 h-20 mx-auto relative">
                            <img
                                src={userAvatar}
                                alt={userName}
                                className="w-full h-full rounded-2xl object-cover border-4 border-white shadow-md"
                            />
                            <div className="absolute -bottom-1 -right-1 bg-[#6D28D9] text-white p-1 rounded-lg">
                                <CheckCircle2 size={12} />
                            </div>
                        </div>

                        <div>
                            <h4 className="font-black text-slate-900 text-base">{userName}</h4>
                            <p className="text-xs text-slate-400 font-medium">
                                @{userName.toLowerCase().replace(/\s+/g, "")}
                            </p>
                        </div>

                        {/* Zero State Follower / Following Counts for Fresh Online Users */}
                        <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-bold text-slate-700">
                            <div className="p-2.5 bg-[#F8F7FC] rounded-2xl">
                                <span className="block text-slate-900 font-black text-sm">{followersCount}</span>
                                <span className="text-[10px] text-slate-400 font-medium">Followers</span>
                            </div>
                            <div className="p-2.5 bg-[#F8F7FC] rounded-2xl">
                                <span className="block text-slate-900 font-black text-sm">{followingCount}</span>
                                <span className="text-[10px] text-slate-400 font-medium">Following</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsEditProfileOpen(true)}
                            className="w-full py-2.5 rounded-2xl bg-purple-50 text-[#6D28D9] hover:bg-[#6D28D9] hover:text-white font-bold text-xs transition-colors cursor-pointer"
                        >
                            Edit Profile & Media
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
}